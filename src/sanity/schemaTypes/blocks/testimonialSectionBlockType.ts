// Page section that references a shared testimonials document.
import { defineField, defineType } from 'sanity';
import { CommentIcon } from '@sanity/icons/Comment';

export const testimonialSectionBlockType = defineType({
  name: 'testimonialSection',
  title: 'Vélemények',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'testimonialSet',
      title: 'Vélemények',
      description:
        'Válaszd ki a megosztott vélemények dokumentumot. Annak módosítása minden oldalon frissíti a véleményeket.',
      type: 'reference',
      to: [{ type: 'testimonials' }],
      initialValue: {
        _type: 'reference',
        _ref: 'testimonials',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Rólam mondták',
        subtitle: 'Megosztott vélemények',
      };
    },
  },
});
