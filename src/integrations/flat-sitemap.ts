// Collapses @astrojs/sitemap's index + chunk files into a single /sitemap.xml.

import { readdir, rename, unlink } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

export function flatSitemap(): AstroIntegration {
	return {
		name: "flat-sitemap",
		hooks: {
			"astro:build:done": async ({ dir, logger }) => {
				const outDir = fileURLToPath(dir);
				const files = await readdir(outDir);
				const chunks = files
					.filter((name) => /^sitemap-\d+\.xml$/.test(name))
					.sort();
				const indexFile = files.find((name) => name === "sitemap-index.xml");

				if (chunks.length === 0) {
					logger.warn("No sitemap chunk files found to flatten.");
					return;
				}

				await rename(join(outDir, chunks[0]), join(outDir, "sitemap.xml"));

				await Promise.all([
					...chunks.slice(1).map((name) => unlink(join(outDir, name))),
					indexFile ? unlink(join(outDir, indexFile)) : Promise.resolve(),
				]);

				logger.info("`sitemap.xml` created (flat, no index nesting).");
			},
		},
	};
}
