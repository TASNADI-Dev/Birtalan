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
      title: 'Címkék',
      description: 'Rövid feliratok a főcím felett, pontokkal elválasztva.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
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
      name: 'description',
      title: 'Leírás',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
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
