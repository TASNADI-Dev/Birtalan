/** Builds CDN URLs for hosted image assets. */

const ASSET_BASE_URL = "https://pub-91ada33d739146bdafc3a2ad87c11ea2.r2.dev";

export function asset(path: string): string {
	return `${ASSET_BASE_URL}/${path.replace(/^\/+/, "")}`;
}
