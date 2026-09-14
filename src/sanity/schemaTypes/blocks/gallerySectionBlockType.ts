// Gallery section block for the home page page builder.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons/Images';
import { ArrayWithMaxItems } from '../../components/ArrayWithMaxItems';

const GALLERY_IMAGE_COUNT = 8;

export const gallerySectionBlockType = defineType({
  name: 'gallerySection',
  title: 'Galéria szekció',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Főcím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Galéria képek',
      type: 'array',
      description: `Pontosan ${GALLERY_IMAGE_COUNT} kép szükséges.`,
      components: {
        input: ArrayWithMaxItems,
      },
      options: {
        disableActions: ['addBefore', 'addAfter'],
      },
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({
              name: 'image',
              title: 'Kép',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternatív szöveg',
              type: 'string',
            }),
          ],
          preview: {
            select: { media: 'image', title: 'alt' },
          },
        }),
      ],
      validation: (rule) =>
        rule
          .required()
          .min(GALLERY_IMAGE_COUNT)
          .max(GALLERY_IMAGE_COUNT)
          .error(`Pontosan ${GALLERY_IMAGE_COUNT} kép szükséges.`),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      image: 'images.0.image',
    },
    prepare({ heading, image }) {
      return {
        title: heading || 'Galéria szekció',
        subtitle: '8 kép',
        media: image,
      };
    },
  },
});
