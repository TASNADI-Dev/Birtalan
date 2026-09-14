// Shared contact details used on the contact page and in the footer.
import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const GLOBAL_CONTACTS_INSTRUCTIONS =
  'Az itt megadott elérhetőségek a Kapcsolat oldalon jelennek meg. A közösségi média linkek a weboldal láblécében is láthatók. Ha itt módosítasz egy adatot, a Kapcsolat oldal és a lábléc is automatikusan frissül.';

export const globalContactsType = defineType({
  name: 'globalContacts',
  title: 'Elérhetőségek',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      hidden: true,
      initialValue: 'Elérhetőségek',
    }),
    defineField({
      name: 'instructions',
      title: 'Útmutató',
      type: 'text',
      rows: 3,
      readOnly: true,
      initialValue: GLOBAL_CONTACTS_INSTRUCTIONS,
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      description:
        'A Kapcsolat oldalon megjelenő telefonszám. Hívás linkként is használható.',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      description:
        'A Kapcsolat oldalon megjelenő e-mail cím. Levél linkként is használható.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          const address = value.replace(/^mailto:/i, '');
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)
            ? true
            : 'Adj meg érvényes e-mail címet';
        }),
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      description:
        'TikTok profil URL. Megjelenik a Kapcsolat oldalon és ikonként a láblécben.',
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
        'Instagram profil URL. Megjelenik a Kapcsolat oldalon és ikonként a láblécben.',
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
        'Facebook oldal URL. A Kapcsolat oldalon „BI-EM Beauty” néven jelenik meg, a láblécben pedig ikonként.',
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
