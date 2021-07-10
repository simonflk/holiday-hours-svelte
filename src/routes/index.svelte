<script>
	import Calculator from '$lib/components/calculator.svelte';

	let customHours = 37.5;
    let contractMonths = 12
</script>

<label>
    Contract months ({contractMonths}):
    <input type="range" bind:value={contractMonths} min={1} max={12} step={1}/>
</label>

<Calculator name="Simon" hoursPerWeek={32} {contractMonths}/>

<Calculator name="Mary" hoursPerWeek={(7.5 / 2) * 5} {contractMonths}/>

<Calculator name="Esteban" hoursPerWeek={7.5} {contractMonths} />


<label>
    Custom hours ({customHours}):
    <input type="range" bind:value={customHours} min={1} max={37.5} step={0.5} />
</label>
<Calculator name="Federico" hoursPerWeek={customHours} />

<style>
	input[type='range'] {
		width: 100%;
	}
</style>
