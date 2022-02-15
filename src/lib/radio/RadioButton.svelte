<script lang="ts">
	import { Label } from '$lib/core/parts'

	import { getId } from '$lib/core/stores/id'
	import { getContext } from 'svelte'

	export let label = null
	export let value = null
	export let group = null

	const name: string = getContext('ST_RADIO_NAME')

	const id = getId()
</script>

<div data-component="radio-button">
	<input part="indicator" bind:group type="radio" {id} {name} {value} />
	<slot name="label" {id} {label}>
		<Label for={id}>{label}</Label>
	</slot>
</div>

<style>
	[data-component] {
		display: flex;
		align-items: center;
		gap: var(--st-radio-button-gap, 0.5rem);

		--st-label-font-size: var(--st-radio-button-label-font-size, var(--st-font-size-base));
		--st-label-font-weight: var(--st-radio-button-label-font-weight, var(--st-font-weight-normal));
		--st-label-color: var(--st-radio-button-label-color, var(--st-body-text-color));

		--st-indicator-size: var(--st-radio-button-indicator-size, var(--st-box-size));
		--st-indicator-border-radius: var(
			--st-radio-button-indicator-border-radius,
			var(--st-border-radius-full)
		);
	}

	input[type='radio'] {
		/* Add if not using autoprefixer */
		-webkit-appearance: none;
		appearance: none;

		background-color: var(--st-radio-button-indicator-bg-color, var(--st-box-bg-color));
		border: 1px solid var(--st-radio-button-indicator-border-color, var(--st-box-border-color));

		/* Not removed via appearance */
		margin: 0;

		/* border: 1px solid var(--st-colors-gray5); */
		width: var(--st-indicator-size);
		height: var(--st-indicator-size);
		border-radius: var(--st-indicator-border-radius);

		display: grid;
		place-content: center;
	}

	input[type='radio']:not(:checked) {
		opacity: 0.5;
	}

	[data-component]:hover input[type='radio']:not(:checked) {
		opacity: 0.7;
	}

	input[type='radio']::before {
		content: '';
		width: calc(var(--st-indicator-size) * 0.35);
		height: calc(var(--st-indicator-size) * 0.35);
		border-radius: var(--st-indicator-border-radius);
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		box-shadow: inset 1em 1em
			var(
				--st-radio-button-indicator-inner-selected-bg-color,
				var(--st-box-inner-selected-bg-color)
			);
	}

	input[type='radio']:checked::before {
		transform: scale(1);
	}

	input[type='radio']:checked {
		transform: scale(1);
		background-color: var(
			--st-radio-button-indicator-selected-bg-color,
			var(--st-box-selected-bg-color)
		);
	}
</style>
