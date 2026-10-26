import { isSupabaseConfigured } from '@/lib/supabase';

export function ConfigBanner() {
  if (isSupabaseConfigured) return null;

  return (
    <div
      className="fixed top-0 inset-x-0 z-[300] px-4 py-3 text-center text-sm font-semibold"
      style={{
        background: 'linear-gradient(90deg, #c43d68, #c68a2e)',
        color: '#241019',
      }}
    >
      Supabase env not visible to Vite yet. Connect the Supabase integration in Vercel (or set{' '}
      <code className="font-bold">VITE_SUPABASE_*</code>), then redeploy.
    </div>
  );
}
