// Shared testimonials document referenced from multiple pages.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { CommentIcon } from '@sanity/icons/Comment';

export const TESTIMONIALS_INSTRUCTIONS =
  'Ez egy globális beállítás: az itt megadott vélemények minden olyan oldalon megjelennek, ahová a Vélemények szekciót hozzáadod. A Főoldalon, a Rólam oldalon és a sablon oldalakon tudod beszúrni a szekciót. Ha itt módosítasz, minden érintett oldal automatikusan frissül.';

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
      initialValue: 'Rólam mondták',
    }),
    defineField({
      name: 'instructions',
      title: 'Útmutató',
      type: 'text',
      rows: 4,
      readOnly: true,
      initialValue: TESTIMONIALS_INSTRUCTIONS,
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
        title: 'Rólam mondták',
        subtitle: `${count} vélemény`,
      };
    },
  },
});
