<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let id: string
	export let lazyload = false

	let loaded = false

	let state = getContext<Writable<String>>('ST_SCROLLER_SECTION_STATE')
	$: $state === id && (loaded = true)
</script>

<section data-section-lazyload={lazyload ? '' : null} {id} {...$$restProps} class="section-entry">
	{#if !lazyload}
		<slot />
	{:else if loaded}
		<slot />
	{:else}
		<slot name="placeholder">
			<div class="placeholder" style="width:100%;height:256px;" />
		</slot>
	{/if}
</section>
