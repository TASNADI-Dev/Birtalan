// Sanity schema registry. Add document and object types here as the CMS grows.
import { gallerySectionBlockType } from './blocks/gallerySectionBlockType';
import { heroBlockType } from './blocks/heroBlockType';
import { pageHeroSectionBlockType } from './blocks/pageHeroSectionBlockType';
import { splitSectionBlockType } from './blocks/splitSectionBlockType';
import { aboutPageType } from './aboutPageType';
import { contactPageType } from './contactPageType';
import { galleryPageType } from './galleryPageType';
import { homePageType } from './homePageType';
import { pageBuilderType } from './pageBuilderType';
import { templatePageGalleryImageType } from './templatePageGalleryImageType';
import { templatePageType } from './templatePageType';

export const schemaTypes = [
  homePageType,
  aboutPageType,
  contactPageType,
  galleryPageType,
  templatePageGalleryImageType,
  templatePageType,
  pageBuilderType,
  heroBlockType,
  pageHeroSectionBlockType,
  splitSectionBlockType,
  gallerySectionBlockType,
];

