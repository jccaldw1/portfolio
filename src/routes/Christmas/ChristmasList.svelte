<script lang="ts">
    export let userName: string;
</script>

<div>
    You are the user {userName}!!
    <form method="POST" action="?/Logout">
        <button>Log out</button>
    </form>
</div>