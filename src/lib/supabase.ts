import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Prefer VITE_* (local .env). On Vercel, vite.config bridges Supabase integration
 * vars (SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_*) into VITE_* at build.
 */
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || '';
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    '[Fempire] Missing Supabase URL/key. Connect Supabase in Vercel (or set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY) and rebuild.',
  );
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwbGFjZWhvbGRlciIsInJvbGUiOiJhbm9uIiwiaWF0IjowLCJleHAiOjB9.placeholder',
);
