<script lang="ts">
	import ContractMonths from '$lib/components/ContractMonths.svelte';
	import HolidayHoursChart from '$lib/components/HolidayHoursChart.svelte';
	import HolidayDaysChart from '$lib/components/HolidayDaysChart.svelte';
	import HolidayValueChart from '$lib/components/HolidayValueChart.svelte';
	import { contractMonths } from '$lib/stores';
</script>

<div class="content">
	<h2>A visual guide</h2>

	<section>
		<h3>Proportional holiday benefits</h3>

		<p>
			A part-time employee should receive holiday benefits which are directly proportional to the
			percentage of a full-time job that they undertake (subject to minor variances related to
			public holidays, rounding, etc).
		</p>
		<p>
			In other words, an employee who works 2.5 days a week (50%) should receive approximately 50%
			of the holiday benefits, whether those are calculated in days, or in hours. Likewise for 25%
			and 75% part-time workers, and everyone in-between.
		</p>
		<p>
			An extension of this concept would suggest that a part-time worker should earn the same
			holiday benefits as a full-time worker clocking the same hours. In other words, if a full-time
			worker earns a single holiday "hour" after working 9.5 hours, then a part-time worker should
			expect the same exchange rate regardless of whether that worker works 10 hours a week, or 30.
		</p>
		<p>The following charts demonstrate these calculations.</p>

		<ContractMonths />
	</section>

	<section>
		<h3>Allocation of holidays to part-time workers</h3>
		<p>In this chart, we show:</p>
		<ul>
			<li>
				A "naive" calculation - A direct proportion of the "full-time" allocation based on part-time
				hours. This essentially plots the percentage of part-time hours along the same scale.
			</li>
			<li>A "rounded" amound - showing this figure rounded up to the nearest half day.</li>
		</ul>
		<HolidayDaysChart />
		<p>
			This is for illustrative purposes. It shows that aside from some minor rounding, the allocated
			holiday is directly proportional to the hours worked. Somebody who works "half" time, is
			allocated half the holiday benefits of a full-time employee.
		</p>
	</section>

	<section>
		<h3>Conversion of holidays into hours</h3>
		<p>In this chart, given the number of holidays (calculated above) we show:</p>
		<ul>
			<li>
				A "naive" calculation - As above this essentially plots the part-time hours percentage on
				the same scale, for ease of comparison.
			</li>
			<li>Conversion based on 7.5 hours per day.</li>
			<li>Conversion based on number of part-time hours per day.</li>
		</ul>

		<HolidayHoursChart />

		<p>
			As you can see, the conversion based on 7.5 hour days closely tracks the green line which
			shows the expectation that they receive benefits in proportion to the hours worked.
		</p>
		<p>
			Whereas the conversion which considers the length of a "holiday" to be in proportion to the
			part-time hours worked, deviates quite considerably from the expectation. That is because we
			have already factored in the part-time hours when we calculated how many holidays a part-time
			employee should receive. If we factor it in again when converting those <em
				>already reduced</em
			>
			days into hours then we are overcompensating to the detriment of the part-time worker.
		</p>
	</section>

	<section>
		<h3>Holiday "value"</h3>

		<p>
			In this chart, given the number of holiday hours (using both calculations above) we show how
			many hours must an employee work in order to earn a single holiday hour. We would expect this
			number to be the same (or very close) regardless of how many hours per week an employee is
			working.
		</p>
		<p>
			It's a simple formula:
			<code>
				numberOfWeeksInMonth = (365 / 12) / 7 (approx 4.3)<br />
				employmentLength = {$contractMonths} (months)<br />
				holidayHours = (calculated above)<br />
				hoursWorked = (hoursPerWeek * numberOfWeeksInMonth * employmentLength) - holidayHours<br />
				workHoursPerHolidayHour = hoursWorked / holidayHours
			</code>
		</p>
		<p>
			This calculation is applied to both the 7.5 hour conversion and the part-time holiday
			conversion described in the previous chart. It is simply another way to visualise the same
			deviation highlighted above.
		</p>

		<HolidayValueChart />

		<p>
			As you can see, a full-time worker earns a single holiday hour for every 9.5 hours of work.
			And the dataset (in pink) which considers a holiday to be 7.5 hours regardless of hours worked
			sticks closely in line with that. There are small variances which are accounted for by the
			fact that part-time holidays are rounded up to the nearest half day.
		</p>

		<p>
			The dataset (in yellow) which shows the value derived from assuming a part-time holiday is
			less than 7.5 hours, deviates extremely from the full-time exchange rate. Depending on the
			length of employment, and the number of hours worked per week, a part-time worker could have
			to work up to 50 hours to earn a single hour of holiday.
		</p>
	</section>
</div>

<style>
	:global(.chart-container) {
		background: #4c5763;
		margin-bottom: 1em;
	}
	:global(.chart-container .axis),
	:global(.chart-container .title),
	:global(.chart-container .chart-label),
	:global(.chart-container .legend-dataset-text) {
		fill: white;
	}
</style>
