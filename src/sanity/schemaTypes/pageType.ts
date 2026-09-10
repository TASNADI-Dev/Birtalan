// CMS-managed page document with draggable sections.
import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons/Document';

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'pageBuilder',
    }),
  ],
  preview: {
    select: {
      sections: 'sections',
    },
    prepare({ sections }) {
      const count = Array.isArray(sections) ? sections.length : 0;
      return {
        title: 'Page',
        subtitle: count === 1 ? '1 section' : `${count} sections`,
      };
    },
  },
});
