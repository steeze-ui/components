<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Scroller from '$lib/scroller/Scroller.svelte'
	import Section from '$lib/scroller/Section.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/scroller'

	let section
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container p-1 max-h-64 justify-center items-center">
		<span class="px-12 w-42 text-center">{section ? $section : ''}</span>

		<div class="overflow-auto w-full p-4">
			<Scroller bind:section class="flex flex-col gap-8">
				<Section
					id="Red"
					part="demo-scroller-section"
					style="background-color: rgba(255, 0, 0, 0.5);"
				/>
				<Section
					id="Green"
					part="demo-scroller-section"
					style="background-color: rgba(0, 255, 0, 0.5);"
				/>
				<Section
					id="Blue"
					part="demo-scroller-section"
					style="background-color: rgba(0, 0, 255, 0.5);"
				/>
			</Scroller>
		</div>
	</div>
</Component>

<style>
	:global([part='demo-scroller-section']) {
		display: flex;
		height: 300px;

		justify-content: center;
		color: white;

		border-radius: var(--st-border-radius);
	}
</style>
