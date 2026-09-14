// Turns Sanity contact values into display items for the contact page and footer.
import type { ContactDetails } from './sanity/queries';

export type ContactChannel =
  | 'phone'
  | 'email'
  | 'tiktok'
  | 'instagram'
  | 'facebook';

export type ContactItem = {
  channel: ContactChannel;
  href?: string;
  label: string;
};

export type SocialChannel = 'tiktok' | 'instagram' | 'facebook';

export type SocialContactLink = {
  channel: SocialChannel;
  href: string;
  label: string;
};

const FACEBOOK_LABEL = 'BI-EM Beauty';

const CHANNELS: ContactChannel[] = [
  'phone',
  'email',
  'tiktok',
  'instagram',
  'facebook',
];

const SOCIAL_CHANNELS: SocialChannel[] = ['tiktok', 'instagram', 'facebook'];

export function getContactItems(
  contacts?: ContactDetails | null,
): ContactItem[] {
  if (!contacts) return [];

  return CHANNELS.flatMap((channel) => {
    const value = contacts[channel]?.trim();
    if (!value) return [];

    const item = toContactItem(channel, value);
    return item ? [item] : [];
  });
}

function toContactItem(
  channel: ContactChannel,
  value: string,
): ContactItem | null {
  if (channel === 'phone') {
    const href = value.toLowerCase().startsWith('tel:')
      ? value
      : `tel:${value.replace(/[^\d+]/g, '') || value}`;
    if (!isSafeHref(href)) return null;

    return {
      channel,
      href,
      label: stripScheme(value, 'tel:'),
    };
  }

  if (channel === 'email') {
    const href = value.toLowerCase().startsWith('mailto:')
      ? value
      : `mailto:${value}`;
    if (!isSafeHref(href)) return null;

    return {
      channel,
      href,
      label: stripScheme(value, 'mailto:'),
    };
  }

  const href = toSocialHref(channel, value);
  if (!href) return null;

  return {
    channel,
    href,
    label: socialLabel(channel, value),
  };
}

export function getSocialContactLinks(
  contacts?: ContactDetails | null,
): SocialContactLink[] {
  if (!contacts) return [];

  return SOCIAL_CHANNELS.flatMap((channel) => {
    const value = contacts[channel]?.trim();
    if (!value) return [];

    const href = toSocialHref(channel, value);
    if (!href) return [];

    return [
      {
        channel,
        href,
        label: socialLabel(channel, value),
      },
    ];
  });
}

function toSocialHref(channel: SocialChannel, value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return isSafeExternalHref(trimmed) ? trimmed : null;
  }

  const handle = trimmed.replace(/^@/, '');
  if (!handle) return null;

  const href =
    channel === 'tiktok'
      ? `https://www.tiktok.com/@${handle}`
      : channel === 'facebook'
        ? `https://www.facebook.com/${handle}`
        : `https://www.instagram.com/${handle}/`;

  return isSafeExternalHref(href) ? href : null;
}

function socialLabel(channel: SocialChannel, value: string): string {
  if (channel === 'facebook') return FACEBOOK_LABEL;

  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const path = new URL(trimmed).pathname.replace(/^\/+|\/+$/g, '');
      const handle = path.replace(/^@/, '');
      return handle ? `@${handle}` : trimmed;
    } catch {
      return trimmed;
    }
  }

  return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
}

function stripScheme(value: string, scheme: string): string {
  return value.toLowerCase().startsWith(scheme)
    ? value.slice(scheme.length)
    : value;
}

function isSafeHref(href: string): boolean {
  const value = href.trim();
  return value.startsWith('mailto:') || value.startsWith('tel:');
}

function isSafeExternalHref(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
