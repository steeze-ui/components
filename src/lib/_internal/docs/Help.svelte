<script lang="ts">
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import { ExclamationCircle } from '@steeze-ui/heroicons'

	import { Icon } from '@steeze-ui/svelte-icon'

	export let text: string = ''
	let focused = false
</script>

<Tooltip class="inline-flex" position={'right'} maxWidth="12rem" bind:manualOpened={focused}>
	<button
		slot="trigger"
		aria-label="Info Tooltip"
		on:focus={() => (focused = true)}
		on:blur={() => (focused = false)}
	>
		<Icon src={ExclamationCircle} size="16" color="var(--st-colors-gray5)" />
	</button>

	<span slot="content">{text}</span>
</Tooltip>
