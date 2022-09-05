import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
// import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	package: {
		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		files: (file) => !file.includes('_')
	},
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'script-src': ['self', 'unsafe-inline'],
				'object-src': ['none'],
				'base-uri': ['self']
			}
		}
	}
}

export default config
