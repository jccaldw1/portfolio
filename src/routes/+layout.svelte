<script>
    import { page } from "$app/stores";
    import { routes } from "$lib/route-configuration";
    import "@picocss/pico/css/pico.css";
</script>

<head>
    <link rel="stylesheet" href="css/pico.min.css" />
</head>

<div class="app container">
    <div class="grid">
        <div align="left">
            {#if $page.route.id !== "/"}
                <a href="/">Go home.</a>
            {/if}
        </div>
        <div align="right">
            <div class="grid">
                {#each routes as route}
                    <!-- <button><a href="/{route}">{route}</a></button>&emsp; -->
                    <!-- <button>{route}</button>&emsp; -->
                    <a href="/{route}">{route}</a>&emsp;
                {/each}
            </div>
        </div>
    </div>

    <main>
        <slot />
    </main>

    <footer>
        <p>Check out my <a href="https://github.com/jccaldw1">GitHub</a></p>
    </footer>
</div>
