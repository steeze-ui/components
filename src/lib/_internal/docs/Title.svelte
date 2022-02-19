<script context="module">
	const types = {
		1: 'Form Input',
		2: 'Visualization & Interaction',
		3: 'Layout'
	}
</script>

<script lang="ts">
	export let title: string
	export let description: string
	export let type: number
</script>

<svelte:head>
	<title>{title} — Steeze UI</title>
</svelte:head>

<div
	id="title"
	part="docs-title"
	style="display:flex; flex-direction:column; gap:0.25rem; margin-bottom:2rem"
>
	<div class="flex items-center gap-4">
		<h1>{title}</h1>
		<div class="flex items-center gap-4">
			<span data-type={type} class="text-xs sm:text-sm">{types[type]}</span>
		</div>
	</div>
	<p>{description}</p>
</div>

<style>
	:root {
		--st-colors-primary-o: var(--st-colors-primary9);
		--st-colors-primary-i: var(--st-colors-primary4);

		--st-colors-yellow-o: hsla(60, 41%, 16%, 0.42);
		--st-colors-yellow-i: hsla(60, 60%, 52%, 0.632);

		--st-colors-pink-o: hsl(290, 40%, 16%);
		--st-colors-pink-i: hsl(290, 60%, 52%);
	}

	:global(.light [part='docs-title']) {
		--st-colors-primary-o: var(--st-colors-primary1);
		--st-colors-primary-i: var(--st-colors-primary5);

		--st-colors-yellow-o: hsla(55, 97%, 88%, 0.66);
		--st-colors-yellow-i: hsla(35, 92%, 33%, 0.94);

		--st-colors-pink-o: hsla(290, 97%, 88%, 0.66);
		--st-colors-pink-i: hsla(290, 92%, 33%, 0.94);
	}

	h1,
	p,
	span {
		margin: 0 !important;
	}

	span {
		width: auto;
		padding: 0 0.5rem;
		border-radius: var(--st-border-radius);
		font-size: var(--st-font-size-sm);
		font-weight: var(--st-font-weight-medium);
		background-color: var(--st-colors-primary9);
		color: var(--st-colors-primary5);
	}

	span[data-type='1'] {
		background-color: var(--st-colors-primary-o);
		color: var(--st-colors-primary-i);
	}

	span[data-type='2'] {
		background-color: var(--st-colors-yellow-o);
		color: var(--st-colors-yellow-i);
	}
	span[data-type='3'] {
		background-color: var(--st-colors-pink-o);
		color: var(--st-colors-pink-i);
	}

	p {
		color: var(--st-colors-gray5) !important;
		font-weight: 500;
		font-size: var(--st-font-size-xl);
	}
</style>
