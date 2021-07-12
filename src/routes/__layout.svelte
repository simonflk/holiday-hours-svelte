<script>
	import { assets } from '$app/paths';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="stylesheet" href={`${assets}/style.css`} />
</svelte:head>

<header>
	<h1><a href="/">Holiday Hours</a></h1>
	<nav>
		<ul>
			<li><a href="/" aria-current={$page.path === '/' ? 'page' : false}>Home</a></li>
			<li>
				<a href="/visual" aria-current={$page.path === '/visual' ? 'page' : false}>A visual guide</a
				>
			</li>
		</ul>
	</nav>
</header>

<main>
	<slot />
</main>

<footer>&copy; Simon Flack 2021</footer>

<style>
	header {
		display: flex;
	}

	@media (max-width: 500px) {
		header {
			flex-direction: column;
		}
        nav {
            margin: 0 auto;
        }
	}
	nav {
		margin-left: auto;
	}

	nav ul {
		display: flex;
		list-style: none;
        padding-inline-start: 0;
        margin-inline-start: 0;
        margin-inline-end: 0;
	}

	nav li:not(:first-child) {
		margin-left: 1.5em;
	}

	nav li:not(:first-child):before {
		content: '|';
		margin-right: 1.5em;
	}

	nav a {
		color: white;
	}

	h1 a {
		color: pink;
	}
</style>
