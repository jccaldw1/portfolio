import { MongoClient } from "mongodb";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto"
import User from "../authentication-model/User";
import Session from "../authentication-model/Session";
import { MONGO_DB_URI } from "$lib/secrets";

const client = new MongoClient(MONGO_DB_URI);

async function AddBasicUser(username: string, password: string) {
	await client.connect();
	let database = client.db('Users');
	let users = database.collection<User>('Users');

	const saltRounds: number = 10;

	bcrypt.hash(password, saltRounds, async function (err: Error | undefined, hash: string) {
		if (err) {
			// TODO: log to an error table in mongodb
			return;
		}

		let insertOneResult = await users.insertOne(new User({
			username: username,
			hashedpassword: hash
		}));

		// TODO: log success/failure or something
		if (insertOneResult.acknowledged) {
			console.log("acknowledged!");
		} else {
			console.log("not acknowledged!");
		}
	});
}

async function AuthenticateUser(username: string, plainTextPassword: string) {
	await client.connect();
	let database = client.db('Users');
	let users = database.collection<User>('Users');

	const query = { username: username };
	let userInDatabase = await users.findOne<User>(query);

	if (userInDatabase !== null) {
		let userAuthResult = await bcrypt.compare(plainTextPassword, userInDatabase.hashedpassword);

		if (!userAuthResult) {
			// Send back error response
			// exit
			return;
		}

		const sessionToAdd = new Session({
			sessionCookie: randomUUID(),
			sessionGrantTime: new Date(),
			sessionGoodDuration: 1000
		});

		const sessionUpdate = {
			$set: {
				session: sessionToAdd
			}
		};

		// add session token
		await users.updateOne(query, sessionUpdate);

		// make record of session
		let sessions = database.collection<Session>('Sessions');
		await sessions.insertOne(sessionToAdd);
	}
}

async function AddUserWithCustomRoles() {
	throw new Error("nto implemented");
}

export { AddBasicUser, AuthenticateUser }
