// Split image/text section block for the home page page builder.
import { defineField, defineType } from 'sanity';
import { InlineIcon } from '@sanity/icons/Inline';

export const splitSectionBlockType = defineType({
  name: 'splitSection',
  title: 'Split section',
  type: 'object',
  icon: InlineIcon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Image left, text right', value: 'image-text' },
          { title: 'Text left, image right', value: 'text-image' },
        ],
        layout: 'radio',
      },
      initialValue: 'image-text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button link',
      type: 'reference',
      to: [{ type: 'templatePage' }],
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      variant: 'variant',
      media: 'image',
    },
    prepare({ heading, variant, media }) {
      const layout =
        variant === 'text-image' ? 'Text · Image' : 'Image · Text';
      return {
        title: heading || 'Split section',
        subtitle: layout,
        media,
      };
    },
  },
});
