// Singleton privacy policy page with rich text body content.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { LockIcon } from '@sanity/icons/Lock';

export const privacyPageType = defineType({
  name: 'privacyPage',
  title: 'Adatvédelmi nyilatkozat',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      hidden: true,
      initialValue: 'Adatvédelmi nyilatkozat',
    }),
    defineField({
      name: 'content',
      title: 'Tartalom',
      description: 'Az adatvédelmi nyilatkozat szövege. A főcím az oldalon fixen jelenik meg.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normál', value: 'normal' },
            { title: 'Címsor 2', value: 'h2' },
            { title: 'Címsor 3', value: 'h3' },
            { title: 'Címsor 4', value: 'h4' },
          ],
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
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Adatvédelmi nyilatkozat' };
    },
  },
});
