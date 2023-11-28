import { AddChristmasItem, ChangeGottenStatus, GetChristmasPresentsForName, GetChristmasPresentsNameCanGet } from "$lib/server/christmas-model/ChristmasController";
import type { RequestEvent } from "./$types";

/** @type {import('./$types').Actions} */
export const actions = {
    AddChristmasPresent: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let nameId: string | undefined = event.cookies.get('nameId')?.toString()
        let gift: string | undefined = formdata.get('gift')?.toString();
        if (nameId !== undefined && gift !== undefined)
            await AddChristmasItem(gift, nameId);
    }
}