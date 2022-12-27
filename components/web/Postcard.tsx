import React from 'react'
import { FaHeart, FaHeartBroken } from 'react-icons/fa'

interface PostcardProps {
    author: string,
    content: string,
    sticker: number,
    likes: number
}

function Postcard(props: PostcardProps) {

    return (
        <div className="w-full text-sm backdrop-blur-md bg-green-400/10 rounded-b-md shadow-md hover:scale-105 transition-transform duration-150">
            <div className="bg-white py-2 px-4 flex justify-between items-center gap-2 rounded-t-md text-green-800">
                <p className="font-bold">Postal de {props.author}</p>
                <div className='bg-green-100 rounded-full flex gap-2 py-1 px-2 items-center z-10'>
                    <FaHeart />
                    <p>{props.likes}</p>
                </div>
            </div>
            <div className='p-4'>
                <p className="truncate text-ellipsis">{props.content}</p>
                <p className="truncate text-ellipsis">{props.sticker}</p>
            </div>
        </div>
    )
}

export default Postcard