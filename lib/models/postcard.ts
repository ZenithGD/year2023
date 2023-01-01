import { ObjectId } from "mongodb";

export default interface Postcard {
    author: string, 
    content: string, 
    sticker: number, 
    likes: number,
    validated: boolean,
    accepted: boolean,
    _id: ObjectId
}