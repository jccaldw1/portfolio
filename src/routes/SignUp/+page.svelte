<div>
    <form method="POST" action="?/AddNewUser">
        <div class="grid">
            <label>
                Username
                <input name="username" type="username" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button>Add new user</button>
        </div>
    </form>
    <form method="POST" action="?/AuthenticateUser">
        <div class="grid">
            <label>
                Username
                <input name="username" type="username" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button>Authenticate</button>
        </div>
    </form>
</div>