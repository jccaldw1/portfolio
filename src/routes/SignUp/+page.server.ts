import { AddBasicUser, AuthenticateUser, CreateSignedJwtToken, VerifyJwtToken } from "$lib/server/mongodb/AddUser";
import type { RequestEvent } from "./$types";

/** @type {import('./$types').Actions} */
export const actions = {
    addNewUser: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let user = formdata.get('username')?.valueOf().toString();
        let pass = formdata.get('password')?.valueOf().toString();
        if (user !== undefined && pass !== undefined)
            await AddBasicUser(user, pass);
    },
    AuthenticateUser: async (event: RequestEvent) => {
        let formdata = await event.request.formData();
        let user: string = formdata.get('username')?.toString() ?? "";
        let pass: string = formdata.get('password')?.toString() ?? "";
        let authenticationResponse: boolean = false;
        if (user !== undefined && pass !== undefined)
            authenticationResponse = await AuthenticateUser(user, pass);

        if (authenticationResponse) {
            // add a signed jwt cookie
            event.cookies.set('signed-token', await CreateSignedJwtToken(user))
        }
    },
    VerifyAuthentication: async(event: RequestEvent) => {
        let userJwtToken = event.cookies.get('signed-token') ?? ":)";
        if (userJwtToken === undefined){
            // user is not authenticated
            return false;
        }
        await VerifyJwtToken(userJwtToken);
        // user is authenticated
    }
}