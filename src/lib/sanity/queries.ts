// GROQ queries for fetching Sanity page content.
import { sanityClient } from 'sanity:client';

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

export type HomePage = {
  sections: HeroSection[] | null;
};

const HOME_PAGE_QUERY = /* groq */ `
  *[_id == "homePage"][0]{
    sections[]{
      _key,
      _type,
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
