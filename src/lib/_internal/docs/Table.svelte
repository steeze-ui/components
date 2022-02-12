<script lang="ts" context="module">
	export type TableData = { [key: string]: string | string[] | { text: string; help: string } }[]
</script>

<script lang="ts">
	import Help from './Help.svelte'

	export let data: TableData = []
</script>

<table>
	<thead>
		<tr>
			{#if data.length > 0}
				{#each Object.keys(data[0]) as th}
					<th>{th}</th>
				{/each}
			{/if}
		</tr>
	</thead>
	<tbody>
		{#if data.length > 0}
			{#each data as item}
				<tr>
					{#if data.length > 0}
						{#each Object.values(item) as td, i}
							{@const isArray = Array.isArray(td)}
							{@const isString = typeof td === 'string'}
							{@const isUnformatted = !isArray && isString && td.startsWith('_')}
							{#if isArray}
								<td>
									<div class="flex gap-1 flex-wrap">
										{#each td as key}
											<code data-hl>{key}</code>
										{/each}
									</div>
								</td>
							{:else if !isString}
								<td>
									<code>{td.text}</code>
									<Help text={td.help} />
								</td>
							{:else}
								<td>
									{#if i == 0}
										<code>{td}</code>
									{:else if isUnformatted}
										{td.substring(1)}
									{:else}
										<code data-hl>{td}</code>
									{/if}
								</td>
							{/if}
						{/each}
					{/if}
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style>
	td code:not(:last-child) {
		margin-right: 0.25rem;
	}

	td {
		max-width: 500px;
	}
</style>
