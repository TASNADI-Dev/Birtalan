// Default home page sections used until Sanity has a published document.
import type { PageSection } from './queries';

const placeholderImage =
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=800&fit=crop';

export const defaultHomeSections: PageSection[] = [
  {
    _type: 'heroSection',
    _key: 'default-hero',
    eyebrow: ['Kozmetika', 'szépség', 'önbizalom'],
    heading: [
      {
        _type: 'block',
        _key: 'default-heading',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'default-heading-emphasis',
            text: 'Finom elegancia, személyre szabott',
            marks: ['emphasis'],
          },
          {
            _type: 'span',
            _key: 'default-heading-rest',
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
    _key: 'default-split-1',
    variant: 'image-text',
    fallbackImageUrl: placeholderImage,
    alt: 'Arckezelés a BI-EM Beauty szalonban',
    heading: 'Kozmetikai szolgáltatások',
    paragraph:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    buttonHref: '/szolgaltatasok/kozmetika',
    buttonLabel: 'Részletek',
  },
  {
    _type: 'splitSection',
    _key: 'default-split-2',
    variant: 'text-image',
    fallbackImageUrl: placeholderImage,
    alt: 'Arckezelés a BI-EM Beauty szalonban',
    heading: 'Sminktetoválás',
    paragraph:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    buttonHref: '/szolgaltatasok/sminktetovalas',
    buttonLabel: 'Részletek',
  },
  {
    _type: 'splitSection',
    _key: 'default-split-3',
    variant: 'image-text',
    fallbackImageUrl: placeholderImage,
    alt: 'Arckezelés a BI-EM Beauty szalonban',
    heading: 'Szemöldök- és szempilla stylist',
    paragraph:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    buttonHref: '/szolgaltatasok/szemoldok-es-szempilla',
    buttonLabel: 'Részletek',
  },
  {
    _type: 'splitSection',
    _key: 'default-split-4',
    variant: 'text-image',
    fallbackImageUrl: placeholderImage,
    alt: 'Arckezelés a BI-EM Beauty szalonban',
    heading: 'Kéz- és lábápolás',
    paragraph:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    buttonHref: '/szolgaltatasok/kez-es-labapolas',
    buttonLabel: 'Részletek',
  },
];
