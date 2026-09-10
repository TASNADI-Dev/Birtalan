// Astro config: Tailwind, Sanity client, and embedded Studio at /admin.
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { loadEnv } from 'vite';

const env = {
  ...loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), ''),
  ...process.env,
};

const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID. Copy .env.example to .env.');
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle Studio deps so Vite doesn't re-optimize mid-session
    // (which causes 504 "Outdated Optimize Dep" and breaks /admin hydration).
    optimizeDeps: {
      holdUntilCrawlEnd: true,
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-is',
        'react-compiler-runtime',
        'styled-components',
        'sanity',
        '@sanity/client',
        '@sanity/ui',
        'history',
        'lodash/startCase.js',
      ],
    },
  },

  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2026-03-01',
      useCdn: false,
      studioBasePath: '/admin',
      // Hash routing avoids /admin/structure 404s on static dev and refresh.
      studioRouterHistory: 'hash',
    }),
    react(),
  ],
});
