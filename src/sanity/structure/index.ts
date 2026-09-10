// Sanity Studio desk structure: Pages column with Home Page singleton first.
import { HomeIcon } from '@sanity/icons/Home';
import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = ['page'] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('page')
                    .documentId('homePage')
                    .title('Home Page'),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(listItem.getId() as (typeof SINGLETONS)[number]),
      ),
    ]);
