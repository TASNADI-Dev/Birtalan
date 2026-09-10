// Sanity Studio desk structure: Főoldal singleton and template pages.
import { HomeIcon } from '@sanity/icons/Home';
import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = ['homePage'] as const;
const STRUCTURED_TYPES = ['homePage', 'templatePage'] as const;

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
