import { readFileSync, writeFileSync } from 'fs';
import { basename, extname, join } from 'path';
import shell from 'shelljs';
import { fetch } from 'undici';
import type { Plugin } from 'vite';

export interface ExtractFontsOptions
{
	/**
	 * The directory in which fonts are cached.  
	 * Should be relative to project root.
	 */
	cacheDir: string;

	/** The Vite command. */
	command: 'build' | 'serve';
}

export function extractFonts(options: ExtractFontsOptions): Plugin
{
	const { cacheDir, command } = options;
	let fonts = new Set<string>();

	return {
		name: 'fonts-extractor',
		async transform(code, id)
		{
			if (extname(id) != '.css')
				return;

			if (shell.test('-d', cacheDir) == false)
				shell.mkdir(cacheDir);

			const search = /url\("(https?:\/\/[^")]*\.woff2?)"\)/g;
			for (const [match, url] of code.matchAll(search))
			{
				const name = basename(url);
				const cachePath = join(cacheDir, name);
				if (shell.test('-e', cachePath) == false)
				{
					console.log(`Caching Font: ${url}`);
					const buffer = await fetch(url).then(r => r.arrayBuffer());
					writeFileSync(cachePath, Buffer.from(buffer), { flag: 'wx' });
				}

				fonts.add(cachePath);
			}

			const replacedSource = code.replaceAll(search, (match, url) =>
			{
				const name = basename(url);

				return command == 'serve' ?
					`url(/${cacheDir}/${name})` :
					`url(./${name})`;
			});

			return replacedSource;
		},
		async generateBundle()
		{
			for (const font of fonts)
			{
				const name = basename(font);
				const data = readFileSync(font);
				this.emitFile({
					type: 'asset',
					fileName: `assets/${name}`,
					source: data,
				});
			}
		},
	}
}