// Two-column page hero: heading and paragraph on the left, image on the right.
import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';

export const pageHeroSectionBlockType = defineType({
  name: 'pageHeroSection',
  title: 'Page hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Paragraph',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
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
      heading: 'heading',
      description: 'description',
      media: 'image',
    },
    prepare({ heading, description, media }) {
      return {
        title: heading || 'Page hero',
        subtitle: description,
        media,
      };
    },
  },
});
