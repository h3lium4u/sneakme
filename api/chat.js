import { OpenAIStream, StreamingTextResponse } from 'ai';
import { createClient } from '@supabase/supabase-js';

// Edge runtime is necessary for smooth streaming from Groq
export const config = { runtime: 'edge' };

// Initialize Supabase lazily
let supabase;

export default async function handler(req) {
    // 0. Validate Environment
    const required = ['SUPABASE_URL', 'HUGGINGFACE_TOKEN', 'GROQ_API_KEY', 'SUPABASE_SERVICE_ROLE_KEY'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        console.error('Missing Env Vars:', missing);
        return new Response(JSON.stringify({
            error: `Missing environment variables: ${missing.join(', ')}. Check your .env/vercel settings.`
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Initialize Supabase if not already done
    if (!supabase) {
        supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );
    }

    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content;

        // 1. Generate embedding
        console.log(`AI_BRAIN: Generating embedding for "${lastMessage.substring(0, 30)}..."`);
        const hfResponse = await fetch(
            "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ inputs: lastMessage, options: { wait_for_model: true } }),
            }
        );

        if (!hfResponse.ok) {
            const hfErr = await hfResponse.text();
            throw new Error(`HF_API_${hfResponse.status}: ${hfErr}`);
        }

        const result = await hfResponse.json();
        const query_embedding = Array.isArray(result) ? (Array.isArray(result[0]) ? result[0] : result) : result;

        // 2. Search Supabase
        console.log('AI_BRAIN: Searching Supabase...');
        const { data: documents, error: dbError } = await supabase.rpc('match_documents', {
            query_embedding: query_embedding,
            match_threshold: 0.1,
            match_count: 5,
        });

        if (dbError) throw new Error(`DB_Error: ${dbError.message}`);

        const context = documents?.map(doc => doc.content).join('\n') || 'No context found.';
        console.log(`AI_BRAIN: Context found (${documents?.length || 0} chunks).`);

        // 2.5 Log question for training
        let queryId = null;
        try {
            const { data: logData, error: logError } = await supabase.from('chat_queries').insert({
                query: lastMessage,
                context_count: documents?.length || 0,
                metadata: {
                    timestamp: new Date().toISOString(),
                    model: 'llama-3.1-8b-instant'
                }
            }).select('id').single();

            if (logError) console.error('AI_BRAIN: Logging Error:', logError.message);
            else {
                queryId = logData?.id;
                console.log('AI_BRAIN: Question logged, ID:', queryId);
            }
        } catch (e) {
            console.error('AI_BRAIN: Logging Exception:', e.message);
        }

        // 3. Request Groq
        console.log('AI_BRAIN: Requesting Groq...');
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: `You are Faizaan. Respond in the first person (use "I", "I'm", "my"). 
                        Use this context to answer questions about your background, skills, and projects: ${context}
                        
                        PERSONALITY:
                        - Be professional for career-related questions.
                        - If someone asks a personal question not covered by the context (like hobbies, relationship status, or random things), 
                          respond with a WITTY, FUNNY, and slightly sarcastic first-person remark.
                        - Always keep it polite but show some personality!`
                    },
                    ...messages
                ],
                stream: true,
            })
        });

        if (!groqResponse.ok) {
            const groqErr = await groqResponse.text();
            throw new Error(`Groq_${groqResponse.status}: ${groqErr}`);
        }

        console.log('AI_BRAIN: Streaming response back...');
        const stream = OpenAIStream(groqResponse, {
            onCompletion: async (completion) => {
                if (queryId) {
                    try {
                        const { error: updateError } = await supabase
                            .from('chat_queries')
                            .update({ answer: completion })
                            .eq('id', queryId);

                        if (updateError) console.error('AI_BRAIN: Answer Log Error:', updateError.message);
                        else console.log('AI_BRAIN: Answer logged for ID:', queryId);
                    } catch (e) {
                        console.error('AI_BRAIN: Answer Log Exception:', e.message);
                    }
                }
            }
        });
        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error('AI_BRAIN_ERROR:', error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
