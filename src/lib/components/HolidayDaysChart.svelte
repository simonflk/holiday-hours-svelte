<script lang="ts">
	import Chart from 'svelte-frappe-charts';
	import { calculations } from '$lib/stores';

	let data = {};
	$: {
		data = {
			labels: $calculations.map((calc) => calc.hoursPerWeek),
			datasets: [
				{
                    chartType: 'bar',
					name: 'Rounded',
					values: $calculations.map((calc) => calc.partTimeHoliday)
				},
				{
                    chartType: 'line',
					name: 'Naive',
					values: $calculations.map((calc) =>
						(calc.contractHolidayDays * calc.partTimeRatio).toFixed(1)
					)
				},
			]
		};
	}

</script>

<Chart
	{data}
	type="axis-mixed"
	title="Visualisation of how many holidays are allocated based on how many part-time hours are worked"
	lineOptions={{
		hideDots: 1,
		spline: 1
	}}
	axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick' }}
    truncateLegends
	tooltipOptions={{
		formatTooltipX: (d) =>
			`${d} hours per week (${
				$calculations.find((c) => c.hoursPerWeek === d).partTimeRatioPercent
			}% of full-time)`
	}}
	animate
	colors={['#ff8fcc', '#4CB862', 'yellow']}
/>
