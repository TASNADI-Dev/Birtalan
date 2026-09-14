// Two-column page hero: heading and paragraph on the left, image on the right.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';

export const pageHeroSectionBlockType = defineType({
  name: 'pageHeroSection',
  title: 'Page hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Paragraph',
      description: 'Rich text shown below the heading.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
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
  preview: {
    select: {
      heading: 'heading',
      description: 'description',
      media: 'image',
    },
    prepare({ heading, description, media }) {
      const text =
        description?.[0]?.children
          ?.map((child: { text?: string }) => child.text ?? '')
          .join('') ?? '';

      return {
        title: heading || 'Page hero',
        subtitle: text,
        media,
      };
    },
  },
});
