import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	extensions: ['.jsx', '.svelte'],
	test: {
		globals: true,
		environment: 'jsdom'
	},
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	}
})
