// Sanity schema registry. Add document and object types here as the CMS grows.
import { pageBuilderType } from './arrays/pageBuilderType';
import { sharedSectionsType } from './arrays/sharedSectionsType';
import { gallerySectionBlockType } from './blocks/gallerySectionBlockType';
import { heroBlockType } from './blocks/heroBlockType';
import { pageHeroSectionBlockType } from './blocks/pageHeroSectionBlockType';
import { splitSectionBlockType } from './blocks/splitSectionBlockType';
import { ctaSectionBlockType } from './blocks/ctaSectionBlockType';
import { testimonialSectionBlockType } from './blocks/testimonialSectionBlockType';
import { aboutPageType } from './documents/aboutPageType';
import { contactPageType } from './documents/contactPageType';
import { privacyPageType } from './documents/privacyPageType';
import { galleryPageType } from './documents/galleryPageType';
import { globalContactsType } from './documents/globalContactsType';
import { globalCtaType } from './documents/globalCtaType';
import { homePageType } from './documents/homePageType';
import { templatePageType } from './documents/templatePageType';
import { testimonialsType } from './documents/testimonialsType';
import { priceListType } from './objects/priceListType';
import { templatePageGalleryImageType } from './objects/templatePageGalleryImageType';

export const schemaTypes = [
  homePageType,
  aboutPageType,
  contactPageType,
  privacyPageType,
  galleryPageType,
  globalContactsType,
  globalCtaType,
  testimonialsType,
  templatePageGalleryImageType,
  priceListType,
  templatePageType,
  pageBuilderType,
  sharedSectionsType,
  heroBlockType,
  pageHeroSectionBlockType,
  splitSectionBlockType,
  gallerySectionBlockType,
  testimonialSectionBlockType,
  ctaSectionBlockType,
];

