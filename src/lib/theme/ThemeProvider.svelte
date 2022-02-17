<script lang="ts">
	import { browser } from '$app/env'
	import { Theme } from '$lib/core/stores/theme'

	export let fromSystem = false

	if (fromSystem) {
		Theme.fromSystem()
	}

	$: {
		if (browser) {
			if ($Theme.isDark) {
				document.documentElement.className = 'dark'
			} else {
				document.documentElement.className = 'light'
			}
		}
	}
</script>
