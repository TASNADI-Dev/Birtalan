// Template pages linked from navigation and split section buttons.
import { defineArrayMember, defineField, defineType } from 'sanity';
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
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceList',
      title: 'Árlista',
      type: 'priceList',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galéria képek',
      type: 'array',
      description:
        'Add as many images as needed. When queried, each image is tagged with this page title and URL path.',
      options: {
        layout: 'grid',
      },
      of: [defineArrayMember({ type: 'templatePageGalleryImage' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'hero.image',
      imageCount: 'length(galleryImages)',
    },
    prepare({ title, slug, media, imageCount }) {
      const galleryLabel =
        typeof imageCount === 'number' && imageCount > 0
          ? `${imageCount} gallery image${imageCount === 1 ? '' : 's'}`
          : undefined;

      return {
        title,
        subtitle: [slug ? `/${slug}` : undefined, galleryLabel]
          .filter(Boolean)
          .join(' · '),
        media,
      };
    },
  },
});
