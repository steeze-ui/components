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

<div style="display:flex; flex-direction:column; gap:0.25rem; margin-bottom:2rem">
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
		--st-colors-yellow5: hsla(60, 60%, 52%, 0.632);
		--st-colors-yellow9: hsla(60, 41%, 16%, 0.42);

		--st-colors-pink5: hsl(290, 60%, 52%);
		--st-colors-pink9: hsl(290, 40%, 16%);
	}

	h1,
	h3,
	p {
		margin: 0;
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
		background-color: var(--st-colors-primary9);
		color: var(--st-colors-primary4);
	}

	p[data-type='2'] {
		background-color: var(--st-colors-yellow9);
		color: var(--st-colors-yellow5);
	}
	p[data-type='3'] {
		background-color: var(--st-colors-pink9);
		color: var(--st-colors-pink5);
	}
</style>
