### Custom Value Renderer

Changes how the label will be rendered for the Input and Selector Items. This is needed in case where your item object has no `label` property

```svelte
<script>
	const items = [{id:"1",value:"value 1"}]
</script>

<Select {items} itemLabelRenderer={(e)=>`Item: ${e.value}`} />
```

### Custom Identifier

In case your item object comes with a different identifier you can change the default identifier of `id` to your needs

```svelte
<script>
	const items = [{key:"1",label:"value 1"}]
</script>

<Select {items} identifier="key" />
```

### Custom Label Renderer

Render a completely custom Menu Item using the `item` slot and its `let:` properties. Don't forget to apply the `id`, to make it accessible for screen readers

```svelte
<Select {items}>
	<p
		slot="item"
		let:id let:item let:label
		let:focused let:selected
		let:onSelect let:onFocus
		{id}
		on:pointerdown={onSelect}
		on:pointerover={onFocus}
		style:background-color={focused ? "blue" : "" }
		style:color={selected ? "red" : "" }
	>
		{label}
	</p>
</Select>
```

### Grouping Items

Sort items by Grouping them together.

```svelte
<script>
	const items = [
		{id:"1",value:"Value 1",group:"Group 1"},
		{id:"2",value:"Value 2",group:"Group 2"},
		{id:"3",value:"Value 3",group:"Group 2"},
	]
</script>

<Select {items} groupBy={(e)=>e.group} />
```
