<script lang="ts">
    import Unauthenticated from './Unauthenticated.svelte';
    import ChristmasList from './ChristmasList.svelte';
    import type { PageData } from './$types';

    export let data: PageData
</script>

<div>
    {#if !data || !data.username}
        <Unauthenticated/>
    {:else}
        <ChristmasList userName={data.username}/>
    {/if}
</div>