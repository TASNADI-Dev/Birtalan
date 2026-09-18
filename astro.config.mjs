// Astro config: Tailwind, Sanity client, and embedded Studio at /admin.
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { flatSitemap } from './src/integrations/flat-sitemap.ts';

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
  site: 'https://biembeauty.hu',

  redirects: {
    '/rolunk': '/rolam',
    '/kez-es-labapolas': '/szolgaltatasok/kez-es-labapolas',
  },

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
    sitemap({
      filter: (page) => !page.includes('/admin'),
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
    }),
    // Must run after @astrojs/sitemap so chunk/index files exist to flatten.
    flatSitemap(),
  ],
});
