// Default home page hero content used until Sanity has a published document.
import type { HeroSection } from './queries';

export const defaultHomeHero: HeroSection = {
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
};
