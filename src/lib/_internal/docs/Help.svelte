<script>
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import { ExclamationCircle } from '@steeze-ui/heroicons'

	import { Icon } from '@steeze-ui/svelte-icon'

	export let text
</script>

<Tooltip class="inline-block" position={'right'} maxWidth="12rem">
	<button slot="trigger" aria-label="Info Tooltip">
		<Icon src={ExclamationCircle} size="16" color="var(--st-colors-gray5)" class="-mb-1 ml-1" />
	</button>

	<span slot="content">{text}</span>
</Tooltip>
