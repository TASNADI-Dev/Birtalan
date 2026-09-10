// Hero section block for the home page page builder.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { BlockElementIcon } from '@sanity/icons/BlockElement';

export const heroBlockType = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow tags',
      description: 'Short labels shown above the heading, separated by dots.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description:
        'Select text and use the “Emphasis” control to apply the accent color.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'emphasis' },
            ],
            annotations: [],
          },
        }),
      ],
      validation: (rule) => rule.required().max(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow',
      description: 'description',
    },
    prepare({ eyebrow, description }) {
      const tags = Array.isArray(eyebrow) ? eyebrow.join(' · ') : '';
      return {
        title: tags || 'Hero',
        subtitle: description,
      };
    },
  },
});
