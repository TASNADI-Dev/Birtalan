// Gallery image object for template pages; category comes from the parent page at query time.
import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';

export const templatePageGalleryImageType = defineType({
  name: 'templatePageGalleryImage',
  title: 'Galériakép',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Kép',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatív szöveg',
          type: 'string',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'image.alt',
    },
    prepare({ media, alt }) {
      return {
        title: alt || 'Galériakép',
        media,
      };
    },
  },
});
