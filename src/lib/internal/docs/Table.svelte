<script lang="ts">
	export let data: { [key: string]: string | string[] }[] = []
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
							{@const isUnformatted = !isArray && td.startsWith('_')}
							{#if isArray}
								<td>
									{#each td as key}
										<code data-hl>{key}</code>
									{/each}
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
</style>
