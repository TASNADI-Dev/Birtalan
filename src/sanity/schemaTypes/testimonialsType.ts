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
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Rólunk mondták',
    }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      description:
        'Add testimonials in the order they should appear. The site lays them out in three columns.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
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
                title: name || 'Testimonial',
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
        subtitle: `${count} testimonial${count === 1 ? '' : 's'}`,
      };
    },
  },
});
