> Need Icons for your next SvelteKit project (heroicons, feather icons and more) ? Check out [@steeze-ui/icons](https://github.com/steeze-ui/icons)!

# Steeze UI

Components for SvelteKit Apps. Check out the [documentation](https://steeze-ui.com) for more info!

- Accessible
- Prestyled
- Themable

## Getting Started

### Installing

Install the package as dev dependency via pnpm, npm or yarn

```bash
pnpm i -D @steeze-ui/components
```

### Base Styles

Once you've installed the package, you can import the base styles which consists of basic normalization and custom properties that most components are using (e.g `colors` or `font sizes`)

```html
<script>
	import '@steeze-ui/components/base.css'
</script>
```

> You can easily override the custom properties and define your own design system

### Use Components

```svelte
<script>
  import {Select, TextField, Button, Toggle} from "@steeze-ui/components"
</script>

<Select items={[{id:1,label:"Label 1"}]}>
<TextField label="Text Field" value="Text" />
<Toggle checked />
<Button theme="primary" type="submit">Submit</Button>
```

### Use Underlying Parts

Some components share the same parts, like both `Select` and `TextField` use the `Label` Component or the `Toggle` Component is just a styled and more user-friendly version of the `Switch` Component. By design you can use these parts via deep imports from the core/parts folder:

```svelte
<script>
  import Switch from "@steeze-ui/components/core/parts/Switch.svelte"
  import Label from "@steeze-ui/components/core/parts/Label.svelte"
</script>

<Label for="switch">Switch me!</Label>
<Switch id="switch" checked />
```

## Sponsors
<img width="150px" src="https://user-images.githubusercontent.com/30449535/153277500-232b04f0-f636-42b1-aa08-1cd09d8e9086.svg" />

## License

Distributed under the [MIT License](/LICENSE).
