// Singleton gallery page document with CMS instructions for editors.
import { defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons/Images';

export const GALLERY_PAGE_INSTRUCTIONS =
  'A képeket a Sablon oldalak alatt, az egyes szolgáltatások Galéria képek mezőjében töltsd fel. A galéria oldalon minden fül egy szolgáltatás címét mutatja, és az adott oldalhoz feltöltött képeket jeleníti meg.';

export const galleryPageType = defineType({
  name: 'galleryPage',
  title: 'Galéria',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Galéria',
    }),
    defineField({
      name: 'instructions',
      title: 'Útmutató',
      type: 'text',
      rows: 4,
      readOnly: true,
      initialValue: GALLERY_PAGE_INSTRUCTIONS,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return { title: title || 'Galéria' };
    },
  },
});
