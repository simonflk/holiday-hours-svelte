<script>
	import { contractMonths } from '$lib/stores';
</script>

<div class="contract-length">
    <p>You can adjust the length of employment to see how that affects the calculations.</p>
	<label>
		Employment length (months):
		<input type="number" bind:value={$contractMonths} min={1} max={12} step={1} />
	</label>
</div>

<style>
	.contract-length {
		margin-bottom: 2em;
	}
</style>
