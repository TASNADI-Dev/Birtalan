// Renders Sanity Portable Text heading blocks with emphasis mark styling.
import type { PortableTextBlock } from './queries';

export function renderHeadingHtml(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks?.length) return '';

  return blocks
    .map((block) => {
      const content = block.children
        .map((child) => {
          const text = escapeHtml(child.text);
          return child.marks?.includes('emphasis')
            ? `<span class="text-mandalay-600">${text}</span>`
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
