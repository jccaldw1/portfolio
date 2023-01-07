<script>
    import { page } from "$app/stores";
    import { routes } from "$lib/route-configuration";

    import "../app.css";
</script>

<div class="app">
    <div>
        {#if $page.route.id !== "/"}
            <a href="/">Go home.</a>
        {/if}
        {#each routes as route}
            <a href="/{route}">{route}</a>
        {/each}
    </div>

    <h1 class="text-3xl font-bold underline">Hello world!</h1>

    <main>
        <slot />
    </main>

    <footer>
        <p>Check out my <a href="https://github.com/jccaldw1">GitHub</a></p>
    </footer>
</div>
