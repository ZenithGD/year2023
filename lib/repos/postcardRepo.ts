import { MongoClient, ObjectId } from "mongodb";
import Postcard from "../models/postcard";

let mongo = new MongoClient(process.env.MONGODB_URI!, {});

/**
 * Get all postcards
 * @returns All postcards in the postcard collection
 */
async function findAll() {
    const client = await mongo.connect();
    const db = client.db(process.env.DB_NAME!);

    const postcards = await db
        .collection<Postcard>(process.env.POSTCARDS_COLLECTION_NAME!)
        .find({ validated : true, accepted : true })
        .sort({ "likes" : -1 })
        .toArray()

    return postcards
}

/**
 * Find a postcard by id
 * @param id The postcard id
 * @returns The postcard object, or null if it doesn't exist
 */
async function findByID(id : ObjectId) {
    const client = await mongo.connect();
    const db = client.db(process.env.DB_NAME!);

    const postcard = await db
        .collection<Postcard>(process.env.POSTCARDS_COLLECTION_NAME!)
        .findOne({ _id : id })
        
    return postcard
}

/**
 * Insert a new postcard
 * @param author The author of the postcard
 * @param content The postcard contents
 * @param sticker The sticker number 
 * @returns The inserted postcard
 */
async function insert(author : string, content : string, sticker : number) {
    const client = await mongo.connect();
    const db = client.db(process.env.DB_NAME!);

    const result = await db
        .collection<Postcard>(process.env.POSTCARDS_COLLECTION_NAME!)
        .insertOne({
            author,
            content,
            sticker,
            likes : 0,
            validated : false,
            accepted : false
        })

    return result
}


async function incrementLike(id : ObjectId, amount : number) {
    const client = await mongo.connect();
    const db = client.db(process.env.DB_NAME!);

    console.log(id)

    return await db
        .collection<Postcard>(process.env.POSTCARDS_COLLECTION_NAME!)
        .updateOne(
        { _id: id },
        { $inc: { likes: amount }, }
    )
}

let postcardRepo = {
    findAll,
    findByID,
    insert,
    incrementLike
}

export default postcardRepo
