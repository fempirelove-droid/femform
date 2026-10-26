import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * Supabase’s Vercel integration injects SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY
 * (and NEXT_PUBLIC_*). Vite only exposes VITE_* to the client — bridge them here.
 */
function supabaseEnvBridge(): Plugin {
  return {
    name: 'supabase-env-bridge',
    config(_config, { mode }) {
      const env = loadEnv(mode, process.cwd(), '');
      const url =
        env.VITE_SUPABASE_URL ||
        process.env.VITE_SUPABASE_URL ||
        env.SUPABASE_URL ||
        process.env.SUPABASE_URL ||
        env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        '';
      const key =
        env.VITE_SUPABASE_ANON_KEY ||
        process.env.VITE_SUPABASE_ANON_KEY ||
        env.SUPABASE_PUBLISHABLE_KEY ||
        process.env.SUPABASE_PUBLISHABLE_KEY ||
        env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        '';

      if (url) process.env.VITE_SUPABASE_URL = url;
      if (key) process.env.VITE_SUPABASE_ANON_KEY = key;
    },
  };
}

export default defineConfig({
  plugins: [supabaseEnvBridge(), react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
