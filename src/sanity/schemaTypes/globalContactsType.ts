// Shared contact details used on the contact page and in the footer.
import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const globalContactsType = defineType({
  name: 'globalContacts',
  title: 'Elérhetőségek',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Elérhetőségek',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Phone number shown on the contact page. Used as the call link.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Email address shown on the contact page. Used as the mail link.',
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
      type: 'url',
      description:
        'TikTok profile URL. Shown on the contact page and as an icon in the footer.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      description:
        'Instagram profile URL. Shown on the contact page and as an icon in the footer.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      description:
        'Facebook page URL. Shown as “BI-EM Beauty” on the contact page and as an icon in the footer.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Elérhetőségek' };
    },
  },
});
