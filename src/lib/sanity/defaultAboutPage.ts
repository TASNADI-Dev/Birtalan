// Default about page sections used until Sanity has a published document.
import { asset } from '../assets';
import type { PageSection } from './queries';

export const defaultAboutSections: PageSection[] = [
  {
    _type: 'pageHeroSection',
    _key: 'default-about-hero',
    heading: 'Rólunk',
    description:
      'A BI-EM Beauty modern, nyugodt és igényes környezetben kínál arckezeléseket, szépészeti szolgáltatásokat és professzionális megoldásokat azoknak, akik valódi feltöltődésre vágynak.',
    fallbackImageUrl: asset('home/hero.webp'),
    alt: 'BI-EM Beauty szalon belső tere',
  },
];
