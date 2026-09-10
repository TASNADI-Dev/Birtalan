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

const placeholderImage =
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=800&fit=crop';

const imageAsset = await client.assets.upload('image', placeholderImage, {
  filename: 'split-section-placeholder.jpg',
});

await client.createOrReplace({
  _id: 'homePage',
  _type: 'homePage',
  title: 'Főoldal',
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
    {
      _type: 'splitSection',
      _key: 'home-split-1',
      variant: 'image-text',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      },
      alt: 'Arckezelés a BI-EM Beauty szalonban',
      heading: 'Kozmetikai szolgáltatások',
      paragraph:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      buttonLink: {
        _type: 'reference',
        _ref: 'templatePage-kozmetika',
      },
    },
    {
      _type: 'splitSection',
      _key: 'home-split-2',
      variant: 'text-image',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      },
      alt: 'Arckezelés a BI-EM Beauty szalonban',
      heading: 'Sminktetoválás',
      paragraph:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      buttonLink: {
        _type: 'reference',
        _ref: 'templatePage-sminktetovalas',
      },
    },
    {
      _type: 'splitSection',
      _key: 'home-split-3',
      variant: 'image-text',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      },
      alt: 'Arckezelés a BI-EM Beauty szalonban',
      heading: 'Szemöldök- és szempilla stylist',
      paragraph:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      buttonLink: {
        _type: 'reference',
        _ref: 'templatePage-szemoldok-es-szempilla',
      },
    },
    {
      _type: 'splitSection',
      _key: 'home-split-4',
      variant: 'text-image',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      },
      alt: 'Arckezelés a BI-EM Beauty szalonban',
      heading: 'Kéz- és lábápolás',
      paragraph:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      buttonLink: {
        _type: 'reference',
        _ref: 'templatePage-kez-es-labapolas',
      },
    },
  ],
});

console.log('Seeded homePage document in Sanity.');
