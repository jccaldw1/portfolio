<script lang="ts">
    import Unauthenticated from './Unauthenticated.svelte';
    import ChristmasList from './ChristmasList.svelte';
    import type { PageData } from './$types';

    let data: PageData
</script>

<div>
    {#if data && data.username}
        <ChristmasList userName={data.username}/>
    {:else}
        <Unauthenticated/>
    {/if}
</div>