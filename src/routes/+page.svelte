<script>
    import { routes } from "$lib/route-configuration";
</script>

<h1>Welcome to Jacob's Website</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<!-- <a href="/Resume">Resume</a>
<a href="/About">About</a> -->
{#each routes as route}
    <a href="/{route}">{route}</a>
{/each}