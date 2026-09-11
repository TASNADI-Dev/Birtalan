// Editable pricing table rows for template pages.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { ThListIcon } from '@sanity/icons/ThList';

export const priceListType = defineType({
  name: 'priceList',
  title: 'Árlista',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'rows',
      title: 'Árak',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'priceListRow',
          fields: [
            defineField({
              name: 'category',
              title: 'Kategória',
              type: 'string',
              description:
                'Csoportcím (pl. „Szemöldök tetoválások”). Csak az adott csoport első soránál szükséges.',
            }),
            defineField({
              name: 'service',
              title: 'Szolgáltatás',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Ár',
              type: 'string',
              description: 'Pl. "79 000 Ft" vagy "Egyedi árazás"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Leírás',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'service',
              subtitle: 'price',
              category: 'category',
            },
            prepare({ title, subtitle, category }) {
              return {
                title,
                subtitle: [category, subtitle].filter(Boolean).join(' · '),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'infoSections',
      title: 'Információs szekciók',
      type: 'array',
      description: 'Pl. korrekciós feltételek, frissítési árak',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'priceListInfoSection',
          fields: [
            defineField({
              name: 'heading',
              title: 'Cím',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'intro',
              title: 'Bevezető',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'bullets',
              title: 'Felsorolás',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'notes',
              title: 'Megjegyzések',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'További bekezdések a felsorolás után',
            }),
          ],
          preview: {
            select: { title: 'heading' },
          },
        }),
      ],
    }),
    defineField({
      name: 'footnote',
      title: 'Lábjegyzet',
      type: 'text',
      rows: 3,
      description: 'Pl. érvényesség, ÁFA megjegyzés',
    }),
  ],
  preview: {
    select: { rows: 'rows' },
    prepare({ rows }) {
      const count = Array.isArray(rows) ? rows.length : 0;
      return {
        title: 'Árlista',
        subtitle: count ? `${count} sor` : 'Nincs sor',
      };
    },
  },
});
