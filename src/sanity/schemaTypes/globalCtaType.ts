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
      title: 'Cím',
      type: 'string',
      hidden: true,
      initialValue: 'CTA szekció',
    }),
    defineField({
      name: 'heading',
      title: 'Főcím',
      description:
        'Jelöld ki a szöveget, majd a „Kiemelés” vezérlővel alkalmazd a kiemelő színt.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normál', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Félkövér', value: 'strong' },
              { title: 'Kiemelés', value: 'emphasis' },
            ],
            annotations: [],
          },
        }),
      ],
      validation: (rule) => rule.required().max(1),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Gomb szövege',
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
        subtitle: buttonLabel || 'Megosztott felhívás',
      };
    },
  },
});
