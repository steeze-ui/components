<script context="module" lang="ts">
</script>

<script lang="ts">
	import type { ComponentData, ComponentExample } from '../types/docs'
	import Code from './Code.svelte'
	import Demo from './Demo.svelte'
	import Feats from './Features.svelte'
	import Footer from './Footer.svelte'
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

<div id="title" class="section">
	<Title title={data.meta.title} description={data.meta.description} type={data.meta.type} />
</div>

<div id="demo" class="section">
	<Demo id={data.meta.color} {...$$restProps}>
		<slot />
	</Demo>
</div>

{#if data.features.length > 0}
	<div id="features" class="section">
		<Feats features={data.features} />
	</div>
{/if}

{#if quickstart}
	<div id="quickstart" class="section">
		<SectionTitle title="Quickstart" />
		<Code content={quickstart} />
	</div>
{/if}

{#each Object.keys(data.docs) as section}
	{@const id = getId(section)}
	<div {id} class="section">
		<SectionTitle title={section} href="#{id}" />

		<div id="docs">
			<TableTabs data={data.docs[section]} />
		</div>
	</div>
{/each}

{#if examples.length > 0}
	<div id="examples" class="section">
		<SectionTitle title="Examples" />

		{#each examples as { description, source, title }}
			<h3>{title}</h3>
			{#if description}
				<p>{description}</p>
			{/if}
			<Code content={source} />
		{/each}
	</div>
{/if}

<Footer current={data.meta.title} />

<style>
	.section {
		scroll-margin-top: 100px;
	}
</style>
