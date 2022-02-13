import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Notification',
		description: 'Display a notification',
		color: 9,
		type: 2
	},
	features: ['Global Provider', 'Custom Notifications', 'Closable', 'Custom Duration'],
	docs: {
		'API Reference': {
			Properties: [
				{ Property: 'position', Type: 'NotificationPosition', Default: 'bottom-end' },
				{
					Property: {
						text: 'duration',
						help: 'The duration of the notification in milliseconds'
					},
					Type: 'Number',
					Default: '5000'
				},
				{
					Property: {
						text: 'closable',
						help: 'Allow the user to close the notification'
					},
					Type: 'Boolean',
					Default: 'true'
				}
			],
			Slots: [
				{ Name: 'default', Props: ['item', 'closable'], Notes: '_Render a custom Notification' }
			]
			// Events: [{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' }]
		},
		Styling: {
			'CSS variables': [
				{ Name: '--st-notification-container-padding', Default: '0.75rem' },
				{ Name: '--st-notification-spacing', Default: '0.25rem' },
				{ Name: '--st-notification-padding', Default: '1rem' },
				{ Name: '--st-notification-border-radius', Default: '--st-border-radius-lg' },
				{ Name: '--st-notification-bg-color', Default: '--st-overlay-bg-color' },
				{ Name: '--st-notification-color', Default: '--st-overlay-color' },
				{ Name: '--st-notification-border-color', Default: '--st-overlay-border-color' },
				{ Name: '--st-notification-font-size', Default: '--st-font-size-sm' },
				{ Name: '--st-notification-font-weight', Default: '--st-font-weight-medium' },
				{ Name: '--st-notification-title-color', Default: '--st-body-text-color' },
				{ Name: '--st-notification-description-color', Default: '--st-secondary-text-color' }
			]
			// Themes: [{ Name: 'small', Notes: 'Smaller Appearance of the Component', Global: 'true' }]
		}
	}
}

export const quickstart = `<script>
  import { NotificationProvider, Notification, Button } from "@steeze-ui/components"
</script>

<Button on:click={() => {
	Notification.show({title:"Successfully saved!",type:"success"})
}}>Show</Button>

<NotificationProvider duration={3000} />`

export const examples: ComponentExample[] = [
	{
		title: 'Render a custom Notification',
		source: `<script>
  import { NotificationProvider, Notification, Button } from "@steeze-ui/components"
</script>

<Button on:click={() => {
	Notification.show({customProp:"My Notification!"})
}}>Show</Button>

<NotificationProvider duration={3000}>
	<div slot="default" role="alert" aria-live="polite" let:item>
		<p>{item.customProp}</p>
	</div>
</NotificationProvider>`
	}
]
