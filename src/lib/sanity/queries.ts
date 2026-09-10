// GROQ queries for fetching Sanity page content.
import { sanityClient } from 'sanity:client';
import { asset } from '../assets';
import { defaultTemplatePages } from './defaultTemplatePages';

export type PortableTextSpan = {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style: string;
  children: PortableTextSpan[];
};

export type HeroSection = {
  _type: 'heroSection';
  _key: string;
  eyebrow: string[];
  heading: PortableTextBlock[];
  description: string;
  buttonLabel: string;
};

export type SplitSection = {
  _type: 'splitSection';
  _key: string;
  variant: 'image-text' | 'text-image';
  imageUrl?: string;
  fallbackImageUrl?: string;
  alt: string;
  heading: string;
  paragraph: string;
  buttonHref?: string;
  buttonLabel?: string;
};

export type PageSection = HeroSection | SplitSection;

export type HomePage = {
  sections: PageSection[] | null;
};

export type TemplatePageLink = {
  href: string;
  label: string;
};

export type TemplatePageHero = {
  heading: string;
  description: string;
  imageUrl?: string;
  fallbackImageUrl?: string;
  alt: string;
};

export type TemplatePage = {
  title: string;
  slug: string;
  hero: TemplatePageHero;
};

type FetchedTemplatePage = {
  title: string;
  slug: string;
  hero: {
    heading?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    alt?: string | null;
  } | null;
};

const DEFAULT_TEMPLATE_HERO_DESCRIPTION =
  'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...';

const DEFAULT_TEMPLATE_HERO_ALT = 'BI-EM Beauty szalon belső tere';

const HOME_PAGE_QUERY = /* groq */ `
  *[_id == "homePage"][0]{
    sections[]{
      _key,
      _type,
      _type == "heroSection" => {
        eyebrow,
        heading[]{
          _key,
          _type,
          style,
          children[]{
            _key,
            _type,
            text,
            marks
          }
        },
        description,
        buttonLabel
      },
      _type == "splitSection" => {
        variant,
        "imageUrl": image.asset->url,
        alt,
        heading,
        paragraph,
        "buttonHref": select(
          defined(buttonLink->slug.current) => "/" + buttonLink->slug.current,
          null
        )
      }
    }
  }
`;

export async function getHomePage(): Promise<HomePage | null> {
  try {
    return await sanityClient.fetch<HomePage | null>(HOME_PAGE_QUERY);
  } catch {
    return null;
  }
}

const TEMPLATE_PAGES_QUERY = /* groq */ `
  *[_type == "templatePage" && defined(slug.current)] | order(_createdAt asc) {
    "label": title,
    "href": "/" + slug.current
  }
`;

const TEMPLATE_PAGE_PATHS_QUERY = /* groq */ `
  *[_type == "templatePage" && defined(slug.current)] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    "hero": {
      "heading": hero.heading,
      "description": hero.description,
      "imageUrl": hero.image.asset->url,
      "alt": hero.image.alt
    }
  }
`;

function withHeroDefaults(page: FetchedTemplatePage): TemplatePage {
  return {
    title: page.title,
    slug: page.slug,
    hero: {
      heading: page.hero?.heading || page.title,
      description:
        page.hero?.description || DEFAULT_TEMPLATE_HERO_DESCRIPTION,
      imageUrl: page.hero?.imageUrl ?? undefined,
      fallbackImageUrl: asset('home/hero.webp'),
      alt: page.hero?.alt || DEFAULT_TEMPLATE_HERO_ALT,
    },
  };
}

function getDefaultTemplatePagePaths(): TemplatePage[] {
  return defaultTemplatePages.map((page) =>
    withHeroDefaults({
      title: page.label,
      slug: page.href.slice(1),
      hero: null,
    }),
  );
}

export async function getTemplatePages(): Promise<TemplatePageLink[]> {
  try {
    const pages =
      await sanityClient.fetch<TemplatePageLink[]>(TEMPLATE_PAGES_QUERY);
    return pages?.length ? pages : defaultTemplatePages;
  } catch {
    return defaultTemplatePages;
  }
}

export async function getTemplatePagePaths(): Promise<TemplatePage[]> {
  try {
    const pages =
      await sanityClient.fetch<FetchedTemplatePage[]>(TEMPLATE_PAGE_PATHS_QUERY);
    return pages?.length
      ? pages.map(withHeroDefaults)
      : getDefaultTemplatePagePaths();
  } catch {
    return getDefaultTemplatePagePaths();
  }
}
