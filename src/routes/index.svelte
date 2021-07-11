<script>
	import TopTrump from '$lib/components/TopTrump.svelte';
	import CalculationExplanation from '$lib/components/CalculationExplanation.svelte';

	let customHours = 37.5;
	let contractMonths = 12;
</script>

<label>
	Contract months ({contractMonths}):
	<input type="range" bind:value={contractMonths} min={1} max={12} step={1} />
</label>

<div class="cards">
	<a href="/foo">
		<TopTrump name="Simon" hoursPerWeek={32} {contractMonths} />
	</a>
	<a href="/foo">
		<TopTrump name="Mary" hoursPerWeek={(7.5 / 2) * 5} {contractMonths} />
	</a>

	<a href="/foo">
		<TopTrump name="Esteban" hoursPerWeek={7.5} {contractMonths} />
	</a>

	<a href="/foo">
		<label>
			Custom hours ({customHours}):
			<input type="range" bind:value={customHours} min={1} max={37.5} step={0.5} />
		</label>
		<TopTrump name="Federico" hoursPerWeek={customHours} {contractMonths} />
	</a>
</div>
<CalculationExplanation name="Simon" hoursPerWeek={32} {contractMonths} />

<style>
	input[type='range'] {
		width: 100%;
	}

	.cards {
		display: flex;
		/* flex-wrap: wrap; */
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
		transform: scale(1.1) rotate(1deg);
        z-index: 1000;
	}
</style>
