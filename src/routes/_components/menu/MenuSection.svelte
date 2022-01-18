<script lang="ts">
	export let label: string
</script>

<li class="flex flex-col gap-1">
	<h5 class="font-medium py-1 pl-6 text-light-500">{label}</h5>
	<ul class="flex flex-col gap-1">
		<slot />
	</ul>
</li>
