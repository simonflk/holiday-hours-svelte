<script lang="ts">
	import {
		calculate,
		daysPerWeek,
		ratioPercent,
		regularHours,
		regularHoursPerWeek,
		regularHolidayDays
	} from '$lib/calculate';
	import type { HolidayHoursCalculation } from '$lib/calculate';
	import { plural } from '$lib/string';

	export let name = 'Unnamed person';
	export let hoursPerWeek = 32;
	export let contractMonths = 12;

	let calc: HolidayHoursCalculation;
	let isPartTime = true;
	$: {
		calc = calculate(hoursPerWeek, contractMonths);
		isPartTime = calc.partTimeRatio < 1;
		console.log(name, { isPartTime }, calc);
	}
</script>

<h2>
	{name} ({#if isPartTime}Part time: {hoursPerWeek} hours per week{:else}Full time{/if})
</h2>

{#if isPartTime}
	<section>
		<h3>{calc.partTimeRatioPercent}% of "full-time"</h3>
		<p>
			{name} is working <strong>{calc.partTimeRatioPercent}%</strong> of a full-time job. And is
			entitled to approximately <strong>{calc.partTimeRatioPercent}%</strong> of annual leave (subject
			to the length of employment, and rounding, etc).
		</p>

		<details>
			<summary>How is this calculated?</summary>
			<code>
				(hoursPerWeek / {regularHoursPerWeek}) * 100<br />
				// ({hoursPerWeek} / {regularHoursPerWeek}) * 100 = {ratioPercent(
					hoursPerWeek,
					regularHoursPerWeek
				)}
			</code>
		</details>
	</section>
{/if}

<section>
	<h3>Holidays</h3>

	<blockquote>
		Full time employees are entitled to {regularHolidayDays} days paid holiday per annum, in addition
		to public holidays. Part-time staff holiday will be calculated on a pro-rata basis.
	</blockquote>
	<p>
		As the length of employment is {contractMonths}
		{plural(contractMonths, 'month')}, the number of holidays available to a full-time employee is {calc.contractHolidayDays}
	</p>
	{#if isPartTime}
		<p>
			Since {name} is part-time, they will be allocated
			<strong>{calc.partTimeHoliday} holidays</strong> (rounded up to the nearest half day).
		</p>
		<p>
			This is equal to approximately <strong
				>{ratioPercent(calc.partTimeHoliday, calc.contractHolidayDays)}%</strong
			> of the allotment for a full-time employee.
		</p>
	{/if}
</section>

<section>
	<h3>Conversion of holiday "days" into "hours"</h3>

	<p>
		Since the number of holidays is already scaled appropriately according to the number of hours {name}
		is working, it is not necessary to also scale the length of a "day". Therefore, the conversion of
		holidays into hours is simply:<br />
		<code>numberOfHolidays x {regularHours}</code>.
	</p>
	<p>
		Using this calculation, {name}'s holidays are approximately
		<strong>{calc.partTimeHolidayHours} hours</strong>.
	</p>
	<p>
		This is equal to approximately <strong
			>{ratioPercent(calc.partTimeHolidayHours, calc.contractHolidayHours)}%</strong
		> of the allotment for a full-time employee.
	</p>
	<p>
		This figure is close to the <strong>{calc.partTimeRatioPercent}%</strong> part-time ratio figure
		we calculated based on {name}'s hours. It may vary a small degree depending on the length of the
		contract due to rounding-up to the nearest half-day of holiday allocation.
	</p>
</section>

<section>
	<h3>What about adjusted holiday length?</h3>

	<p>
		An alternate calculation suggested by OnTrack is to scale the length of a "holiday" in
		proportion to the part-time contract <em>in addition to</em> scaling the number of holidays by the
		same factor.
	</p>
	<p>
		In other words:<br />
		<code>hours = (fullTimeHours x partTimeRatio) x (fullTimeHolidays x partTimeRatio)</code>.
	</p>
	<p>
		Or:<br />
		<code>hours = fullTimeHours x fullTimeHolidays x partTimeRatio<sup>2</sup></code>
		Since we are scaling the holiday allowance by a <em>square</em> of this <tt>partTimeRatio</tt>,
		this can have a dramatic, disproportionate effect on the holiday allowance, particularly for
		people who work "more" part time.
	</p>

	<p>
		Using this calculation, {name}'s holidays are approximately
		<strong>{calc.onTrackHolidayHours} hours</strong>.
	</p>
	<p>
		This is equal to approximately <strong
			>{ratioPercent(calc.onTrackHolidayHours, calc.contractHolidayHours)}%</strong
		> of the allotment for a full-time employee.
	</p>
	<p>
		This deviates significantly from the <strong
			>{ratioPercent(calc.partTimeHolidayHours, calc.contractHolidayHours)}%</strong
		>
		of the previous calculation, for {name} who works
		<strong>{calc.partTimeRatioPercent}%</strong> of the hours of a full-time employee.
	</p>
</section>

<section>
	<h3>Holiday "value"</h3>

	<p>
		It is possible to calculate the "value" of holiday using these figures, to answer the question:<br
		/>
		<strong>how many hours must one work, in order to earn a single hour of holiday?</strong>
	</p>

	<p>
		The calculation is simply:<br />
		<code> workHoursPerHolidayHour = hoursWorked / holidayHours </code>
	</p>

	<p>
		Using the straightforward holiday hours calculation for {name}, this would be:<br />
		<code>
			workHoursPerHolidayHour = {calc.partTimeWorkHours} / {calc.partTimeHolidayHours}
			= {calc.partTimeHolidayWorkValue} hours
		</code>
		{name} would work <strong>{calc.partTimeHolidayWorkValue}</strong> hours for every 1 hour of holiday.
	</p>

	<p>
		Using the double-adjusted holiday hours calculation for {name}, this would be:<br />
		<code>
			workHoursPerHolidayHour = {calc.onTrackWorkHours} / {calc.onTrackHolidayHours}
			= {calc.onTrackHolidayWorkValue} hours
		</code>
		{name} would work <strong>{calc.onTrackHolidayWorkValue}</strong> hours for every 1 hour of holiday.
	</p>

	<p>
		Compared to a full-time employee:<br />
		<code>
			workHoursPerHolidayHour = {calc.regularWorkHours} / {calc.contractHolidayHours}
			= {calc.regularHolidayWorkValue} hours
		</code>
		A full-time employee would work <strong>{calc.regularHolidayWorkValue}</strong> hours for every 1
		hour of holiday.
	</p>
</section>

<style>
	p {
		margin-bottom: 0.8em;
	}

	section {
		margin-bottom: 1em;
		padding: 1em;
		border: 1px solid #888;
		border-radius: 5px;
	}

	code {
		display: block;
		border: 1px solid #888;
		border-radius: 3px;
		background: #ddd;
		font-family: 'Courier New', Courier, monospace;
		font-weight: bold;
		padding: 0.5em;
	}
</style>
