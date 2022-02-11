<script lang="ts">
	import { highlight, languages } from 'prismjs'
	import 'prism-svelte'
	import { ClipboardCopy } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	export function getHighlighted(source: string) {
		return highlight(source, languages.svelte, 'svelte')
	}

	export let content
</script>

<div part="code">
	<button
		part="copy"
		aria-label="copy code to clipboard"
		on:click={() => {
			navigator.clipboard.writeText(content)
		}}
	>
		<Icon src={ClipboardCopy} size="22" />
	</button>
	{@html `<pre class="language-svelte"><code>${getHighlighted(content)}</code></pre>`}
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
