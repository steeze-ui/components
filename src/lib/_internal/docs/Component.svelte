<script context="module" lang="ts">
</script>

<script lang="ts">
	import type { ComponentData, ComponentExample } from '../types/docs'
	import Code from './Code.svelte'
	import Demo from './Demo.svelte'
	import Feats from './Features.svelte'
	import Footer from './Footer.svelte'
	import Scroller from '$lib/scroller/Scroller.svelte'
	import Section from '$lib/scroller/Section.svelte'
	import SectionTitle from './SectionTitle.svelte'
	import TableTabs from './TableTabs.svelte'
	import Title from './Title.svelte'

	export let quickstart: string
	export let examples: ComponentExample[]

	export let data: ComponentData

	const getId = (title: string): string => {
		return title.replace(/\s/g, '-').toLowerCase()
	}
</script>

<Scroller threshold={0.7}>
	<div id="title" class="section">
		<Title title={data.meta.title} description={data.meta.description} type={data.meta.type} />
	</div>

	<Section id="demo">
		<Demo id={data.meta.color} {...$$restProps}>
			<slot />
		</Demo>
	</Section>

	{#if data.features.length > 0}
		<Section id="features">
			<Feats features={data.features} />
		</Section>
	{/if}

	{#if quickstart}
		<Section id="quickstart">
			<SectionTitle title="Quickstart" />
			<Code content={quickstart} />
		</Section>
	{/if}

	{#each Object.keys(data.docs) as section}
		{@const id = getId(section)}
		<div {id} class="section">
			<SectionTitle title={section} href="#{id}" />

			<Section lazyload id="docs">
				<TableTabs data={data.docs[section]} />
			</Section>
		</div>
	{/each}

	{#if examples.length > 0}
		<Section id="examples">
			<SectionTitle title="Examples" />

			{#each examples as { description, source, title }}
				<h3>{title}</h3>
				{#if description}
					<p>{description}</p>
				{/if}
				<Code content={source} />
			{/each}
		</Section>
	{/if}

	<Footer current={data.meta.title} />
</Scroller>

<style>
	.section {
		scroll-margin-top: 100px;
	}
</style>
