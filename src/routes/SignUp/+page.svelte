<div>
    <form method="POST" action="?/addNewUser">
        <label>
            Username
            <input name="username" type="username" />
        </label>
        <label>
            Password
            <input name="password" type="password" />
        </label>
        <button>Add new user</button>
    </form>
    <form method="POST" action="?/AuthenticateUser">
        <label>
            Username
            <input name="username" type="username" />
        </label>
        <label>
            Password
            <input name="password" type="password" />
        </label>
        <button>Authenticate</button>
    </form>
</div>