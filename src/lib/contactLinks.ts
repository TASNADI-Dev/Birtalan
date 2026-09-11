// Turns Sanity contact values into display items for the contact page.
import type { ContactDetails } from './sanity/queries';

export type ContactChannel = 'phone' | 'email' | 'tiktok' | 'instagram';

export type ContactItem = {
  channel: ContactChannel;
  href?: string;
  label: string;
};

export type SocialContactLink = {
  channel: 'tiktok' | 'instagram';
  href: string;
  label: string;
};

const CHANNELS: ContactChannel[] = ['phone', 'email', 'tiktok', 'instagram'];

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

  return {
    channel,
    label: value,
  };
}

export function getSocialContactLinks(
  contacts?: ContactDetails | null,
): SocialContactLink[] {
  if (!contacts) return [];

  return (['tiktok', 'instagram'] as const).flatMap((channel) => {
    const value = contacts[channel]?.trim();
    if (!value) return [];

    const href = toSocialHref(channel, value);
    if (!href) return [];

    return [{ channel, href, label: value }];
  });
}

function toSocialHref(
  channel: 'tiktok' | 'instagram',
  value: string,
): string | null {
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
      : `https://www.instagram.com/${handle}/`;

  return isSafeExternalHref(href) ? href : null;
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
