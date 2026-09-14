// Singleton home page document with draggable sections.
import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Főoldal',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      hidden: true,
      initialValue: 'Főoldal',
    }),
    defineField({
      name: 'sections',
      title: 'Szekciók',
      type: 'pageBuilder',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Főoldal' };
    },
  },
});
