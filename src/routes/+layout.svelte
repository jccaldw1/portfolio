<script>
    import { page } from "$app/stores";
    import { routes } from "$lib/route-configuration";
    
    let buttonClasses = "rounded-full bg-slate-700 p-2 mx-2 border";

    /**
     * A div with this class will push other divs to the center of the screen by this margin.
     * Divs with this class should have ONLY this class.
     * @type {string}
    */
    let spacingClass = "basis-1/5";
</script>

<div class="app">
    <!-- navbar -->
        <!-- logo (tbd)-->

    <div class="flex flex-row justify-end bg-slate-900 sticky top-0 py-3">
        <div class={spacingClass}/>

        {#if $page.route.id !== "/"}
            <a role="button" class={buttonClasses} href="/">Go home.</a>
        {/if}

        {#each routes as route}
            <a role="button" class={buttonClasses} href="/{route}">{route}</a>&emsp;
        {/each}

        <div class={spacingClass}/>
    </div>

    <div class="flex flex-row">
        <div class={spacingClass}/>

        <main>
            <slot />
        </main>

        <div class={spacingClass}/>
    </div>

    <div class="flex flex-row">
        <div class={spacingClass}/>

        <footer>
            <p>Check out my <a href="https://github.com/jccaldw1">GitHub</a></p>
        </footer>

        <div class={spacingClass}/>
    </div>
</div>