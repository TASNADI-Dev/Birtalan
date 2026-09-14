// Split image/text section block for the home page page builder.
import { defineField, defineType } from 'sanity';
import { InlineIcon } from '@sanity/icons/Inline';

export const splitSectionBlockType = defineType({
  name: 'splitSection',
  title: 'Osztott szekció',
  type: 'object',
  icon: InlineIcon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Elrendezés',
      type: 'string',
      options: {
        list: [
          { title: 'Kép balra, szöveg jobbra', value: 'image-text' },
          { title: 'Szöveg balra, kép jobbra', value: 'text-image' },
        ],
        layout: 'radio',
      },
      initialValue: 'image-text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Kép',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternatív szöveg',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Főcím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph',
      title: 'Bekezdés',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Gomb link',
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
        variant === 'text-image' ? 'Szöveg · Kép' : 'Kép · Szöveg';
      return {
        title: heading || 'Osztott szekció',
        subtitle: layout,
        media,
      };
    },
  },
});
