const { createClient } = require('@supabase/supabase-js');

// These will be provided by environment variables in GitHub Actions
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
  console.log('Pinging Supabase to keep project active...');
  
  try {
    // Perform a simple count query on the documents table
    const { data, error, count } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    console.log(`Success: Found ${count} documents. Activity registered.`);
  } catch (error) {
    console.error('Error pinging Supabase:', error.message);
    process.exit(1);
  }
}

keepAlive();
