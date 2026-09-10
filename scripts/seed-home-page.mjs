// Seeds the Home Page singleton in Sanity with the current hero content.
import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID.');
}

if (!token) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN for seeding content.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-01',
  token,
  useCdn: false,
});

await client.createOrReplace({
  _id: 'homePage',
  _type: 'page',
  sections: [
    {
      _type: 'heroSection',
      _key: 'home-hero',
      eyebrow: ['Kozmetika', 'szépség', 'önbizalom'],
      heading: [
        {
          _type: 'block',
          _key: 'home-hero-heading',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'home-hero-heading-emphasis',
              text: 'Finom elegancia, személyre szabott',
              marks: ['emphasis'],
            },
            {
              _type: 'span',
              _key: 'home-hero-heading-rest',
              text: ' szépségápolás.',
              marks: [],
            },
          ],
        },
      ],
      description:
        'A BI-EM Beauty modern, nyugodt és igényes környezetben kínál arckezeléseket, szépészeti szolgáltatásokat és professzionális megoldásokat azoknak, akik valódi feltöltődésre vágynak.',
      buttonLabel: 'Időpontfoglalás',
    },
  ],
});

console.log('Seeded homePage document in Sanity.');
