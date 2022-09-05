<script context="module">
	const keys = Object.keys(menu.flat())
</script>

<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@steeze-ui/heroicons'

	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'
	import { menu } from '../stores/menu'

	export let current: string

	const currentIndex = keys.findIndex((e) => e === current)

	const nextKey = keys?.[currentIndex + 1]
	const nextValue = (menu.flat() as any)[nextKey]

	const prevKey = keys?.[currentIndex - 1]
	const prevValue = (menu.flat() as any)[prevKey]
</script>

<div part="wrapper">
	<div part="navigation">
		{#if prevKey}
			<a href={prevValue}><Icon src={ArrowLeft} size="16px" /> {prevKey}</a>
		{:else}
			<div />
		{/if}
		{#if nextKey}
			<a href={nextValue}>{nextKey} <Icon src={ArrowRight} size="16px" /></a>
		{:else}
			<div />
		{/if}
	</div>
	<div part="info">
		<!-- <div part="seperator" /> -->

		<div>
			<span part="license" class="text-sm sm:text-base">MIT Licensed</span>
		</div>
	</div>
</div>

<style>
	[part='wrapper'] {
		padding-top: 4rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}
	[part='navigation'] {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	a {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	[part='info'] {
		display: flex;
		/* flex-direction: column; */
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}

	/* [part='seperator'] {
		display: block;
		height: 20px;
		width: 1px;
	} */
	:global(.light [part='seperator']) {
		background-color: var(--st-colors-gray3);
	}
	:global(.dark [part='seperator']) {
		background-color: var(--st-colors-gray9);
	}

	:global(.dark [part='vercel-logo']) {
		color: var(--st-colors-gray7);
	}
	:global(.light [part='vercel-logo']) {
		color: var(--st-colors-gray5);
	}

	:global(.dark .prose [part='vercel-logo'] a) {
		color: white;
	}
	:global(.light .prose [part='vercel-logo'] a) {
		color: black;
	}

	:global(.dark span[part='license']) {
		color: var(--st-colors-gray7);
	}
	:global(.light span[part='license']) {
		color: var(--st-colors-gray5);
	}
</style>
