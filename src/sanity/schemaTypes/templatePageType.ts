// Template pages linked from navigation and split section buttons.
import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons/Document';

export const templatePageType = defineType({
  name: 'templatePage',
  title: 'Sablon oldal',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL path',
      description: 'Relative path without leading slash, e.g. szolgaltatasok/kozmetika',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug ? `/${slug}` : undefined,
      };
    },
  },
});
