// Singleton contact page document with intro copy and contact links.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Kapcsolat',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Kapcsolat',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      description: 'Rich text shown below the heading on the contact page.',
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
    }),
    defineField({
      name: 'contacts',
      title: 'Elérhetőségek',
      description:
        'Contact items shown on the page. Phone and email are clickable; TikTok and Instagram are plain text. Icons are fixed.',
      type: 'object',
      options: { columns: 2 },
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          description:
            'Phone number shown on the page. Used as the call link.',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'Email address shown on the page. Used as the mail link.',
          validation: (rule) =>
            rule.custom((value) => {
              if (!value) return true;
              const address = value.replace(/^mailto:/i, '');
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)
                ? true
                : 'Enter a valid email address';
            }),
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'string',
          description: 'TikTok handle or name shown on the page.',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
          description: 'Instagram handle or name shown on the page.',
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
