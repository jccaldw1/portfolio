import { AddChristmasItem, AuthenticateChristmasUser, GetChristmasUserGivenId, GetChristmasPresentsForName, GetChristmasPresentsNameCanGet } from "$lib/server/christmas-model/ChristmasController";
import type { RequestEvent } from "./$types";

export const load = async ({locals}) => {
    let gifts;
    let returnObject;
    if (locals.username !== undefined) {
        gifts = (await GetChristmasPresentsForName(locals.username)).map(({_id, ...keepAttrs}) => keepAttrs);
        console.log(gifts)
    }
    if (gifts !== undefined) {
        returnObject = {
            username: locals.username,
            gifts: gifts
        }
    } else {
        returnObject = {
            username: locals.username
        }
    }
    return returnObject;
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