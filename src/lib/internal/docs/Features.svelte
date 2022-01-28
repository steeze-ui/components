<script lang="ts">
	export let features = []
</script>

<ul>
	{#each features as feature}
		<li>{feature}</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		column-gap: 3rem;
		justify-content: center;
		flex-wrap: wrap;
		font-size: var(--st-font-size-sm);
		color: var(--st-colors-gray7);
	}

	li {
		text-decoration: none;
	}
	li::before {
		width: 0;
		height: 0;
		display: none;
	}
</style>
