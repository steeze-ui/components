<script lang="ts">
	let htmlFor: string
	export { htmlFor as for }
	export let ref: HTMLElement | undefined = undefined
</script>

<label bind:this={ref} data-component="label" on:click for={htmlFor} {...$$restProps}>
	<slot />
</label>

<style>
	label {
		font-weight: var(--st-label-font-weight, var(--st-font-weight-semibold));
		font-size: var(--st-label-font-size, var(--st-font-size-xs));
		line-height: var(--st-label-line-height, var(--st-line-height-snug));
		color: var(--st-label-color);
	}
</style>
