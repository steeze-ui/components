<script lang="ts">
	import { onMount, setContext } from 'svelte'
	import { writable, type Writable } from 'svelte/store'

	export let threshold = 0
	export const section: Writable<string> = writable('')

	let container: HTMLDivElement

	setContext('ST_SCROLLER_SECTION_STATE', section)

	// let onTop = true
	// const onScrollChange = (e: any) => {
	// 	onTop = e.target.scrollTop ? e.target.scrollTop < 118 : true
	// }

	onMount(() => {
		if (`IntersectionObserver` in window) {
			const observer = new IntersectionObserver(handleIntersection, {
				threshold: threshold
			})
			for (let node of container.getElementsByClassName('section-entry') as any) {
				observer.observe(node)
			}
			return () => observer.disconnect()
		}
	})

	function handleIntersection(entries: IntersectionObserverEntry[]) {
		entries.map((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active')
				if (section) {
					$section = entry.target.id
				}
			} else {
				entry.target.classList.remove('active')
			}
		})
	}
</script>

<div bind:this={container} {...$$restProps}>
	<!-- class:on-top={onTop} 
	on:scroll={onScrollChange} -->
	<slot />
</div>
