<script lang="ts">
	import Tabs from '$lib/tabs/Tabs.svelte'
	import Table, { type TableData } from './Table.svelte'

	export let data: { [section: string]: TableData }

	let selected = 0

	let sections = Object.keys(data).map((e) => ({ title: e }))
</script>

<Tabs theme="line" items={sections} bind:selected />

<div class="overflow-auto">
	<Table data={data[sections[selected].title]} />
</div>

<!-- 126 -->
