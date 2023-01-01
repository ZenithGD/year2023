import { StatusCodes } from 'http-status-codes'
import * as mongoDB from "mongodb";
import { ObjectId } from 'mongodb';
import Postcard from "../models/postcard";
import postcardRepo from "../repos/postcardRepo";

export const collections: { postcards?: mongoDB.Collection } = {}

async function getAllPostcards() {
    try {
        let postcards = await postcardRepo.findAll()
        return { status : StatusCodes.OK, result : postcards }
    } catch ( e : any ) {
        return { status : StatusCodes.BAD_REQUEST, result : e.message }
    }
}

async function insertPostcard(author : string, content : string, sticker : number) {

    if ( author === null || content === null || sticker === null ) {
        return { status : StatusCodes.BAD_REQUEST, result : { error : "Enter a valid author, content and name" } }
    }

    try {
        const result = await postcardRepo.insert(author, content, sticker)
        return { status : StatusCodes.CREATED, result : { postcardUrl : `/api/postcard/${result.insertedId}` } }
    } catch ( e : any ) {
        return { status : StatusCodes.BAD_REQUEST, result : { error : e.message } }
    }
}

async function getPostcardByID(id : string) {
    if ( id === null ) {
        return { status : StatusCodes.BAD_REQUEST, result : { error : "Enter a valid id" } }
    }

    try {
        const result = await postcardRepo.findByID(new ObjectId(id))
        if ( result )
            return { status : StatusCodes.OK, result }
        else
            return { status : StatusCodes.NOT_FOUND, result : { error : `[${id}] postcard not found.`}}
    } catch ( e : any ) {
        return { status : StatusCodes.BAD_REQUEST, result : { error : e.message } }
    }
}

async function likePostcard(id : string) {
    if ( id === null ) {
        return { status : StatusCodes.BAD_REQUEST, result : { error : "Enter a valid id" } }
    }

    try {
        const result = await postcardRepo.incrementLike(new ObjectId(id), 1)
        if ( result )
            return { status : StatusCodes.OK, result }
        else
            return { status : StatusCodes.NOT_FOUND, result : { error : `[${id}] postcard not found.`}}
    } catch ( e : any ) {
        return { status : StatusCodes.BAD_REQUEST, result : { error : e.message } }
    }
}

let postcardController = {
    getAllPostcards,
    getPostcardByID,
    insertPostcard,
    likePostcard
}

export default postcardController