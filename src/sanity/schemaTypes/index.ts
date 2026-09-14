// Sanity schema registry. Add document and object types here as the CMS grows.
import { gallerySectionBlockType } from './blocks/gallerySectionBlockType';
import { heroBlockType } from './blocks/heroBlockType';
import { pageHeroSectionBlockType } from './blocks/pageHeroSectionBlockType';
import { splitSectionBlockType } from './blocks/splitSectionBlockType';
import { testimonialSectionBlockType } from './blocks/testimonialSectionBlockType';
import { aboutPageType } from './aboutPageType';
import { contactPageType } from './contactPageType';
import { galleryPageType } from './galleryPageType';
import { homePageType } from './homePageType';
import { pageBuilderType } from './pageBuilderType';
import { templatePageGalleryImageType } from './templatePageGalleryImageType';
import { priceListType } from './priceListType';
import { templatePageType } from './templatePageType';
import { testimonialsType } from './testimonialsType';
import { sharedSectionsType } from './sharedSectionsType';

export const schemaTypes = [
  homePageType,
  aboutPageType,
  contactPageType,
  galleryPageType,
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
];

