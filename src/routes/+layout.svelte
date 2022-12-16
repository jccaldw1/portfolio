<script>
    import { page } from '$app/stores'
</script>

<div class="app">
    <div>
        <p>
            This is a header.
        </p>
        {#if $page.route.id !== "/"}
            <a href="/">Go home.</a>
        {/if}
    </div>



    <main>
        <slot/>
    </main>

    <footer>
        <p>Check out my <a href="https://github.com/jccaldw1">GitHub</a></p>
    </footer>
</div>