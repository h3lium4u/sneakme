import os
from sentence_transformers import SentenceTransformer
from supabase import create_client, Client

# ==========================================
# CONFIGURATION
# ==========================================
# Get these from your Supabase Project Settings > API
SUPABASE_URL = "https://bddqjxwtzwjatnvwahou.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkZHFqeHd0endqYXRudndhaG91Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQyNDM4OSwiZXhwIjoyMDg3MDAwMzg5fQ.dXfa5W0aCIvO0MMq-r3nZKQOMwwm9lDRs6Of-_3gc1c" # Use Service Role key to bypass RLS

# Using a free local model (384 dimensions)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Your Resume Data - Broke down into clear sections
RESUME_CHUNKS = [

# ================= ABOUT =================

{"content": "I am a software engineering student from India focused on building AI-powered systems.", "metadata": {"section": "about"}},
{"content": "I specialize in AI-integrated web and mobile applications.", "metadata": {"section": "about"}},
{"content": "My primary focus is computer vision and intelligent system design.", "metadata": {"section": "about"}},
{"content": "I aim to become a product-focused software engineer.", "metadata": {"section": "about"}},
{"content": "I build systems with scalability and automation in mind.", "metadata": {"section": "about"}},
{"content": "I prefer solving real-world infrastructure problems over building basic demo apps.", "metadata": {"section": "about"}},
{"content": "I treat every project as preparation for startup-level execution.", "metadata": {"section": "about"}},
{"content": "I continuously upgrade my engineering standards.", "metadata": {"section": "about"}},
{"content": "I focus on intelligent automation rather than manual workflows.", "metadata": {"section": "about"}},
{"content": "I align my technical growth with long-term product building.", "metadata": {"section": "about"}},

# ================= AI PROJECTS =================

{"content": "I developed a wrong-way vehicle detection system using YOLO.", "metadata": {"section": "projects_ai"}},
{"content": "My AI vehicle system triggers alerts for traffic violations.", "metadata": {"section": "projects_ai"}},
{"content": "I implemented structured logging for AI detection outputs.", "metadata": {"section": "projects_ai"}},
{"content": "I monitored GPU performance during AI inference.", "metadata": {"section": "projects_ai"}},
{"content": "I optimized detection thresholds to reduce false positives.", "metadata": {"section": "projects_ai"}},
{"content": "I worked on a facial expression analysis system for online student engagement tracking.", "metadata": {"section": "projects_ai"}},
{"content": "I designed AI pipelines combining detection and automated response.", "metadata": {"section": "projects_ai"}},
{"content": "I integrated AI outputs with backend systems.", "metadata": {"section": "projects_ai"}},
{"content": "I structured AI modules for modular expansion.", "metadata": {"section": "projects_ai"}},
{"content": "I tested computer vision systems under hardware constraints.", "metadata": {"section": "projects_ai"}},

# ================= ANDROID PROJECTS =================

{"content": "I built a campus marketplace Android application.", "metadata": {"section": "projects_android"}},
{"content": "I converted the marketplace app into a Lost and Found system.", "metadata": {"section": "projects_android"}},
{"content": "My Lost and Found app supports image uploads and reporting.", "metadata": {"section": "projects_android"}},
{"content": "I developed a service-connection Android app for electricians, plumbers, and carpenters.", "metadata": {"section": "projects_android"}},
{"content": "The service app includes booking and chat features.", "metadata": {"section": "projects_android"}},
{"content": "I optimized Android layouts for consistent UI performance.", "metadata": {"section": "projects_android"}},
{"content": "I structured Android activities with clean architecture.", "metadata": {"section": "projects_android"}},
{"content": "I handled authentication flows inside mobile applications.", "metadata": {"section": "projects_android"}},
{"content": "I improved mobile UI consistency across screen sizes.", "metadata": {"section": "projects_android"}},
{"content": "I debug lifecycle and performance issues in Android apps.", "metadata": {"section": "projects_android"}},

# ================= WEB PROJECTS =================

{"content": "I designed a premium dark-themed portfolio website.", "metadata": {"section": "projects_web"}},
{"content": "My portfolio focuses on animation and clean layout.", "metadata": {"section": "projects_web"}},
{"content": "I built a food ordering website associated with KARE.", "metadata": {"section": "projects_web"}},
{"content": "I integrated contact forms with email services.", "metadata": {"section": "projects_web"}},
{"content": "I optimized CSS animations for mobile responsiveness.", "metadata": {"section": "projects_web"}},
{"content": "I structured frontend components for maintainability.", "metadata": {"section": "projects_web"}},
{"content": "I debugged deployment issues during hosting.", "metadata": {"section": "projects_web"}},
{"content": "I focused on performance optimization for web apps.", "metadata": {"section": "projects_web"}},
{"content": "I integrated backend APIs into frontend systems.", "metadata": {"section": "projects_web"}},
{"content": "I design UI that balances minimalism and interactivity.", "metadata": {"section": "projects_web"}},

# ================= AUTOMATION =================

{"content": "I automate workflows using n8n.", "metadata": {"section": "automation"}},
{"content": "I build event-driven automation systems.", "metadata": {"section": "automation"}},
{"content": "I integrate AI outputs into automation pipelines.", "metadata": {"section": "automation"}},
{"content": "I design conditional logic flows in workflow engines.", "metadata": {"section": "automation"}},
{"content": "I automate notification triggers based on system events.", "metadata": {"section": "automation"}},
{"content": "I monitor workflow execution logs for reliability.", "metadata": {"section": "automation"}},
{"content": "I reduce manual work through backend automation.", "metadata": {"section": "automation"}},
{"content": "I optimize automation speed and fault tolerance.", "metadata": {"section": "automation"}},
{"content": "I connect multiple services using automated triggers.", "metadata": {"section": "automation"}},
{"content": "I design scalable workflow structures.", "metadata": {"section": "automation"}},

# ================= BLOCKCHAIN =================

{"content": "I am developing a blockchain-based crowdfunding platform locally.", "metadata": {"section": "blockchain"}},
{"content": "I am learning Hardhat for smart contract deployment.", "metadata": {"section": "blockchain"}},
{"content": "I experiment with decentralized funding logic.", "metadata": {"section": "blockchain"}},
{"content": "I study smart contract security principles.", "metadata": {"section": "blockchain"}},
{"content": "I simulate local blockchain networks for experimentation.", "metadata": {"section": "blockchain"}},
{"content": "I explore token-based contribution systems.", "metadata": {"section": "blockchain"}},
{"content": "I analyze decentralized governance concepts.", "metadata": {"section": "blockchain"}},
{"content": "I structure blockchain projects modularly.", "metadata": {"section": "blockchain"}},
{"content": "I test smart contract deployment workflows.", "metadata": {"section": "blockchain"}},
{"content": "I aim to integrate blockchain into future product systems.", "metadata": {"section": "blockchain"}},

# ================= PERSONALITY =================

{"content": "I code late at night for deep focus.", "metadata": {"section": "personality"}},
{"content": "I am competitive about improving my technical skills.", "metadata": {"section": "personality"}},
{"content": "I am self-taught through consistent experimentation.", "metadata": {"section": "personality"}},
{"content": "I am a perfectionist when refining my projects.", "metadata": {"section": "personality"}},
{"content": "I am quiet but highly observant.", "metadata": {"section": "personality"}},
{"content": "I analyze problems before reacting.", "metadata": {"section": "personality"}},
{"content": "I prefer building quietly rather than speaking loudly.", "metadata": {"section": "personality"}},
{"content": "I refine systems beyond minimum functional requirements.", "metadata": {"section": "personality"}},
{"content": "I debug issues methodically.", "metadata": {"section": "personality"}},
{"content": "I push myself to understand internal mechanics.", "metadata": {"section": "personality"}},

# ================= BEHAVIOR =================

{"content": "I approach debugging as structured investigation.", "metadata": {"section": "behavior"}},
{"content": "I review my code critically before deployment.", "metadata": {"section": "behavior"}},
{"content": "I test systems under stress conditions.", "metadata": {"section": "behavior"}},
{"content": "I focus on long-term maintainability.", "metadata": {"section": "behavior"}},
{"content": "I iterate until architecture becomes minimal and clean.", "metadata": {"section": "behavior"}},
{"content": "I prioritize system reliability.", "metadata": {"section": "behavior"}},
{"content": "I build with scalability in mind.", "metadata": {"section": "behavior"}},
{"content": "I analyze resource usage during runtime.", "metadata": {"section": "behavior"}},
{"content": "I treat failures as system improvement opportunities.", "metadata": {"section": "behavior"}},
{"content": "I design systems for global standards.", "metadata": {"section": "behavior"}},

# ================= VISION =================

{"content": "I aim to build a product-based technology company.", "metadata": {"section": "vision"}},
{"content": "I want to move abroad for global engineering exposure.", "metadata": {"section": "vision"}},
{"content": "I focus on building globally competitive skills.", "metadata": {"section": "vision"}},
{"content": "I align learning with startup-level execution.", "metadata": {"section": "vision"}},
{"content": "I seek to transform AI prototypes into real products.", "metadata": {"section": "vision"}},
{"content": "I invest in mastering engineering fundamentals.", "metadata": {"section": "vision"}},
{"content": "I benchmark myself against global developers.", "metadata": {"section": "vision"}},
{"content": "I prepare my portfolio for international standards.", "metadata": {"section": "vision"}},
{"content": "I aim to create intelligent scalable platforms.", "metadata": {"section": "vision"}},
{"content": "I treat my student phase as startup preparation.", "metadata": {"section": "vision"}},

# ================= CONTACT =================

{"content": "My Instagram handle is @0utcast.fizz.", "metadata": {"section": "contact"}},
{"content": "I currently do not have a LinkedIn profile but plan to create one in the future.", "metadata": {"section": "contact"}},
{"content": "I am open to global engineering opportunities.", "metadata": {"section": "contact"}},
{"content": "I am building a portfolio aligned with AI engineering.", "metadata": {"section": "contact"}},
{"content": "I focus on demonstrating capability through projects.", "metadata": {"section": "contact"}}

]



# ==========================================
# INITIALIZATION
# ==========================================
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_embedding(text: str):
    """Generates a 384-dimensional embedding using a local model."""
    embedding = embedding_model.encode(text)
    return embedding.tolist()

def seed_database():
    print(f"Starting ingestion of {len(RESUME_CHUNKS)} resume chunks...")
    
    for chunk in RESUME_CHUNKS:
        print(f"Processing: {chunk['metadata']['section']} section...")
        
        # 1. Generate the vector embedding
        embedding = get_embedding(chunk['content'])
        
        # 2. Upload to Supabase
        data = {
            "content": chunk["content"],
            "metadata": chunk["metadata"],
            "embedding": embedding
        }
        
        result = supabase.table("documents").insert(data).execute()
        
    print("DONE! Your AI now has memory.")

if __name__ == "__main__":
    if "YOUR_" in SUPABASE_URL:
        print("ERROR: Please fill in your URL first!")
    else:
        seed_database()
