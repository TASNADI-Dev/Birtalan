// Renders Sanity Portable Text blocks to HTML for intro and body copy.
import type { PortableTextBlock, PortableTextMarkDef } from './queries';

export function renderPortableTextHtml(
  blocks: PortableTextBlock[] | undefined,
): string {
  if (!blocks?.length) return '';

  const html: string[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];
    if (block._type !== 'block') {
      index += 1;
      continue;
    }

    if (block.listItem) {
      const listType = block.listItem;
      const items: PortableTextBlock[] = [];

      while (index < blocks.length && blocks[index].listItem === listType) {
        items.push(blocks[index]);
        index += 1;
      }

      const tag = listType === 'number' ? 'ol' : 'ul';
      html.push(
        `<${tag}>${items
          .map((item) => `<li>${renderChildren(item)}</li>`)
          .join('')}</${tag}>`,
      );
      continue;
    }

    html.push(`<p>${renderChildren(block)}</p>`);
    index += 1;
  }

  return html.join('');
}

function renderChildren(block: PortableTextBlock): string {
  const markDefs = block.markDefs ?? [];

  return block.children
    .map((child) => {
      let content = escapeHtml(child.text);
      const marks = [...(child.marks ?? [])].reverse();

      for (const mark of marks) {
        if (mark === 'strong') {
          content = `<strong>${content}</strong>`;
          continue;
        }

        if (mark === 'em') {
          content = `<em>${content}</em>`;
          continue;
        }

        const def = markDefs.find((markDef) => markDef._key === mark);
        if (def?._type === 'link' && isSafeHref(def.href)) {
          content = `<a href="${escapeHtml(def.href)}">${content}</a>`;
        }
      }

      return content;
    })
    .join('');
}

function isSafeHref(href: PortableTextMarkDef['href']): href is string {
  if (!href) return false;

  const value = href.trim();
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  if (value.startsWith('mailto:') || value.startsWith('tel:')) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
