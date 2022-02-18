<script lang="ts">
	import '$lib/base.css'
	import '$lib/normalize.css'
	import ThemeProvider from '$lib/theme/ThemeProvider.svelte'
	import Header from '$lib/_internal/header/Header.svelte'
	import 'virtual:windi.css'
	import './../markdown.css'
</script>

<ThemeProvider fromSystem />
<Header />

<slot />
