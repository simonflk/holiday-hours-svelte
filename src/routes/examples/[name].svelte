<script lang="ts">
	import { page } from '$app/stores';
	import TopTrump from '$lib/components/TopTrump.svelte';
	import CalculationExplanation from '$lib/components/CalculationExplanation.svelte';
	import ContractMonths from '$lib/components/ContractMonths.svelte';
	import { employees, customEmployee } from '$lib/users';

	let employee =
		employees.find((emp) => emp.name.toLowerCase() === $page.params.name.toLowerCase()) ||
		$customEmployee;

	$: {
		employee =
			employees.find((emp) => emp.name.toLowerCase() === $page.params.name.toLowerCase()) ||
			$customEmployee;
	}
</script>

<ContractMonths />
<div class="container">
	<aside>
		<TopTrump {employee} isCustom={employee.name === $customEmployee.name} />
	</aside>
	<article>
		<CalculationExplanation {employee} />
	</article>
</div>

<style>
	@media (min-width: 960px) {
		.container {
			width: 90%;
			max-width: 1440px;
			margin: 0 auto;
			display: grid;
			grid-template-columns: 400px 1fr;
			gap: 2rem;
		}
	}

	aside {
		align-self: start;
		margin-bottom: 2rem;
	}
</style>
