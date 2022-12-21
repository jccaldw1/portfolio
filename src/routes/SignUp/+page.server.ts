import { AddBasicUser, AuthenticateUser } from "$lib/server/mongodb/AddUser";
import type { RequestEvent } from "./$types";

/** @type {import('./$types').Actions} */
export const actions = {
    addNewUser: async (event: RequestEvent) => {
        console.log('addNewUser');
        console.log(event);
        let formdata = await event.request.formData();
        let user = formdata.get('username')?.valueOf().toString();
        let pass = formdata.get('username')?.valueOf().toString();
        console.log(user);
        console.log(pass);
        if (user !== undefined && pass !== undefined)
            await AddBasicUser(user, pass);

        console.log('added user');
    },
    AuthenticateUser: async (event: RequestEvent) => {
        console.log('getUser')
        await AuthenticateUser("jacob3", "plaintextpassword");
    }
};