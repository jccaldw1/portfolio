import { routes } from '$lib/route-configuration';
import { expect, test } from '@playwright/test';

test('make sure all pages in route configuration are accessible', async ({page}) => {
	// This cannot be done in <array>.forEach(async () => {}), possibly because of async function wrapped in an async function.
	for(let i = 0; i < routes.length; i++){
		console.log(routes[i]);
		let response = await page.goto(`/${routes[i]}`);
		expect(response).not.toBeNull();
		if(response !== null){
			console.log(response.status());
			expect(response.status()).not.toBe(404);
		}
	}
});