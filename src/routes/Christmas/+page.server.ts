import { AddChristmasItem, AuthenticateChristmasUser, GetChristmasUserGivenId } from "$lib/server/christmas-model/ChristmasController";
import type { RequestEvent } from "./$types";

export const load = ({locals}) => {
    return {username: locals.username}
};

/** @type {import('./$types').Actions} */
export const actions = {
    AddChristmasPresent: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let nameId: string | undefined = event.locals.username?.toString()
        let gift: string | undefined = formdata.get('gift')?.toString();
        if (nameId !== undefined && gift !== undefined)
            await AddChristmasItem(gift, nameId);
    },
    Authenticate: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let password: string | undefined = formdata.get('password')?.toString();
        if (password !== undefined) {
            let id = await AuthenticateChristmasUser(password)
            if (id !== null) {
                let username = await GetChristmasUserGivenId(id.toString());
                if (username !== undefined)
                    event.locals.username = username
            }
        }
    },
    Logout: async (event: RequestEvent) => {
        event.locals.username = undefined;
    }
}