import { MongoClient } from "mongodb";
import { DB_URI } from "$lib/secrets";
import * as bcrypt from "bcrypt";
import { User } from "../authentication-model/User";
const client = new MongoClient(DB_URI)

async function AddBasicUser(username: string, password: string) {
    await client.connect();
    let database = client.db('Users');
    let collection = database.collection<User>('Users');

    const saltRounds: number = 10;

    bcrypt.hash(password, saltRounds, async function (err: Error | undefined, hash: string) {
        if (err) {
            // TODO: log to an error table in mongodb
            return;
        }

        let insertOneResult = await collection.insertOne(new User({
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
    let collection = database.collection<User>('Users');

    const query = { username: "jacob4" };
    let userInDatabase = await collection.findOne<User>(query);

    if (userInDatabase !== null) {
        let userAuthResult = await bcrypt.compare("jacob4", userInDatabase.hashedpassword);
        // add session token with expiry time
    }
}

async function AddUserWithCustomRoles() {
    throw new Error("nto implemented");
}

export { AddBasicUser, AuthenticateUser }
