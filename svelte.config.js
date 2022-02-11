import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-auto'
// import adapter from '@sveltejs/adapter-vercel'
// import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import WindiCSS from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		prerender: {
			entries: ['*']
		},
		csp: {
			mode: 'auto',
			directives: {
				'script-src': ['self', 'unsafe-inline'],
				'object-src': ['none'],
				'base-uri': ['self']
			}
		},
		vite: {
			plugins: [WindiCSS({ config: 'windi.config.js' })]
		},
		package: {
			files: (file) => !file.includes('_')
			// exports: (file) => {
			// 	return (file === 'index.ts') | (file === 'base.css')
			// }
		}
	}
}

export default config
