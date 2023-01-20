import { AddBasicUser, AuthenticateUser, CreateSignedJwtToken, VerifyJwtToken } from "$lib/server/authentication-model/AuthenticationController";
import type { RequestEvent } from "./$types";

/** @type {import('./$types').Actions} */
export const actions = {
    AddNewUser: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let user: string | undefined = formdata.get('username')?.toString();
        let pass: string | undefined = formdata.get('password')?.toString();
        if (user !== undefined && pass !== undefined)
            await AddBasicUser(user, pass);
    },
    AuthenticateUser: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let user: string | undefined = formdata.get('username')?.toString();
        let pass: string | undefined = formdata.get('password')?.toString();
        if (user !== undefined && pass !== undefined) {
            if ((await AuthenticateUser(user, pass))) {
                // add a signed jwt cookie
                event.cookies.set('signed-token', await CreateSignedJwtToken(user))
            }
        }
    },
    VerifyAuthentication: async (event: RequestEvent) => {
        let userJwtToken: string | undefined = event.cookies.get('signed-token') ?? undefined;
        if (userJwtToken === undefined) {
            // user is not authenticated
            return false;
        }
        await VerifyJwtToken(userJwtToken);
        // user is authenticated
    }
}