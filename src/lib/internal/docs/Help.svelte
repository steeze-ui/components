<script>
	import { ExclamationCircle } from '@steeze-ui/heroicons'

	import { Icon } from '@steeze-ui/svelte-icon'

	export let text
</script>

<button>
	<Icon src={ExclamationCircle} size="16" color="var(--st-colors-gray5)" class="-mb-1 ml-1" />
</button>
