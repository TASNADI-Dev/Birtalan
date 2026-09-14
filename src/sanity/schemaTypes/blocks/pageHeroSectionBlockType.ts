// Two-column page hero: heading and paragraph on the left, image on the right.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';

export const pageHeroSectionBlockType = defineType({
  name: 'pageHeroSection',
  title: 'Oldal hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Főcím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Bekezdés',
      description: 'A főcím alatt megjelenő formázott szöveg.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normál', value: 'normal' }],
          lists: [
            { title: 'Felsorolás', value: 'bullet' },
            { title: 'Számozott', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Félkövér', value: 'strong' },
              { title: 'Kiemelés', value: 'em' },
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
        title: heading || 'Oldal hero',
        subtitle: text,
        media,
      };
    },
  },
});
