import { AddChristmasItem, GetChristmasPresentsForName, GetChristmasPresentsNameCanGet } from "$lib/server/christmas-model/ChristmasController";
import type { RequestEvent } from "./$types";

/** @type {import('./$types').Actions} */
export const actions = {
    AddChristmasPresent: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let gift: string | undefined = formdata.get('gift')?.toString();
        if (name !== undefined && gift !== undefined)
            await AddChristmasItem(gift, name);
    }
}