// Builds public URLs for template pages under /szolgaltatasok/.
export const TEMPLATE_PAGE_FOLDER = 'szolgaltatasok';

export function templatePageSlug(value: string | null | undefined): string {
  if (!value) return '';

  return value
    .trim()
    .replace(/^\/+/, '')
    .replace(new RegExp(`^${TEMPLATE_PAGE_FOLDER}/`, 'i'), '')
    .replace(/\/+$/, '');
}

export function templatePageHref(value: string | null | undefined): string {
  const slug = templatePageSlug(value);
  return slug ? `/${TEMPLATE_PAGE_FOLDER}/${slug}` : '';
}

export function slugifyTemplatePage(input: string): string {
  return templatePageSlug(input)
    .replace(/[áÁ]/g, 'a')
    .replace(/[éÉ]/g, 'e')
    .replace(/[íÍ]/g, 'i')
    .replace(/[óöőÓÖŐ]/g, 'o')
    .replace(/[úüűÚÜŰ]/g, 'u')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}
