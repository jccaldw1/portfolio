<script>
    import { page } from "$app/stores";
    import { routes } from "$lib/route-configuration";
    import "@picocss/pico/css/pico.css";
</script>

<head>
    <link rel="stylesheet" href="css/pico.min.css" />
</head>

<div class="app">
    <div class="container-fluid">
        <div class="grid">
            <!-- logo -->
            <div />
            <div align="left">
                {#if $page.route.id !== "/"}
                    <a role="button" class="outline" href="/">Go home.</a>
                {/if}
            </div>
            <div align="right">
                <div class="grid">
                    {#each routes as route}
                        <!-- <button><a href="/{route}">{route}</a></button>&emsp; -->
                        <!-- <button>{route}</button>&emsp; -->
                        <a role="button" class="outline" href="/{route}"
                            >{route}</a
                        >&emsp;
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <main>
            <slot />
        </main>

        <footer>
            <p>Check out my <a href="https://github.com/jccaldw1">GitHub</a></p>
        </footer>
    </div>
</div>
