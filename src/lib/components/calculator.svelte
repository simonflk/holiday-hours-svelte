<script lang="typescript">
    import { calculate, daysPerWeek, ratioPercent } from "$lib/calculate";
    import type { HolidayHoursCalculation } from "$lib/calculate";

	export let name = 'Unnamed person';
	export let hoursPerWeek = 32;
    export let contractMonths = 12;

    let calc: HolidayHoursCalculation;
    $: {
        calc = calculate(hoursPerWeek, contractMonths);
        console.log(name, calc);
    }


</script>

<section>
	<h2>{name}</h2>
	<dl>
		<dt>Hours per week:</dt>
		<dd>
			{hoursPerWeek} / {calc.regularHoursPerWeek} ({ratioPercent(hoursPerWeek, calc.regularHoursPerWeek)}%)
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
            <br/>
            ({calc.partTimeHolidayWorkValue} work hours for every 1 holiday hour)
		</dd>

		<dt>Holiday hours (OnTrack):</dt>
		<dd>
			{calc.onTrackHolidayHours} / {calc.contractHolidayHours} ({ratioPercent(
				calc.onTrackHolidayHours,
				calc.contractHolidayHours
			)}%)
            <br/>
            ({calc.onTrackHolidayWorkValue} work hours for every 1 holiday hour)
		</dd>
	</dl>
</section>

<style>
    section {
        margin-bottom: 2em;
        padding: 1em;
    }

	dl {
        display: flex;
        flex-flow: row wrap;
        color: black;
        background: white;
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
	section {
		border-radius: 5px;
		border: 1px solid #898989;
	}
</style>
