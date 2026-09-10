// Sanity schema registry. Add document and object types here as the CMS grows.
import { heroBlockType } from './blocks/heroBlockType';
import { pageBuilderType } from './pageBuilderType';
import { pageType } from './pageType';

export const schemaTypes = [pageType, pageBuilderType, heroBlockType];
