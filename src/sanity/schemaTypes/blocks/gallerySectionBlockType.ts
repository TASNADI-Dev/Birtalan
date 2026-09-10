// Gallery section block for the home page page builder.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons/Images';
import { ArrayWithMaxItems } from '../../components/ArrayWithMaxItems';

const GALLERY_IMAGE_COUNT = 8;

export const gallerySectionBlockType = defineType({
  name: 'gallerySection',
  title: 'Gallery section',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery images',
      type: 'array',
      description: `Exactly ${GALLERY_IMAGE_COUNT} images required.`,
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
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.required(),
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
          .error(`Exactly ${GALLERY_IMAGE_COUNT} images are required.`),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      image: 'images.0.image',
    },
    prepare({ heading, image }) {
      return {
        title: heading || 'Gallery section',
        subtitle: '8 images',
        media: image,
      };
    },
  },
});
