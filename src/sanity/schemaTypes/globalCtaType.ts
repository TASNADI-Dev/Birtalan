// Shared CTA content referenced from multiple pages.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { BoltIcon } from '@sanity/icons/Bolt';

export const globalCtaType = defineType({
  name: 'globalCta',
  title: 'CTA szekció',
  type: 'document',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'CTA szekció',
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
      name: 'buttonLabel',
      title: 'Button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      buttonLabel: 'buttonLabel',
    },
    prepare({ buttonLabel }) {
      return {
        title: 'CTA szekció',
        subtitle: buttonLabel || 'Shared call to action',
      };
    },
  },
});
