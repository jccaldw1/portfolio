<script>
    import { page } from "$app/stores";
    import { routes } from "$lib/route-configuration";
</script>

<div class="app">
    <div class="container-fluid">
        <div class="grid">
            <!-- logo -->

            <div>
                {#if $page.route.id !== "/"}
                    <a role="button" class="outline" href="/">Go home.</a>
                {:else}
                    <div/>
                {/if}
                {#each routes as route}
                    <!-- <button><a href="/{route}">{route}</a></button>&emsp; -->
                    <!-- <button>{route}</button>&emsp; -->
                    <a role="button" class="outline" href="/{route}">{route}</a
                    >&emsp;
                {/each}
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
