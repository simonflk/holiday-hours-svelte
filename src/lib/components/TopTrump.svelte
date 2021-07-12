<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { calculate, daysPerWeek, ratioPercent } from '$lib/calculate';
	import { contractMonths } from '$lib/stores';
	import type { HolidayHoursCalculation } from '$lib/calculate';
	import type { EmployeeContract } from '$lib/users';
	import { customEmployee } from '$lib/users';

	export let employee: EmployeeContract;
	export let isCustom: boolean = false;

	let calc: HolidayHoursCalculation;
	$: {
		calc = calculate(employee.hoursPerWeek, $contractMonths);
		console.log(employee.name, calc);
	}

	const rotate = (Math.random() - 0.5) * 5;
</script>

<section class="top-trump" style="--rotate: {rotate}deg">
	<div class="card-inner">
		<h2>{employee.name}</h2>
		<img class="avatar" alt={employee.avatarDesc} src={employee.avatarUrl} />
		<dl>
			<dt>Hours <span class="small light">per week</span></dt>
			<dd>
				<div>
					{#if isCustom}
						<label
							for="custom-hours"
							aria-label="Edit number of hours per week"
							on:click|stopPropagation|preventDefault>Edit me</label
						>
						<input
							type="number"
							min="1"
							max="37.5"
							step="0.5"
							bind:value={$customEmployee.hoursPerWeek}
							on:click|stopPropagation|preventDefault
						/><span class="small">/{calc.regularHoursPerWeek}</span>
					{:else}
						<span class="large bold">{employee.hoursPerWeek}</span><span class="small"
							>/{calc.regularHoursPerWeek}</span
						>
					{/if}
				</div>
				<span class="small"
					>({ratioPercent(employee.hoursPerWeek, calc.regularHoursPerWeek)}%)
				</span>
			</dd>

			<dt>Days <span class="small light">per week</span></dt>
			<dd>
				<div>
					<span class="large bold">{calc.partTimeDaysPerWeek.toFixed(2)}</span><span class="small"
						>/{daysPerWeek}</span
					>
				</div>
				<span class="small">({ratioPercent(calc.partTimeDaysPerWeek, daysPerWeek)}%)</span>
			</dd>

			<dt>Holidays</dt>
			<dd>
				<div>
					<span class="large bold">{calc.partTimeHoliday}</span><span class="small"
						>/{calc.contractHolidayDays}</span
					>
				</div>
				<span class="small">({ratioPercent(calc.partTimeHoliday, calc.contractHolidayDays)}%)</span>
			</dd>

			<dt>Holiday hours<br /><span class="small light">(7.5 hours per day)</span></dt>
			<dd>
				<div>
					<span class="large bold">{calc.partTimeHolidayHours}</span><span class="small"
						>/{calc.contractHolidayHours}</span
					>
				</div>
				<span class="small"
					>({ratioPercent(calc.partTimeHolidayHours, calc.contractHolidayHours)}%)</span
				>
				<div hidden>
					<br />
					({calc.partTimeHolidayWorkValue} work hours for every 1 holiday hour)
				</div>
			</dd>

			<dt>
				Holiday hours<br /><span class="small light">({calc.partTimeDayHours} hours per day)</span>
			</dt>
			<dd>
				<div>
					<span class="large bold">{calc.onTrackHolidayHours}</span><span class="small"
						>/{calc.contractHolidayHours}</span
					>
				</div>
				<span class="small"
					>({ratioPercent(calc.onTrackHolidayHours, calc.contractHolidayHours)}%)</span
				>
				<div hidden>
					<br />
					({calc.onTrackHolidayWorkValue} work hours for every 1 holiday hour)
				</div>
			</dd>
		</dl>
	</div>
</section>

<style>
	.top-trump {
		--card-padding: 1em;
		--inner-card-radius: 10px;
		color: black;
		width: 350px;
		background: white;
		border-radius: calc(var(--inner-card-radius) + var(--card-padding));
		border: 1px solid #898989;
		padding: 1em;
		box-shadow: 0px 10px 13px -7px #000000, 3px 3px 12px 2px rgba(177, 177, 177, 0);
		transform: rotate(var(--rotate));
	}

	.card-inner {
		display: flex;
		flex-direction: column;
		padding: 1em;
		background: #11998e; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			#38ef7d,
			#11998e
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#38ef7d,
			#11998e
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		border-radius: var(--inner-card-radius);
		border: 1px solid #a4a4a4;
	}

	h2 {
		background-color: white;
		padding-inline: 1em;
		margin-right: -1em;
		align-self: flex-end;
		display: inline-block;
	}

	.avatar {
		width: 100%;
		height: 250px;
		margin-top: -2em;
	}

	dl {
		display: flex;
		flex-flow: row wrap;
		color: black;
		background: white;

		margin-bottom: -1em;
		margin-left: -1em;
		margin-right: -1em;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	dt {
		flex-basis: 50%;
		padding: 2px 4px;
		text-align: right;
		font-weight: bold;
		border-bottom: 1px dotted #333;
	}
	dd {
		flex-basis: 50%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin: 0;
		padding: 2px 4px;
		border-bottom: 1px dotted #333;
		font-family: monospace;
		line-height: 2;
	}

	dl .large {
		font-size: 1.2em;
	}
	dl .bold {
		font-size: 1.2em;
	}
	dl .small {
		font-size: 0.8em;
	}

	dl .light {
		opacity: 0.75;
	}

	input[type='number'] {
		font-weight: bold;
		/* color: white; */
		/* background-color: deeppink; */
		border: 3px dashed deeppink;
		font-family: monospace;
	}

	label[for='custom-hours'] {
		display: block;
		font-size: 0.8em;
		font-weight: bold;
	}
</style>
