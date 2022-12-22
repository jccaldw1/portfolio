import { routes } from '$lib/route-configuration';
import { expect, test } from '@playwright/test';

test('make sure all pages in route configuration are accessible', async ({page}) => {
	// This cannot be done in <array>.forEach(async () => {}), possibly because of async function wrapped in an async function.
	for(let i = 0; i < routes.length; i++){
		let response = await page.goto(`/${routes[i]}`);
		expect(response).not.toBeNull();
		if(response !== null){
			expect(response.status()).not.toBe(404);
		}
	}
});

//TODO: test that adds and removes a user to/from the database to verify db connection works.