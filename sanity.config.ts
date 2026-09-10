// Sanity Studio config. Mounted in Astro at /admin via @sanity/astro.
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  import.meta.env.PUBLIC_SANITY_DATASET ||
  process.env.PUBLIC_SANITY_DATASET ||
  'production';

if (!projectId) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID. Copy .env.example to .env.');
}

export default defineConfig({
  name: 'birtalan',
  title: 'Birtalan',
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  releases: {
    enabled: false,
  },
  scheduledDrafts: {
    enabled: false,
  },
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return [];
      }
      return prev;
    },
  },
});
