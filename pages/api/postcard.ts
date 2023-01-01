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