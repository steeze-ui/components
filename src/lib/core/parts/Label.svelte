<script lang="ts">
	let htmlFor
	export { htmlFor as for }
</script>

<label on:click for={htmlFor} {...$$restProps}>
	<slot />
</label>

<style>
	label {
		font-weight: var(--st-label-font-weight, var(--st-font-weight-semibold));
		font-size: var(--st-label-font-size, var(--st-font-size-xs));
		color: var(--st-label-color);
	}
</style>
