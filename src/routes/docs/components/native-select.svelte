<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import NativeSelect from '$lib/select/NativeSelect.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/native-select'

	let value = '1'
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container">
		<NativeSelect bind:value label="Label" helper="Selected: {value}" required>
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
		</NativeSelect>
	</div>
</Component>
