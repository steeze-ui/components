<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from '../_data/text-field'

	import TextField from '$lib/fields/TextField.svelte'
	import { Heart } from '@steeze-ui/heroicons'
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'

	let value = ''
	$: theme = value.length > 0 ? 'solid' : 'default'
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container">
		<TextField
			placeholder="e.g Tre Flip"
			clearable
			width="14rem"
			label="Favorite Fliptrick"
			bind:value
			helper="A Fliptrick rotates the board around its own axis"
		>
			<Icon
				{theme}
				slot="prefix"
				src={Heart}
				size="16px"
				style="margin-right:0.25rem; color: var(--st-secondary-text-color)"
			/>
		</TextField>
	</div>
</Component>
