import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
	darkMode: 'class', // or 'media'
	preflight: 'true',

	plugins: [typography()],
	theme: {
		extend: {
			colors: {
				primary: colors.indigo
			},
			typography: {
				DEFAULT: {
					css: {
						color: colors.light[700]
					}
				}
			}
		}
	}
})
