// Seeds template pages used in navigation and split section button links.
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
  filename: 'template-hero-placeholder.jpg',
});

const heroDescription =
  'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...';

const templatePages = [
  {
    _id: 'templatePage-kozmetika',
    title: 'Kozmetikai szolgáltatások',
    slug: { _type: 'slug', current: 'szolgaltatasok/kozmetika' },
  },
  {
    _id: 'templatePage-sminktetovalas',
    title: 'Sminktetoválás',
    slug: { _type: 'slug', current: 'szolgaltatasok/sminktetovalas' },
  },
  {
    _id: 'templatePage-szemoldok-es-szempilla',
    title: 'Szemöldök- és szempilla stylist',
    slug: { _type: 'slug', current: 'szolgaltatasok/szemoldok-es-szempilla' },
  },
  {
    _id: 'templatePage-kez-es-labapolas',
    title: 'Kéz- és lábápolás',
    slug: { _type: 'slug', current: 'szolgaltatasok/kez-es-labapolas' },
  },
];

for (const page of templatePages) {
  await client.createOrReplace({
    _id: page._id,
    _type: 'templatePage',
    title: page.title,
    slug: page.slug,
    hero: {
      heading: page.title,
      description: heroDescription,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
        alt: 'BI-EM Beauty szalon belső tere',
      },
    },
  });
}

console.log(`Seeded ${templatePages.length} template pages in Sanity.`);
