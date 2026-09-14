// Reusable page sections that can be added to any CMS-managed page.
import { defineArrayMember, defineType } from 'sanity';

export const sharedSectionsType = defineType({
  name: 'sharedSections',
  title: 'Oldal szekciók',
  type: 'array',
  of: [
    defineArrayMember({ type: 'testimonialSection' }),
    defineArrayMember({ type: 'ctaSection' }),
  ],
});
