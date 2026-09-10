// Singleton about page document with draggable sections.
import { defineArrayMember, defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons/Users';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Rólunk',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Rólunk',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [defineArrayMember({ type: 'pageHeroSection' })],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Rólunk' };
    },
  },
});
