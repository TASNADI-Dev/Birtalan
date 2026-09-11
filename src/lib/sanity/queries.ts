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

export type PortableTextMarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

export type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
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
  alt?: string;
  heading: string;
  paragraph: string;
  buttonHref?: string;
  buttonLabel?: string;
};

export type GalleryImage = {
  imageUrl?: string;
  fallbackImageUrl?: string;
  alt?: string;
};

export type GallerySection = {
  _type: 'gallerySection';
  _key: string;
  heading: string;
  images: GalleryImage[];
};

export type PageHeroSection = {
  _type: 'pageHeroSection';
  _key: string;
  heading: string;
  description: string;
  imageUrl?: string;
  fallbackImageUrl?: string;
  alt?: string;
};

export type PageSection =
  | HeroSection
  | SplitSection
  | GallerySection
  | PageHeroSection;

export type HomePage = {
  sections: PageSection[] | null;
};

export type AboutPage = {
  sections: PageSection[] | null;
};

export type ContactDetails = {
  phone?: string | null;
  email?: string | null;
  tiktok?: string | null;
  instagram?: string | null;
};

export type ContactPage = {
  intro: PortableTextBlock[] | null;
  contacts: ContactDetails | null;
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
  alt?: string;
};

export type PriceListRow = {
  category?: string;
  service: string;
  price: string;
  description?: string;
};

export type PriceListInfoSection = {
  heading: string;
  intro?: string;
  bullets?: string[];
  notes?: string[];
};

export type PriceList = {
  rows: PriceListRow[];
  infoSections?: PriceListInfoSection[];
  footnote?: string;
};

export type TemplatePage = {
  title: string;
  slug: string;
  hero: TemplatePageHero;
  priceList?: PriceList | null;
};

export type GalleryPageTab = {
  title: string;
  slug: string;
  images: GalleryImage[];
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
  priceList?: {
    rows?: PriceListRow[] | null;
    infoSections?: PriceListInfoSection[] | null;
    footnote?: string | null;
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
      },
      _type == "gallerySection" => {
        heading,
        "images": images[]{
          "imageUrl": image.asset->url,
          alt
        }
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

const ABOUT_PAGE_QUERY = /* groq */ `
  *[_id == "aboutPage"][0]{
    sections[]{
      _key,
      _type,
      _type == "pageHeroSection" => {
        heading,
        description,
        "imageUrl": image.asset->url,
        "alt": image.alt
      }
    }
  }
`;

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    return await sanityClient.fetch<AboutPage | null>(ABOUT_PAGE_QUERY);
  } catch {
    return null;
  }
}

const CONTACT_PAGE_QUERY = /* groq */ `
  *[_id == "contactPage"][0]{
    intro[]{
      _key,
      _type,
      style,
      listItem,
      level,
      markDefs[]{
        _key,
        _type,
        href
      },
      children[]{
        _key,
        _type,
        text,
        marks
      }
    },
    contacts {
      phone,
      email,
      tiktok,
      instagram
    }
  }
`;

export async function getContactPage(): Promise<ContactPage | null> {
  try {
    return await sanityClient.fetch<ContactPage | null>(CONTACT_PAGE_QUERY);
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
    },
    priceList {
      rows[] {
        category,
        service,
        price,
        description
      },
      infoSections[] {
        heading,
        intro,
        bullets,
        notes
      },
      footnote
    }
  }
`;

function withHeroDefaults(page: FetchedTemplatePage): TemplatePage {
  const rows = page.priceList?.rows?.filter(
    (row): row is PriceListRow =>
      Boolean(row?.service?.trim()) && Boolean(row?.price?.trim()),
  );

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
    priceList:
      rows?.length ||
      page.priceList?.infoSections?.length ||
      page.priceList?.footnote
        ? {
            rows: rows ?? [],
            infoSections: page.priceList?.infoSections ?? undefined,
            footnote: page.priceList?.footnote ?? undefined,
          }
        : null,
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

const GALLERY_PAGE_TABS_QUERY = /* groq */ `
  *[_type == "templatePage" && defined(slug.current)] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    "images": galleryImages[]{
      _key,
      "imageUrl": image.asset->url,
      "alt": image.alt
    }
  }
`;

function getDefaultGalleryPageTabs(): GalleryPageTab[] {
  return defaultTemplatePages.map((page) => ({
    title: page.label,
    slug: page.href.slice(1),
    images: [],
  }));
}

export async function getGalleryPageTabs(): Promise<GalleryPageTab[]> {
  try {
    const tabs =
      await sanityClient.fetch<GalleryPageTab[]>(GALLERY_PAGE_TABS_QUERY);
    return tabs?.length ? tabs : getDefaultGalleryPageTabs();
  } catch {
    return getDefaultGalleryPageTabs();
  }
}
