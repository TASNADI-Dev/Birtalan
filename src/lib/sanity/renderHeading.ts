// Renders Sanity Portable Text heading blocks with emphasis mark styling.
import type { PortableTextBlock } from './queries';

export function renderHeadingHtml(
  blocks: PortableTextBlock[] | undefined,
  emphasisClass = 'text-mandalay-600',
): string {
  if (!blocks?.length) return '';

  return blocks
    .map((block) => {
      const content = block.children
        .map((child) => {
          const text = escapeHtml(child.text);
          return child.marks?.includes('emphasis')
            ? `<span class="${emphasisClass}">${text}</span>`
            : text;
        })
        .join('');

      return content;
    })
    .join('');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
