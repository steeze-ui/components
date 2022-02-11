```html
<script>
	import { Select } from '@steeze-ui/components'

	const items = [
		{ id: '1', label: 'First Item' },
		{ id: '2', label: 'Second Item' }
	]
</script>

<select {items} value="{items[0]}" />
```
