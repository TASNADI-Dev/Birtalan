// Singleton about page document with draggable sections.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons/Users';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Rólam',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      hidden: true,
      initialValue: 'Rólam',
    }),
    defineField({
      name: 'sections',
      title: 'Szekciók',
      type: 'array',
      of: [
        defineArrayMember({ type: 'pageHeroSection' }),
        defineArrayMember({ type: 'testimonialSection' }),
        defineArrayMember({ type: 'ctaSection' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Rólam' };
    },
  },
});
