<script lang="ts">
	import { Button } from '$lib'
	import Logo from '$lib/_internal/header/Logo.svelte'
</script>

<svelte:head>
	<title>Home — Steeze UI</title>
</svelte:head>

<div class="flex flex-grow w-full h-full items-center justify-center">
	<div class="max-w-md w-full flex-col items-center justify-center">
		<div class="flex justify-center w-full p-6">
			<Logo theme="large" size="100px" />
		</div>
		<div class="flex flex-col items-center gap-4">
			<h1 class="text-6xl  font-bold">Steeze UI</h1>
			<h2 class="text-xl text-gray-400 font-semibold">
				Effortless Svelte Components built for SvelteKit
			</h2>
			<ul class="flex gap-3">
				<li>Accessible</li>
				<span> • </span>
				<li>Prestyled</li>
				<span> • </span>
				<li>Customizable</li>
			</ul>
		</div>
		<div part="buttons" class="flex gap-4 justify-center p-6">
			<a href="/docs/overview/introduction">
				<Button
					aria-label="link to introduction"
					theme="secondary"
					--st-button-bg-color="transparent">Learn More</Button
				>
			</a>
			<a href="/docs/overview/getting-started">
				<Button aria-label="link to getting started guide" theme="primary">Get Started</Button>
			</a>
		</div>
	</div>
</div>

<style>
	:global(html, body, #svelte) {
		height: calc(100% - 64px);
	}

	h1 {
		color: var(--st-body-text-color);
	}

	h2 {
		color: var(--st-secondary-text-color);
	}

	li,
	span {
		color: var(--st-placeholder-text-color);
		font-weight: var(--st-font-weight-medium);
	}

	[part='buttons'] {
		--st-button-font-weight: var(--st-font-weight-semibold);
		--st-button-font-size: var(--st-font-size-xl);
		--st-button-padding: 0 1.25rem;
		--st-button-height: 55px;
		--st-button-border-radius: var(--st-border-radius-lg);
	}
</style>
