<script context="module">
	const types = {
		1: 'Form Input',
		2: 'Visualization & Interaction',
		3: 'Layout'
	}
</script>

<script lang="ts">
	export let title
	export let description
	export let type: number
</script>

<div part="docs-title" style="display:flex; flex-direction:column; gap:0.25rem; margin-bottom:2rem">
	<div class="flex items-center gap-4">
		<h1>{title}</h1>
		<div class="flex items-center gap-4">
			<p data-type={type}>{types[type]}</p>
		</div>
	</div>
	<h3>{description}</h3>
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

	:global(.st-theme-light [part='docs-title']) {
		--st-colors-primary-o: var(--st-colors-primary1);
		--st-colors-primary-i: var(--st-colors-primary5);

		--st-colors-yellow-o: hsla(55, 97%, 88%, 0.66);
		--st-colors-yellow-i: hsla(35, 92%, 33%, 0.94);

		--st-colors-pink-o: hsl(290, 60%, 52%);
		--st-colors-pink-i: hsl(290, 40%, 16%);
	}

	h1,
	h3,
	p {
		margin: 0 !important;
	}

	p {
		width: auto;
		padding: 0 0.5rem;
		border-radius: var(--st-border-radius);
		font-size: var(--st-font-size-sm);
		font-weight: var(--st-font-weight-medium);
		background-color: var(--st-colors-primary9);
		color: var(--st-colors-primary5);
	}

	p[data-type='1'] {
		background-color: var(--st-colors-primary-o);
		color: var(--st-colors-primary-i);
	}

	p[data-type='2'] {
		background-color: var(--st-colors-yellow-o);
		color: var(--st-colors-yellow-i);
	}
	p[data-type='3'] {
		background-color: var(--st-colors-pink-o);
		color: var(--st-colors-pink-i);
	}
</style>
