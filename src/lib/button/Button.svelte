<script lang="ts">
	import { css } from '$stitches'
	import { IconSource, Icon } from '@steeze-ui/svelte-icon'
	import type { VariantProps } from '@stitches/core'

	export let variants: IconButtonVariants = {}

	export let disabled = false
	export let icon: IconSource = null
	export let iconTheme = 'default'
	export let onClick: () => void = null

	type IconButtonVariants = VariantProps<typeof buttonStyles>

	const iconSize = getIconSize(variants?.size ?? 'default')

	function getIconSize(size: IconButtonVariants['size']) {
		switch (size) {
			case 'lg':
				return '20px'
			case 'xl':
				return '24px'
			default:
				return '14px'
		}
	}

	if ($$slots.default) {
		variants.withText = true
	}

	const buttonStyles = css({
		borderRadius: '$default',
		border: '1px solid $dark300',
		transition: '$hover',
		outline: 'none',
		gap: 1.5,

		variants: {
			background: {
				default: {
					backgroundColor: '$dark600',
				},
				transparent: {
					backgroundColor: 'transparent',
				},
				active: {
					backgroundColor: '$dark900',
				},
				primary: {
					backgroundColor: '$primary600',
					color: 'white',
					borderColor: '$primary500',
					'&:hover': {
						backgroundColor: '$primary700',
					},
					'&:focus': {
						outline: 'none',
						boxShadow: '$focus',
					},
				},
			},
			color: {
				default: {
					color: '$gray200',
				},
				dimmed: {
					color: '$gray500',
				},
				primary: {
					color: '$primary600',
				},
			},
			borderless: {
				true: {
					border: '0',
				},
			},
			size: {
				default: {
					height: '$formHeight',
					p: 1.5,
					fontSize: '$sm',
					lineHeight: '$none',
				},
				lg: {
					height: '2.25rem',
					p: 2,
					fontSize: '$base',
					lineHeight: '$none',
				},
				xl: {
					height: '2.75rem',
					p: 3,
					fontSize: '$lg',
					lineHeight: '$none',
				},
			},

			withText: {
				true: {},
			},
		},

		'&:hover': {
			backgroundColor: '$dark900',
		},
		'&:focus': {
			outline: 'none',
			boxShadow: '$focus',
		},
		'&:active': {
			boxShadow: '$focus',
		},

		defaultVariants: {
			color: 'default',
			size: 'default',
			background: 'default',
		},
		compoundVariants: [
			{
				withText: true,
				size: 'default',
				css: {
					px: 2,
				},
			},
			{
				withText: true,
				size: 'lg',
				css: {
					px: 3,
				},
			},
			{
				withText: true,
				size: 'xl',
				css: {
					px: 4,
				},
			},
		],
	})
</script>

<button
	{...$$restProps}
	{disabled}
	on:click
	on:click={onClick}
	style="display:flex; align-items:center; justify-content:center;"
	class={buttonStyles(variants)}
>
	{#if icon}
		<Icon theme={iconTheme} src={icon} width={iconSize} height={iconSize} />
	{/if}
	<slot />
</button>
