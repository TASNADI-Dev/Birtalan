// Page section that references a shared testimonials document.
import { defineField, defineType } from 'sanity';
import { CommentIcon } from '@sanity/icons/Comment';

export const testimonialSectionBlockType = defineType({
  name: 'testimonialSection',
  title: 'Testimonials',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'testimonialSet',
      title: 'Testimonials',
      description:
        'Choose the shared testimonials document. Updating that document updates every page that uses it.',
      type: 'reference',
      to: [{ type: 'testimonials' }],
      initialValue: {
        _type: 'reference',
        _ref: 'testimonials',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Rólunk mondták',
        subtitle: 'Shared testimonials',
      };
    },
  },
});
