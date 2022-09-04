<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from '../_data/theme'
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container">
		<ThemeToggle />
	</div>
</Component>
