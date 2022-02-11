<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/button'

	import Button from '$lib/button/Button.svelte'
	import { Moon, Sun } from '@steeze-ui/heroicons'
</script>

<Component {data} {quickstart} {examples}>
	<div class="flex gap-3">
		<Button theme="primary" style="width:8rem" aria-label="Primary Button Theme Example"
			>Primary</Button
		>
		<Button style="width:8rem" aria-label="Secondary Button Theme Example">Secondary</Button>
		<Button theme="tertiary" style="width:8rem" aria-label="Tertiary Button Theme Example"
			>Tertiary</Button
		>
	</div>
	<div class="flex gap-3">
		<Button theme="secondary" icon={Moon} aria-label="Icon Button with Label">Icon</Button>
		<Button theme="secondary" icon={Sun} aria-label="Icon Only Button" />
	</div>
</Component>
