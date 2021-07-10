<script>
    import { assets } from '$app/paths';
</script>

<svelte:head>
    <link rel="stylesheet" href={ `${assets}/style.css`}/>
</svelte:head>

<header>
	<h1>Holiday Hours</h1>
</header>

<main>
	<slot></slot>
</main>

<footer>&copy; Simon Flack 2021</footer>
