<script lang="ts">
	import PrismJS from 'prismjs'
	import '$lib/_internal/utils/prism'
	import { Clipboard } from '@steeze-ui/heroicons'
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'

	export function getHighlighted(source: string) {
		return PrismJS.highlight(source, PrismJS.languages.svelte, 'svelte')
	}

	export let content: string
</script>

<div part="code">
	<button
		part="copy"
		aria-label="copy code to clipboard"
		on:click={() => {
			navigator.clipboard.writeText(content)
		}}
	>
		<Icon src={Clipboard} size="22" />
	</button>
	{@html `<pre class="language-svelte" tabindex="-1"><code>${getHighlighted(content)}</code></pre>`}
</div>

<style>
	[part='code'] {
		position: relative;
	}
	[part='code']:hover [part='copy'] {
		display: block;
	}

	[part='copy'] {
		position: absolute;
		display: none;
		right: 1rem;
		top: 1rem;
		color: var(--st-colors-gray7);
	}
	[part='copy']:hover {
		color: var(--st-colors-gray4);
	}
	[part='copy']:active {
		transform: scale(0.95);
	}
</style>
