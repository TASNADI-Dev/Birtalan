// Builds optimized Sanity CDN image URLs from asset URLs returned by GROQ.
export function buildImageUrl(
  assetUrl: string,
  { width, height }: { width: number; height: number },
): string {
  const url = new URL(assetUrl);
  url.searchParams.set('w', String(width));
  url.searchParams.set('h', String(height));
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('auto', 'format');
  return url.toString();
}
