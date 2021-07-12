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
					name: '7.5 hr holiday',
					values: $calculations.map((calc) => calc.partTimeHolidayHours)
				},
				{
                    chartType: 'bar',
					name: 'Part-time',
					values: $calculations.map((calc) => calc.onTrackHolidayHours)
				},
				{
                    chartType: 'line',
					name: 'Naive',
					values: $calculations.map((calc) =>
						(calc.contractHolidayHours * calc.partTimeRatio).toFixed(1)
					)
				},
			]
		};
	}

</script>

<Chart
	{data}
	type="axis-mixed"
	title="Comparison of different conversions of &quot;holidays&quot; into hours"
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
	colors={['#ff8fcc', 'yellow', '#4CB862']}
/>
