import { MongoClient, Db, type InsertOneResult } from "mongodb";
import { MONGO_DB_URI } from "$lib/server/secrets";
import { ObjectId } from "mongodb";
import ChristmasPresent from "./ChristmasPresent";
import type ChristmasPassword from "./ChristmasPassword";

const client = new MongoClient(MONGO_DB_URI)

async function AddChristmasItem(gift: string, nameId: string) {
    await client.connect();
    let database: Db = client.db('Users');
    let christmasPresents = database.collection<ChristmasPresent>('Christmas Presents')

    const query = {_id: new ObjectId(nameId)}

    let christmasUser = await database.collection<ChristmasPassword>('Christmas Passwords').findOne<ChristmasPassword>(query);

    const name = christmasUser?.name;

    let insertOneResult: InsertOneResult<ChristmasPresent> = await christmasPresents.insertOne(new ChristmasPresent({
        name: name,
        gift: gift,
        gotten: false
    }))

    if (insertOneResult.acknowledged) {
        console.log("item successfully added!")
    } else {
        console.log("item not successfully added :(")
    }
}

/**
 * Gets all the Christmas presents that the passed user is capable of giving to others.
 */
async function GetChristmasPresentsNameCanGet(name: string) {
    await client.connect();
    let database: Db = client.db('Users');
    let christmasPresents = database.collection<ChristmasPresent>('Christmas Presents')

    const query = {name: {$ne: name}}

    let presents = await christmasPresents.find<ChristmasPresent[]>(query)

    return presents
}

/**
 * Gets the Christmas presents that this name is requesting.
 * @remarks The user should not receive the 'gotten' attribute for their presents.
 */
async function GetChristmasPresentsForName(name: string){
    await client.connect();
    let database: Db = client.db('Users');
    let christmasPresents = database.collection<ChristmasPresent>('Christmas Presents')

    const query = {name: name}

    let presents = await christmasPresents.find<ChristmasPresent[]>(query).project({name: 1, gift: 1})

    return presents
}

async function ChangeGottenStatus(name: string, gift: string, newGottenStatus: boolean) {
    await client.connect();
    let database: Db = client.db('Users');
    let christmasPresents = database.collection<ChristmasPresent>('Christmas Presents')

    const query = {name: name, gift: gift}

    const updateDoc = {
        $set: {
            gotten: newGottenStatus
        }
    }

    let result = await christmasPresents.updateMany(query, updateDoc);

    console.log(result)

    return result
}

async function AuthenticateChristmasUser(password: string) {
    await client.connect();
    let database: Db = client.db('Users');
    let christmasPasswords = database.collection<ChristmasPassword>('Christmas Passwords');

    const query = {password: password};

    const passwordQueryResult: ChristmasPassword | null = await christmasPasswords.findOne(query);

    if (passwordQueryResult === null) {
        return null;
    } else {
        return passwordQueryResult._id;
    }
}

async function GetChristmasUserGivenId(id: string) {
    await client.connect();
    let database: Db = client.db('Users');
    let christmasPasswords = database.collection<ChristmasPassword>('Christmas Passwords');

    const query = {_id: new ObjectId(id)};

    const userQueryResult: ChristmasPassword | null = await christmasPasswords.findOne(query)

    if (userQueryResult === null) {
        return undefined;
    } else {
        return userQueryResult.name;
    }
}

export { GetChristmasPresentsForName, GetChristmasUserGivenId, GetChristmasPresentsNameCanGet, AddChristmasItem, AuthenticateChristmasUser, ChangeGottenStatus }