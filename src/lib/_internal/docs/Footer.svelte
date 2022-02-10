<script context="module">
	const keys = Object.keys(menu.flat())
</script>

<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@steeze-ui/heroicons'

	import { Icon } from '@steeze-ui/svelte-icon'
	import { menu } from '../stores/menu'

	export let current

	// const nextUrl = next && traverseMap(next)
	// const prevUrl = prev && traverseMap(prev)

	// function traverseMap(list: string[]): string {
	// 	let current
	// 	if (next) {
	// 		for (const n of list) {
	// 			if (!current) {
	// 				current = $menu?.[n] ?? ''
	// 			} else {
	// 				current = current?.[n] ?? ''
	// 			}
	// 		}
	// 	}
	// 	return current
	// }

	const currentIndex = keys.findIndex((e) => e === current)

	const nextKey = keys?.[currentIndex + 1]
	const nextValue = menu.flat()[nextKey]

	const prevKey = keys?.[currentIndex - 1]
	const prevValue = menu.flat()[prevKey]
</script>

<div part="wrapper">
	<div part="navigation">
		{#if prevKey}
			<a href={prevValue}><Icon src={ArrowLeft} size="16px" /> {prevKey}</a>
		{:else}
			<div />
		{/if}
		{#if nextKey}
			<a href={nextValue}>{nextKey} <Icon src={ArrowRight} size="16px" /></a>
		{:else}
			<div />
		{/if}
	</div>
	<div part="info">
		<div part="vercel-logo">
			Sponsored by&nbsp;&nbsp;<span
				><a href="https://www.vercel.com?utm_source=steeze-ui&utm_campaign=oss">
					<svg width="80" viewBox="0 0 4438 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M2223.75 250C2051.25 250 1926.87 362.5 1926.87 531.25C1926.87 700 2066.72 812.5 2239.38 812.5C2343.59 812.5 2435.47 771.25 2492.34 701.719L2372.81 632.656C2341.25 667.188 2293.28 687.344 2239.38 687.344C2164.53 687.344 2100.94 648.281 2077.34 585.781H2515.16C2518.59 568.281 2520.63 550.156 2520.63 531.094C2520.63 362.5 2396.41 250 2223.75 250ZM2076.09 476.562C2095.62 414.219 2149.06 375 2223.75 375C2298.59 375 2352.03 414.219 2371.41 476.562H2076.09ZM2040.78 78.125L1607.81 828.125L1174.69 78.125H1337.03L1607.66 546.875L1878.28 78.125H2040.78ZM577.344 0L1154.69 1000H0L577.344 0ZM3148.75 531.25C3148.75 625 3210 687.5 3305 687.5C3369.38 687.5 3417.66 658.281 3442.5 610.625L3562.5 679.844C3512.81 762.656 3419.69 812.5 3305 812.5C3132.34 812.5 3008.13 700 3008.13 531.25C3008.13 362.5 3132.5 250 3305 250C3419.69 250 3512.66 299.844 3562.5 382.656L3442.5 451.875C3417.66 404.219 3369.38 375 3305 375C3210.16 375 3148.75 437.5 3148.75 531.25ZM4437.5 78.125V796.875H4296.88V78.125H4437.5ZM3906.25 250C3733.75 250 3609.38 362.5 3609.38 531.25C3609.38 700 3749.38 812.5 3921.88 812.5C4026.09 812.5 4117.97 771.25 4174.84 701.719L4055.31 632.656C4023.75 667.188 3975.78 687.344 3921.88 687.344C3847.03 687.344 3783.44 648.281 3759.84 585.781H4197.66C4201.09 568.281 4203.12 550.156 4203.12 531.094C4203.12 362.5 4078.91 250 3906.25 250ZM3758.59 476.562C3778.13 414.219 3831.41 375 3906.25 375C3981.09 375 4034.53 414.219 4053.91 476.562H3758.59ZM2961.25 265.625V417.031C2945.63 412.5 2929.06 409.375 2911.25 409.375C2820.47 409.375 2755 471.875 2755 565.625V796.875H2614.38V265.625H2755V409.375C2755 330 2847.34 265.625 2961.25 265.625Z"
							fill="currentColor"
						/>
					</svg>
				</a></span
			>&nbsp;&nbsp;
		</div>
		<div part="seperator" />
		<div>
			<span part="license">MIT Licensed</span>
		</div>
	</div>
</div>

<style>
	[part='wrapper'] {
		padding-top: 4rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}
	[part='navigation'] {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	[part='vercel-logo'] {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-items: center;
	}

	a {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	[part='info'] {
		display: flex;
		/* flex-direction: column; */
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}

	[part='seperator'] {
		display: block;
		height: 20px;
		width: 1px;
	}
	:global(.st-theme-light [part='seperator']) {
		background-color: var(--st-colors-gray3);
	}
	:global(.st-theme-dark [part='seperator']) {
		background-color: var(--st-colors-gray9);
	}

	:global(.st-theme-dark [part='vercel-logo']) {
		color: var(--st-colors-gray7);
	}
	:global(.st-theme-light [part='vercel-logo']) {
		color: var(--st-colors-gray5);
	}

	:global(.st-theme-dark .prose [part='vercel-logo'] a) {
		color: white;
	}
	:global(.st-theme-light .prose [part='vercel-logo'] a) {
		color: black;
	}

	:global(.st-theme-dark span[part='license']) {
		color: var(--st-colors-gray7);
	}
	:global(.st-theme-light span[part='license']) {
		color: var(--st-colors-gray5);
	}
</style>
