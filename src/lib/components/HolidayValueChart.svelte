<script lang="ts">
	import Chart from 'svelte-frappe-charts';
	import { calculations } from '$lib/stores';

	let data = {};
	$: {
		data = {
			labels: $calculations.map((calc) => calc.hoursPerWeek),
            yMarkers: [
                {
                    label: '9.5',
                    value: 9.5
                }
            ],
			datasets: [
				{
					name: '7.5 hr holiday',
					values: $calculations.map((calc) => calc.partTimeHolidayWorkValue)
				},
				{
					name: 'Part-time',
					values: $calculations.map((calc) => calc.onTrackHolidayWorkValue)
				}
			]
		};
	}

</script>

<Chart
	{data}
	type="bar"
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
	colors={['#ff8fcc', 'yellow', '#4CB862', ]}
/>
