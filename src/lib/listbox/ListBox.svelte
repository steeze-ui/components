<ul
	data-component="listbox"
	role="listbox"
	aria-orientation="vertical"
	tabindex="-1"
	{...$$restProps}
>
	<slot />
</ul>

<style>
	[data-component] {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: auto;
		box-shadow: var(--st-listbox-box-shadow, var(--st-overlay-box-shadow));
		border: var(--st-overlay-border-width) solid
			var(--st-listbox-border-color, var(--st-overlay-border-color));
		background-color: var(--st-listbox-bg-color, var(--st-overlay-bg-color));
		border-radius: var(--st-listbox-border-radius, var(--st-overlay-border-radius));
		padding: var(--st-listbox-padding, 0.25rem);
	}
</style>
