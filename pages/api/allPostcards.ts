// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StatusCodes } from 'http-status-codes'
import type { NextApiRequest, NextApiResponse } from 'next'
import postcardController from '../../lib/controllers/postcardController'

export default async function allPostcardsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    switch ( req.method ) {
        case "GET":
        {
            const { status, result } = await postcardController.getAllPostcards() 
            res.status(status).json(result)
            return
        }
        default:
            res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
                relativePath: "/api/postcards",
                get : {},
            })
    }
}
