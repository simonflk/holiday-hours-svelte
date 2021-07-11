<script>
    import { assets } from '$app/paths';
</script>

<svelte:head>
    <link rel="stylesheet" href={ `${assets}/style.css`}/>
</svelte:head>

<header>
	<h1><a href="/">Holiday Hours</a></h1>
</header>

<main>
	<slot></slot>
</main>

<footer>&copy; Simon Flack 2021</footer>


<style>
    h1 a {
        color: inherit;
    }
</style>
