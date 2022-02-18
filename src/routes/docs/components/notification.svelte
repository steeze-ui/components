<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/notification'

	import NotificationProvider from '$lib/notification/NotificationProvider.svelte'
	import { Notification } from '$lib/core/stores/notification'
	import { Button } from '$lib'

	let count = 0
</script>

<Component {data} {quickstart} {examples}>
	<Button
		on:click={() => {
			count++
			Notification.show({
				title: 'Notification ' + count,
				description: 'This text can give you hints!',
				type: 'info'
			})
		}}>Notify me</Button
	>

	<NotificationProvider position="bottom-end" duration={3000} />
</Component>
