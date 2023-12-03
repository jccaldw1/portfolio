import type { Handle } from '@sveltejs/kit'
import { GetChristmasUserGivenId } from '$lib/server/christmas-model/ChristmasController'

export const handle: Handle = async ({event, resolve}) => {
    const userId = event.cookies.get('id')
    if (userId === undefined) {
        return await resolve(event)
    }

    const userName = await GetChristmasUserGivenId(userId)

    if (userName === undefined) {
        return await resolve(event)
    }

    event.locals.username = userName;

    event.cookies.set('userName', userName)

    const response = await resolve(event)
    response.headers.set('x-custom-header', 'you are a big fat jerk')

    return response;
}