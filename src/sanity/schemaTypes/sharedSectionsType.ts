// Reusable page sections that can be added to any CMS-managed page.
import { defineArrayMember, defineType } from 'sanity';

export const sharedSectionsType = defineType({
  name: 'sharedSections',
  title: 'Page sections',
  type: 'array',
  of: [defineArrayMember({ type: 'testimonialSection' })],
});
