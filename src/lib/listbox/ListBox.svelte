<script lang="ts">
	export let showPrefix = false
</script>

<ul part="listbox" role="listbox" aria-orientation="vertical" tabindex="-1" {...$$restProps}>
	{#if showPrefix}
		<slot name="prefix" />
	{/if}
	<div part="items">
		<slot />
	</div>
	<slot name="suffix" />
</ul>

<style>
	[part='listbox'] {
		overflow: auto;
		box-shadow: var(--st-overlay-box-shadow);
		border: var(--st-overlay-border-width) solid var(--st-overlay-border-color);
		background-color: var(--st-overlay-bg-color);
		border-radius: var(--st-overlay-border-radius);
		padding: 0.25rem;
	}

	[part='items'] {
		overflow: auto;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
