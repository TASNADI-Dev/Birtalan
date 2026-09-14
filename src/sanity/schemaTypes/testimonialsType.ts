// Shared testimonials document referenced from multiple pages.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { CommentIcon } from '@sanity/icons/Comment';

export const testimonialsType = defineType({
  name: 'testimonials',
  title: 'Vélemények',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      hidden: true,
      initialValue: 'Rólunk mondták',
    }),
    defineField({
      name: 'items',
      title: 'Vélemények',
      description:
        'Add hozzá a véleményeket a megjelenési sorrendben. Az oldal három oszlopban jeleníti meg őket.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Idézet',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Név',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              quote: 'quote',
              name: 'name',
            },
            prepare({ quote, name }) {
              return {
                title: name || 'Vélemény',
                subtitle: quote,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: 'Rólunk mondták',
        subtitle: `${count} vélemény`,
      };
    },
  },
});
