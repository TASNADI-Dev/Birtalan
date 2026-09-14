// Singleton contact page document with intro copy.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const CONTACT_PAGE_INSTRUCTIONS =
  'A telefon-, e-mail- és közösségi média linkeket az Elérhetőségek oldalon tudod módosítani. Az ott végzett változtatások a Kapcsolat oldalon és a láblécben is megjelennek.';

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Kapcsolat',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      hidden: true,
      initialValue: 'Kapcsolat',
    }),
    defineField({
      name: 'instructions',
      title: 'Útmutató',
      type: 'text',
      rows: 3,
      readOnly: true,
      initialValue: CONTACT_PAGE_INSTRUCTIONS,
    }),
    defineField({
      name: 'intro',
      title: 'Bevezető',
      description: 'A Kapcsolat oldalon a főcím alatt megjelenő formázott szöveg.',
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
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Kapcsolat' };
    },
  },
});
