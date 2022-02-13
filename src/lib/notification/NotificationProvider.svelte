<script lang="ts">
	import { Portal } from '$lib/core/parts'
	import { Notification } from '$lib/core/stores/notification'
	import NotificationCard from './NotificationCard.svelte'

	type NotificationPosition = 'bottom-end' | 'bottom-center' | 'bottom-start'
	export let position: NotificationPosition = 'bottom-end'
	export let duration: number = 5000
	export let closable = true
	// export let slidable = false
	// export let limit = 0

	$: duration && Notification.setDuration(duration)
</script>

{#if $Notification.items.length > 0}
	<Portal>
		<div part="notification-container" data-position={position}>
			<div part="area">
				{#each $Notification.items as item (item.id)}
					<slot {item} {closable}>
						<NotificationCard {closable} {item} />
					</slot>
				{/each}
			</div>
		</div>
	</Portal>
{/if}

<style>
	[part='notification-container'] {
		position: fixed;
		z-index: 1000;
		top: var(--st-notification-container-padding, 0.75rem);
		left: var(--st-notification-container-padding, 0.75rem);
		bottom: var(--st-notification-container-padding, 0.75rem);
		right: var(--st-notification-container-padding, 0.75rem);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		pointer-events: none;
	}

	[data-position='bottom-end'] {
		justify-content: end;
		align-items: end;
	}
	[data-position='bottom-center'] {
		justify-content: end;
		align-items: center;
	}
	[data-position='bottom-start'] {
		justify-content: end;
		align-items: start;
	}
	[data-position*='bottom'] [part='area'] {
		flex-direction: column-reverse;
	}

	[part='area'] {
		display: flex;
		flex-direction: column;
		gap: var(--st-notification-spacing, 0.25rem);
	}
</style>
