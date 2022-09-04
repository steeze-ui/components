import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
	plugins: [sveltekit(), WindiCSS({ config: 'windi.config.js' })]
	// extensions: ['.jsx', '.svelte'],
	// test: {
	// 	globals: true,
	// 	environment: 'jsdom'
	// }
	// resolve: {
	// 	alias: {
	// 		$lib: path.resolve('./src/lib'),
	// 		$app: path.resolve('./.svelte-kit/runtime/app')
	// 	}
	// }
})
