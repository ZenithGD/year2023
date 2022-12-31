// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import postcardController from '../../lib/controllers/postcardController'

export default async function postcardHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    switch ( req.method ) {
        case "GET":
        {
            const { status, result } = await postcardController.getPostcardByID( new ObjectId(req.query.id as string) ) 
            res.status(status).json(result)
            return
        }
        case "POST":
        {
            const { author, content, sticker } = JSON.parse(req.body)
            const { status, result } = await postcardController.insertPostcard(author, content, sticker) 
            res.status(status).json(result)
            return   
        }
        default:
            res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
                relativePath: "/api/postcard",
                get : {
                    relativePath: "/{id}",
                    param : {
                        id : "number"
                    }
                },
                post : {
                    params : {
                        author : "string",
                        content : "string",
                        sticker : "number"
                    }
                }
            })
    }
}