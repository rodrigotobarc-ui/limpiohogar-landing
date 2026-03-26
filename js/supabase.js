/**
 * Supabase integration for LimpioHogar
 * Replace SUPABASE_URL and SUPABASE_ANON_KEY with real values
 */

const SUPABASE_URL = 'https://ysxksjviykysdyqqpftr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_cqvKMc5DsfJgKxiglkpAAw_QfhFoWv3';

async function insertCandidata(data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/candidatas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(data)
  });
  return response.ok;
}
