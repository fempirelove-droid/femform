import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || '';
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    '[Fempire] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set them in your host’s environment variables and rebuild.',
  );
}

/** Safe client — uses placeholders when env is missing so the UI can still mount. */
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwbGFjZWhvbGRlciIsInJvbGUiOiJhbm9uIiwiaWF0IjowLCJleHAiOjB9.placeholder',
);
