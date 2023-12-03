import { AddChristmasItem, AuthenticateChristmasUser, ChangeGottenStatus, GetChristmasPresentsForName, GetChristmasPresentsNameCanGet, GetChristmasUserGivenId } from "$lib/server/christmas-model/ChristmasController";
import type { PageServerLoad, RequestEvent } from "./$types";

export const load = ({locals}) => {
    return {username: locals.username}
};

/** @type {import('./$types').Actions} */
export const actions = {
    AddChristmasPresent: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let nameId: string | undefined = event.cookies.get('nameId')?.toString()
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
                event.cookies.set('id', id.toString());
            }
        }
    }
}