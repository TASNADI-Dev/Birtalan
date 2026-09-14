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
      title: 'Cím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL útvonal',
      description:
        'Relatív útvonal perjel nélkül, pl. szolgaltatasok/kozmetika',
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
          title: 'Főcím',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Leírás',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Kép',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternatív szöveg',
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
      name: 'sections',
      title: 'Szekciók',
      type: 'sharedSections',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galéria képek',
      type: 'array',
      description:
        'Tetszőleges számú kép feltöltése. Ezek a képek jelennek meg a Galéria oldalon is.',
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
          ? `${imageCount} galériakép`
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
