// Template pages linked from navigation and split section buttons.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons/Document';
import {
  TEMPLATE_PAGE_FOLDER,
  slugifyTemplatePage,
  templatePageHref,
} from '../../../lib/sanity/templatePagePath';

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
      title: 'Slug',
      description: `Perjel nélkül, pl. kozmetika. Az oldal címe automatikusan /${TEMPLATE_PAGE_FOLDER}/ + slug lesz.`,
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: slugifyTemplatePage,
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = value?.current?.trim();
          if (!current) return 'A slug megadása kötelező';
          if (current.includes('/')) {
            return 'A slug ne tartalmazzon perjelet';
          }
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)) {
            return 'Csak kisbetűk, számok és kötőjelek használhatók';
          }
          return true;
        }),
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
      title: 'További szekciók',
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
        subtitle: [slug ? templatePageHref(slug) : undefined, galleryLabel]
          .filter(Boolean)
          .join(' · '),
        media,
      };
    },
  },
});
