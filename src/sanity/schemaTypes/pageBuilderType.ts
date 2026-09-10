// Draggable page sections used on CMS-managed pages.
import { defineArrayMember, defineType } from 'sanity';

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page sections',
  type: 'array',
  of: [
    defineArrayMember({ type: 'heroSection' }),
    defineArrayMember({ type: 'splitSection' }),
    defineArrayMember({ type: 'gallerySection' }),
  ],
});
