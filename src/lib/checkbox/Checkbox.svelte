<script lang="ts">
	import { Label } from '$lib/core/parts'
	import { getId } from '$lib/core/stores/id'
	import { getContext } from 'svelte'
	import { writable, Writable } from 'svelte/store'

	export let label: string = null
	export let value: string = null
	export let name: string = getContext('ST_CHECKBOX_NAME')
	export let group: string[] = null

	const id = getId()

	const valueStore: Writable<string[]> = group ? writable(group) : getContext('ST_CHECKBOX_VALUE')

	$: {
		group = $valueStore
	}

	function onChange({ target }) {
		const { value, checked } = target
		if (checked) {
			$valueStore = [...$valueStore, value]
		} else {
			$valueStore = $valueStore.filter((item) => item !== value)
		}
		// if (valueStore) {
		// 	valueStore.set(group)
		// }
	}
</script>

<div data-component="checkbox">
	<input
		part="indicator"
		type="checkbox"
		checked={$valueStore.includes(value)}
		on:change={onChange}
		{id}
		{name}
		{value}
	/>
	<slot name="label" {id} {label}>
		<Label for={id}>{label}</Label>
	</slot>
</div>

<style>
	[data-component] {
		display: flex;
		align-items: center;
		gap: var(--st-checkbox-gap, 0.5rem);

		--st-label-font-size: var(--st-checkbox-label-font-size, var(--st-font-size-base));
		--st-label-font-weight: var(--st-checkbox-label-font-weight, var(--st-font-weight-normal));
		--st-label-color: var(--st-checkbox-label-color, var(--st-body-text-color));

		--st-indicator-size: var(--st-checkbox-indicator-size, var(--st-box-size));
		--st-indicator-border-radius: var(
			--st-checkbox-indicator-border-radius,
			var(--st-border-radius)
		);
	}

	[part='indicator'] {
		appearance: none;
		background-color: var(--st-checkbox-bg-color, var(--st-box-bg-color));
		margin: 0;
		font: inherit;
		width: var(--st-indicator-size);
		height: var(--st-indicator-size);
		border: 1px solid var(--st-checkbox-border-color, var(--st-box-border-color));
		border-radius: var(--st-indicator-border-radius);
		transform: translateY(-0.075em);

		display: grid;
		place-content: center;
	}
	[part='indicator']:checked {
		background-color: var(--st-box-selected-bg-color);
	}

	[part='indicator']::before {
		content: '';
		width: calc(var(--st-indicator-size) * 0.5);
		height: calc(var(--st-indicator-size) * 0.5);
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		box-shadow: inset 1em 1em var(--st-box-inner-selected-bg-color);

		transform-origin: bottom left;
		clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
	}

	[part='indicator']:checked::before {
		transform: scale(1);
	}
</style>
