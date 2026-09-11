// Sanity Studio desk structure: page singletons and template pages.
import { EnvelopeIcon } from '@sanity/icons/Envelope';
import { HomeIcon } from '@sanity/icons/Home';
import { ImagesIcon } from '@sanity/icons/Images';
import { UsersIcon } from '@sanity/icons/Users';
import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = [
  'homePage',
  'aboutPage',
  'galleryPage',
  'contactPage',
] as const;
const STRUCTURED_TYPES = [
  'homePage',
  'aboutPage',
  'galleryPage',
  'contactPage',
  'templatePage',
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Főoldal')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Főoldal'),
        ),
      S.listItem()
        .title('Rólunk')
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('Rólunk'),
        ),
      S.listItem()
        .id('galleryPage')
        .title('Galéria')
        .icon(ImagesIcon)
        .schemaType('galleryPage')
        .child(
          S.document()
            .schemaType('galleryPage')
            .documentId('galleryPage')
            .title('Galéria'),
        ),
      S.listItem()
        .title('Kapcsolat')
        .icon(EnvelopeIcon)
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Kapcsolat'),
        ),
      S.divider(),
      S.documentTypeListItem('templatePage').title('Sablon oldalak'),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(
            listItem.getId() as (typeof SINGLETONS)[number],
          ) &&
          !STRUCTURED_TYPES.includes(
            listItem.getId() as (typeof STRUCTURED_TYPES)[number],
          ),
      ),
    ]);
