// Gallery image object for template pages; category comes from the parent page at query time.
import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';

export const templatePageGalleryImageType = defineType({
  name: 'templatePageGalleryImage',
  title: 'Gallery image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
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
        title: alt || 'Gallery image',
        media,
      };
    },
  },
});
