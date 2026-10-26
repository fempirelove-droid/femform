import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
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
  plugins: [
    supabaseEnvBridge(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['robots.txt', 'sitemap.xml', 'og-default.jpg', 'apple-touch-icon.jpg', 'icons/icon-1024.jpg'],
      manifest: {
        name: 'Fempire.Love',
        short_name: 'Fempire',
        description:
          'A warm digital home for women across Curaçao, the Caribbean and the diaspora.',
        theme_color: '#601733',
        background_color: '#601733',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        lang: 'en',
        icons: [
          {
            src: '/icons/icon-1024.jpg',
            sizes: '1024x1024',
            type: 'image/jpeg',
            purpose: 'any',
          },
          {
            src: '/icons/icon-1024.jpg',
            sizes: '1024x1024',
            type: 'image/jpeg',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,jpg,jpeg,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-css',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
