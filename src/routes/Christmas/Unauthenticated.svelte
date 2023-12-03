<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
</script>

<div>
    <form method="POST" action="?/Authenticate">
        Please enter your password
        <input name="password" type="password"/>
        <button>Authenticate</button>
    </form>
</div>