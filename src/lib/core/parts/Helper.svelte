<script lang="ts">
</script>

<span {...$$restProps}>
	<slot />
</span>

<style>
	span {
		display: inline-block;
		font-weight: var(--st-helper-font-weight, var(--st-font-weight-normal));
		font-size: var(--st-helper-font-size, var(--st-font-size-xs));
		line-height: var(--st-helper-line-height, var(--st-line-height-snug));
		color: var(--st-helper-color);
	}
</style>
