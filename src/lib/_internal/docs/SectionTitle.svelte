<script lang="ts">
	export let title: string
	export let href: string = '#' + title.toLowerCase()
</script>

<h2 tabindex="-1">
	{title}
	<a {href}> # </a>
</h2>

<style>
	a {
		text-decoration: none;
		display: none;
	}

	h2:hover a,
	h2:focus a {
		display: inline;
	}
</style>
