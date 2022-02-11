<script context="module" lang="ts">
	export interface Meta {
		title: string
		color: number
		type: 1 | 2 | 3
		description: string
	}

	export type Feature = string

	export interface Docs {
		[section: string]: { [tab: string]: { [column: string]: any }[] }
	}
</script>

<script lang="ts">
	// import _ from 'prismjs'
	// import 'prism-svelte'
	import Demo from './Demo.svelte'
	import Feats from './Features.svelte'
	import Footer from './Footer.svelte'
	import TableTabs from './TableTabs.svelte'
	import Title from './Title.svelte'

	export let meta: Meta
	export let features: Feature[]
	export let quickstart: string
	export let docs: Docs
	export let examples: string
</script>

<Title title={meta.title} description={meta.description} type={meta.type} />

<Demo id={meta.color}>
	<slot />
</Demo>

<Feats {features} />

{#if quickstart}
	<h2>Quickstart</h2>
	{@html quickstart}
{/if}

{#each Object.keys(docs) as section}
	<h2>{section}</h2>
	<TableTabs data={docs[section]} />
{/each}

{#if examples}
	<h2>Examples</h2>
	{@html examples}
{/if}

<Footer current={meta.title} />
