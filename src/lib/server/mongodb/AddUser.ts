import { MongoClient } from "mongodb";
import * as bcrypt from "bcrypt";
import User from "../authentication-model/User";
import { jwtSecret as jwtSecret, MONGO_DB_URI } from "$lib/server/secrets";
import base64url from "base64url";
import "jsonwebtoken";
import { JsonWebTokenError, sign, verify } from "jsonwebtoken";

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

async function AuthenticateUser(username: string, plainTextPassword: string): Promise<boolean> {
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
			return false;
		}
	}

	return true;
}

async function CreateSignedJwtToken(username: string): Promise<string> {
	let jwtHeader: object = {
		"alg": "HS256",
		"typ": "jwt"
	};

	let jwtPayload: object = {
		"username": username,
		"admin": false
	};

	let encodedJwtHeader = base64url(JSON.stringify(jwtHeader));
	let encodedJwtPayload = base64url(JSON.stringify(jwtPayload));
	let encodedToken = `${encodedJwtHeader}.${encodedJwtPayload}`;

	let signedToken = sign(encodedToken, jwtSecret);

	return signedToken;
}

async function VerifyJwtToken(jwtToken: string): Promise<boolean> {
	let jwtTokenBody;
	try {
		jwtTokenBody = verify(jwtToken, jwtSecret);
		console.log(`verify succeeds`);
	} catch (e) {
		if (e instanceof JsonWebTokenError) {
			// log attack
			console.log('attack');
		} else {
			// log error
			console.log(`error: ${e}`);
		}
		return false;
	}

	// If there was no error, the token was handed out by the server.
	// TODO: add more criteria - how long since the token was handed out, verify jwt body matches, etc.
	return true;
}

export { AddBasicUser, AuthenticateUser, CreateSignedJwtToken, VerifyJwtToken }

