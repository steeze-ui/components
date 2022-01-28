<script context="module">
	const colors = [
		'--st-primary-color',
		'--st-colors-violet8',
		'--st-colors-purple8',
		'--st-colors-fuchsia8',
		'--st-colors-pink8',
		'--st-colors-rose8',
		'--st-colors-orange8',
		'--st-colors-yellow8',
		'--st-colors-lime8',
		'--st-colors-emerald8',
		'--st-colors-teal8',
		'--st-colors-cyan8',
		'--st-colors-sky8',
		'--st-colors-blue8'
	]
</script>

<script lang="ts">
	import { Moon, Sun } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	import { lightTheme } from '../stores/theme'

	export let id: number

	const first = colors[id % colors.length]
	const second = colors[(id + 1) % colors.length]
</script>

<div
	part="box"
	style="background-image: linear-gradient(22deg, var({first}) 0%, var({second}) 100%);"
	class="relative rounded-xl p-4 flex flex-col min-h-64 gap-4 overflow-hidden items-center relative justify-center lg:-mx-11"
>
	<slot name="prefix" />
	<button
		aria-label="toggle dark/light theme"
		class="absolute top-3 right-3 z-50"
		on:click={() => {
			lightTheme.toggle()
		}}
	>
		<Icon src={$lightTheme ? Moon : Sun} size="24px" />
	</button>
	<div part="grid" class="relative flex flex-col h-full w-full gap-4 items-center justify-center">
		<slot />
	</div>
</div>

<style>
	:root {
		--st-colors-emerald8: hsl(163, 94%, 24%);
		--st-colors-teal8: hsl(175, 77%, 26%);
		--st-colors-cyan8: hsl(193, 82%, 31%);
		--st-colors-sky8: hsl(201, 96%, 32%);
		--st-colors-blue8: hsl(224, 76%, 48%);
		--st-colors-violet8: hsl(263, 70%, 50%);
		--st-colors-purple8: hsl(272, 72%, 47%);
		--st-colors-fuchsia8: hsl(295, 72%, 40%);
		--st-colors-pink8: hsl(335, 78%, 42%);
		--st-colors-rose8: hsl(345, 83%, 41%);
		--st-colors-orange8: rgb(194, 65, 12);
		--st-colors-yellow8: hsl(35, 92%, 33%);
		--st-colors-lime8: hsl(86, 78%, 27%);
	}
	[part='grid'] {
		/* background-size: 60px 60px;
		background-image: linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px); */

		/* dotted bg */
		background-size: 40px 40px;
		background-image: radial-gradient(circle, #00000022 1px, rgba(0, 0, 0, 0) 1px);
	}
</style>
