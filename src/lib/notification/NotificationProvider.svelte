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
		<div part="notification-provider" data-position={position}>
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
	[part='notification-provider'] {
		position: fixed;
		z-index: 1000;
		top: var(--st-notification-provider-padding, 0.75rem);
		left: var(--st-notification-provider-padding, 0.75rem);
		bottom: var(--st-notification-provider-padding, 0.75rem);
		right: var(--st-notification-provider-padding, 0.75rem);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		pointer-events: none;
	}

	[data-position='bottom-end'] {
		justify-content: flex-end;
		align-items: flex-end;
	}
	[data-position='bottom-center'] {
		justify-content: flex-end;
		align-items: center;
	}
	[data-position='bottom-start'] {
		justify-content: flex-end;
		align-items: flex-start;
	}
	[data-position*='bottom'] [part='area'] {
		flex-direction: column-reverse;
	}

	[part='area'] {
		display: flex;
		flex-grow: 1;

		flex-direction: column;
		gap: var(--st-notification-gap, 0.25rem);
	}
</style>
