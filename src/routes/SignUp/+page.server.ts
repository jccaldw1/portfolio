import { AddBasicUser, AuthenticateUser } from "$lib/server/mongodb/AddUser";
import type { RequestEvent } from "./$types";

/** @type {import('./$types').Actions} */
export const actions = {
    addNewUser: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let user = formdata.get('username')?.valueOf().toString();
        let pass = formdata.get('username')?.valueOf().toString();
        if (user !== undefined && pass !== undefined)
            await AddBasicUser(user, pass);
    },
    AuthenticateUser: async (event: RequestEvent) => {
        await AuthenticateUser("jacob4", "jacob4");
    }
};