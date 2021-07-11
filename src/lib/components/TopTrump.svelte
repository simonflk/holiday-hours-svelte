<script lang="ts">
	import { calculate, daysPerWeek, ratioPercent } from '$lib/calculate';
	import type { HolidayHoursCalculation } from '$lib/calculate';

	export let name = 'Unnamed person';
	export let hoursPerWeek = 32;
	export let contractMonths = 12;

	let calc: HolidayHoursCalculation;
	$: {
		calc = calculate(hoursPerWeek, contractMonths);
		console.log(name, calc);
	}

	const rotate = (Math.random() - 0.5) * 5;
</script>

<section class="top-trump" style="--rotate: {rotate}deg">
	<div class="card-inner">
		<h2>{name}</h2>
		<img
			class="avatar"
			alt="Avatar for {name}, with long dark hair, facial hair, and a slight smile, looking to the side"
			src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Side&eyebrowType=Default&mouthType=Twinkle&skinColor=Light"
		/>
		<dl>
			<dt>Hours per week:</dt>
			<dd>
				{hoursPerWeek} / {calc.regularHoursPerWeek} ({ratioPercent(
					hoursPerWeek,
					calc.regularHoursPerWeek
				)}%)
			</dd>

			<dt>Days per week:</dt>
			<dd>
				{calc.partTimeDaysPerWeek.toFixed(2)} / {daysPerWeek} ({ratioPercent(
					calc.partTimeDaysPerWeek,
					daysPerWeek
				)}%)
			</dd>

			<dt>Holiday days:</dt>
			<dd>
				{calc.partTimeHoliday} / {calc.contractHolidayDays} ({ratioPercent(
					calc.partTimeHoliday,
					calc.contractHolidayDays
				)}%)
			</dd>

			<dt>Holiday hours (Simon):</dt>
			<dd>
				{calc.partTimeHolidayHours} / {calc.contractHolidayHours} ({ratioPercent(
					calc.partTimeHolidayHours,
					calc.contractHolidayHours
				)}%)
				<br />
				({calc.partTimeHolidayWorkValue} work hours for every 1 holiday hour)
			</dd>

			<dt>Holiday hours (OnTrack):</dt>
			<dd>
				{calc.onTrackHolidayHours} / {calc.contractHolidayHours} ({ratioPercent(
					calc.onTrackHolidayHours,
					calc.contractHolidayHours
				)}%)
				<br />
				({calc.onTrackHolidayWorkValue} work hours for every 1 holiday hour)
			</dd>
		</dl>
	</div>
</section>

<style>
	.top-trump {
		--card-padding: 1em;
		--inner-card-radius: 10px;
        background: white;
		border-radius: calc(var(--inner-card-radius) + var(--card-padding));
		border: 1px solid #898989;
		padding: 1em;
		width: clamp(320px, 100%, 380px);
		box-shadow: 0px 10px 13px -7px #000000, 3px 3px 12px 2px rgba(177, 177, 177, 0);
		transform: rotate(var(--rotate));
	}

	.card-inner {
		padding: 1em;
		background-color: cyan;
		border-radius: var(--inner-card-radius);
		border: 1px solid #a4a4a4;
	}

	h2 {
		background-color: white;
		padding-inline: 1em;
		margin-left: -1em;
		display: inline-block;
	}

	.avatar {
		width: 100%;
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
		flex-basis: 30%;
		padding: 2px 4px;
		text-align: right;
		font-weight: bold;
		border-bottom: 1px dotted #333;
	}
	dd {
		flex-basis: 70%;
		flex-grow: 1;
		margin: 0;
		padding: 2px 4px;
		border-bottom: 1px dotted #333;
		font-family: monospace;
		line-height: 2;
	}
</style>
