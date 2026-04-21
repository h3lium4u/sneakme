-- 1. Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- 2. Create the documents table
create table if not exists documents (
  id bigserial primary key,
  content text not null,
  metadata jsonb,
  embedding vector(384) -- all-MiniLM-L6-v2 produces 384-dimensional embeddings
);

-- 3. Create the chat_queries table for logging
create table if not exists chat_queries (
  id bigserial primary key,
  query text not null,
  answer text,
  context_count int,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create the match_documents function for vector similarity search
create or replace function match_documents (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
