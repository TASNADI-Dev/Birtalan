// Builds consistent document titles and meta description helpers for site pages.

import type { PortableTextBlock } from './sanity/queries';

export function siteTitle(pageName?: string): string {
	return pageName ? `${pageName} | BI-EM Beauty` : 'BI-EM Beauty';
}

export function portableTextToPlain(
	blocks?: PortableTextBlock[] | null,
): string {
	if (!blocks?.length) return '';

	return blocks
		.map((block) => block.children?.map((child) => child.text).join('') ?? '')
		.filter(Boolean)
		.join(' ')
		.trim();
}
