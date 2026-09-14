/** Builds CDN URLs for hosted image assets. */

const ASSET_BASE_URL = "https://assets.biembeauty.hu";

export function asset(path: string): string {
	return `${ASSET_BASE_URL}/${path.replace(/^\/+/, "")}`;
}
