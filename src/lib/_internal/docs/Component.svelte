<script context="module" lang="ts">
</script>

<script lang="ts">
	import type { ComponentData, ComponentExample } from '../types/docs'
	import Code from './Code.svelte'
	import Demo from './Demo.svelte'
	import Feats from './Features.svelte'
	import Footer from './Footer.svelte'
	import TableTabs from './TableTabs.svelte'
	import Title from './Title.svelte'

	export let quickstart: string
	export let examples: ComponentExample[]

	export let data: ComponentData
</script>

<Title title={data.meta.title} description={data.meta.description} type={data.meta.type} />

<Demo id={data.meta.color} {...$$restProps}>
	<slot />
</Demo>

<Feats features={data.features} />

{#if quickstart}
	<h2>Quickstart</h2>
	<Code content={quickstart} />
{/if}

{#each Object.keys(data.docs) as section}
	<h2>{section}</h2>
	<TableTabs data={data.docs[section]} />
{/each}

{#if examples.length > 0}
	<h2>Examples</h2>
	{#each examples as { description, source, title }}
		<h3>{title}</h3>
		{#if description}
			<p>{description}</p>
		{/if}
		<Code content={source} />
	{/each}
{/if}

<Footer current={data.meta.title} />
