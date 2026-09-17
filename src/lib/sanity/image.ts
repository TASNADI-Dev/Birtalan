// Builds optimized Sanity CDN image URLs, applying Studio crop/hotspot metadata.
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { sanityClient } from 'sanity:client';

const builder = createImageUrlBuilder(sanityClient);

export type { SanityImageSource };

export type SanityImage = {
  asset?: {
    _id?: string;
    url?: string;
  } | null;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  } | null;
};

export function buildImageUrl(
  source: SanityImageSource,
  {
    width,
    height,
  }: {
    width: number;
    height?: number;
  },
): string {
  let image = builder.image(source).width(width).auto('format');

  if (height != null) {
    image = image.height(height).fit('crop');
  } else {
    image = image.fit('max');
  }

  return image.url();
}
