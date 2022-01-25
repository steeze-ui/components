<script lang="ts">
</script>

<span {...$$restProps}>
	<slot />
</span>

<style>
	span {
		font-weight: var(--st-label-font-weight, var(--st-font-weight-normal));
		font-size: var(--st-label-font-size, var(--st-font-size-xs));
		color: var(--st-label-color);
	}
</style>
