<script lang="ts">
	export let label: string
</script>

<li class="flex flex-col gap-1">
	<div class="flex gap-4 items-center justify-between mx-2">
		<span class="font-medium py-1 pl-4 text-gray-300">{label}</span>
		<slot name="label-suffix" />
	</div>
	<ul class="flex flex-col gap-1">
		<slot />
	</ul>
</li>

<style>
	span {
		color: var(--st-colors-gray4);
	}

	:global(.light h5) {
		color: var(--st-colors-gray6);
	}
</style>
