import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { FaHeart, FaHeartBroken } from 'react-icons/fa'

interface StickerData {
    name : string,
    source : StaticImageData
}

interface PostcardProps {
    author: string,
    content: string,
    sticker: StickerData,
    likes: number,
}

function PostcardPreview(props: PostcardProps) {

    return (
        <div className='relative flex justify-center hover:scale-105 transition-transform duration-150'>
            <div className="overflow-hidden flex flex-col w-full text-sm backdrop-blur-md bg-green-400/10 rounded-b-md shadow-md">
                <div className="flex-1 bg-white py-2 px-4 flex justify-between items-center gap-2 rounded-t-md text-green-800">
                    <p className="font-bold">Postal de {props.author}</p>
                    <div className='bg-green-100 rounded-full flex gap-2 py-1 px-2 items-center z-10'>
                        <FaHeart />
                        <p>{props.likes}</p>
                    </div>
                </div>
                <p className="flex-1 p-4 truncate text-ellipsis overflow-hidden break-all">{props.content}</p>
            </div>
            <div className='absolute top-0 -translate-y-2/3 border-white border-4 bg-green-400 p-2 rounded-full'>
                <Image src={props.sticker.source} alt={props.sticker.name} width={30}/>
            </div>
        </div>
    )
}

export default PostcardPreview