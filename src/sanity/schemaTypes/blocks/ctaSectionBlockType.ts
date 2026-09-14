// Page section that references the shared global CTA document.
import { defineField, defineType } from 'sanity';
import { BoltIcon } from '@sanity/icons/Bolt';

export const ctaSectionBlockType = defineType({
  name: 'ctaSection',
  title: 'CTA',
  type: 'object',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'ctaSet',
      title: 'CTA tartalom',
      description:
        'Válaszd ki a megosztott CTA dokumentumot. Annak módosítása minden oldalon frissíti a felhívást.',
      type: 'reference',
      to: [{ type: 'globalCta' }],
      initialValue: {
        _type: 'reference',
        _ref: 'globalCta',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'CTA',
        subtitle: 'Megosztott felhívás',
      };
    },
  },
});
