<script>
	import TopTrump from '$lib/components/TopTrump.svelte';
	import ContractMonths from '$lib/components/ContractMonths.svelte';
	import { employees, customEmployee } from '$lib/users';
</script>

<ContractMonths />

<div class="cards">
	<a href="/employee/{$customEmployee.name.toLowerCase()}">
		<TopTrump employee={$customEmployee} isCustom={true} />
	</a>
	{#each employees as employee}
		<a href="/employee/{employee.name.toLowerCase()}">
			<TopTrump {employee} />
		</a>
	{/each}
</div>

<style>
	.cards {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		gap: 2em;
		max-width: 960px;
		margin-left: auto;
		margin-right: auto;
	}

	.cards a {
		text-decoration: none;
		color: inherit;
	}

	.cards a:hover,
	.cards a:focus {
		transform: scale(1.05) rotate(1deg);
	}
</style>
