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
	export let id: number

	const first = colors[id % colors.length]
	const second = colors[(id + 1) % colors.length]
</script>

<div
	part="box"
	style="background-image: linear-gradient(22deg, var({first}) 0%, var({second}) 100%);"
	class="rounded-xl flex flex-col h-64 gap-4 overflow-hidden items-center relative justify-center lg:-mx-11"
>
	<div part="grid" class="flex flex-col h-full w-full gap-4 items-center justify-center">
		<slot />
	</div>
</div>

<style>
	[part='grid'] {
		/* background-size: 60px 60px;
		background-image: linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px); */

		/* dotted bg */
		background-size: 40px 40px;
		background-image: radial-gradient(circle, #00000022 1px, rgba(0, 0, 0, 0) 1px);
	}
</style>
