<script lang="ts">
	import type { NotificationItem } from '$lib/core/stores/notification'
	import {
		CheckCircle,
		Exclamation,
		ExclamationCircle,
		InformationCircle,
		X
	} from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import type { IconSource } from '@steeze-ui/svelte-icon/types'
	import { Notification } from '$lib/core/stores/notification'
	import { fly, FlyParams } from 'svelte/transition'

	export let item: NotificationItem
	export let closable = true
	// export let slidable = false
	export let flyInParams: FlyParams = { y: 50 }
	export let flyOutParams: FlyParams = { y: 50 }

	$: iconSrc = getIconFromType(item.type)

	const getIconFromType = (type: NotificationItem['type']): IconSource => {
		switch (type) {
			case 'success':
				return CheckCircle
			case 'error':
				return ExclamationCircle
			case 'info':
				return InformationCircle
			case 'warning':
				return Exclamation
			default:
				return InformationCircle
		}
	}
</script>

<div
	in:fly={flyInParams}
	out:fly={flyOutParams}
	part="notification"
	role="alert"
	aria-live="polite"
	data-type={item?.type ?? 'info'}
>
	<div part="icon">
		<Icon src={iconSrc} size="1.5rem" />
	</div>
	<div part="text-container">
		<p part="title">{item.title}</p>
		{#if item.description}
			<p part="description">{item.description}</p>
		{/if}
	</div>
	{#if closable}
		<button
			part="close"
			aria-label="close notification"
			on:click={() => {
				Notification.close(item)
			}}
		>
			<Icon src={X} size="1.25rem" />
		</button>
	{/if}
</div>

<style>
	[part='notification'] {
		pointer-events: initial;
		display: flex;
		padding: var(--st-notification-padding, 1rem);
		border-radius: var(--st-notification-border-radius, var(--st-border-radius-lg));
		background-color: var(--st-notification-bg-color, var(--st-overlay-bg-color));
		color: var(--st-notification-color, var(--st-overlay-color));
		border: 1px solid var(--st-notification-border-color, var(--st-overlay-border-color));
	}

	[part='title'] {
		font-size: var(--st-notification-font-size, var(--st-font-size-sm));
		font-weight: var(--st-notification-font-weight, var(--st-font-weight-medium));
		color: var(--st-notification-title-color, var(--st-body-text-color));
	}
	[part='description'] {
		font-size: var(--st-notification-font-size, var(--st-font-size-sm));
		color: var(--st-notification-description-color, var(--st-secondary-text-color));
	}
	[part='text-container'] {
		display: flex;
		flex-direction: column;
		margin-left: 0.75rem;
		gap: 0.25rem;
	}

	[part='close'] {
		color: var(--st-notification-close-color, var(--st-secondary-text-color));
		margin-left: 1rem;
		width: 1.25rem;
		height: 1.25rem;
	}

	[data-type='info'] [part='icon'] {
		color: hsl(211, 76%, 48%);
	}
	[data-type='error'] [part='icon'] {
		color: hsl(335, 78%, 42%);
	}
	[data-type='success'] [part='icon'] {
		color: hsl(163, 94%, 24%);
	}
	[data-type='warning'] [part='icon'] {
		color: hsl(35, 61%, 65%);
	}
</style>
