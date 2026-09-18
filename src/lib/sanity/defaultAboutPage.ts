// Default about page sections used until Sanity has a published document.
import { asset } from '../assets';
import type { PageSection } from './queries';

export const defaultAboutSections: PageSection[] = [
  {
    _type: 'pageHeroSection',
    _key: 'default-about-hero',
    heading: 'Rólam',
    description: [
      {
        _type: 'block',
        _key: 'default-about-hero-description',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'default-about-hero-description-span',
            text: 'A BI-EM Beauty modern, nyugodt és igényes környezetben kínál arckezeléseket, szépészeti szolgáltatásokat és professzionális megoldásokat azoknak, akik valódi feltöltődésre vágynak.',
            marks: [],
          },
        ],
      },
    ],
    fallbackImageUrl: asset('home/hero-faded.webp'),
    alt: 'Egy fiatal nő az arcához emeli a kezét és mosolyog.',
  },
];
