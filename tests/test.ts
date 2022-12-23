import { routes } from '$lib/route-configuration';
import { expect, test } from '@playwright/test';
import { MONGO_DB_URI } from '$lib/secrets';
import { MongoClient } from 'mongodb';
import User from '$lib/server/authentication-model/User';
import { sortUserPlugins } from 'vite';

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
test('verify db connection is good', async () => {
	console.log(`mongo: ${MONGO_DB_URI}`);

	const client = new MongoClient(MONGO_DB_URI);

	await client.connect();
	let database = client.db('Users');
	let users = database.collection<User>('Users');

	let testAddUser = await users.insertOne(new User({
		username: "testUser",
		hashedpassword: "testPass"
	}));

	expect(testAddUser).toBeTruthy();

	const deleteQuery = { username: "testUser" };

	let testRemoveUser = await users.deleteOne(deleteQuery);

	expect(testRemoveUser.acknowledged).toBeTruthy();
})