// Sanity schema registry. Add document and object types here as the CMS grows.
import { gallerySectionBlockType } from './blocks/gallerySectionBlockType';
import { heroBlockType } from './blocks/heroBlockType';
import { splitSectionBlockType } from './blocks/splitSectionBlockType';
import { homePageType } from './homePageType';
import { pageBuilderType } from './pageBuilderType';
import { templatePageType } from './templatePageType';

export const schemaTypes = [
  homePageType,
  templatePageType,
  pageBuilderType,
  heroBlockType,
  splitSectionBlockType,
  gallerySectionBlockType,
];
