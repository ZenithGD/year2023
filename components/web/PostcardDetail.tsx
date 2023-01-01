import React from 'react'
import { FaArrowCircleLeft, FaHeart } from 'react-icons/fa'
import Postcard from '../../lib/models/postcard'
import stickers from '../../lib/models/stickers'
import Image from 'next/image'
import postcardService from '../../lib/services/postcardService'

interface PostcardDetailProps {
    postcard: Postcard,
    onClose: () => void
};

function PostcardDetail(props: PostcardDetailProps) {

    const handleLike = (e : any) => {
        e.preventDefault()
        postcardService.likePostcard(props.postcard.id!.toHexString())
    }

    return (
        <div className='relative p-8 w-full h-full flex flex-col'>
            <div className='flex justify-center'>
                <button
                    onClick={props.onClose}
                    className="bg-gradient-to-b from-green-500 to-green-700 py-2 px-3 text-sm font-bold flex justify-center items-center gap-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-150"
                >
                    <FaArrowCircleLeft className='text-white text-xl' />
                    <p>Volver al muro</p>
                </button>
                <button
                    onClick={handleLike}
                    className="bg-gradient-to-b from-pink-500 to-pink-700 py-2 px-3 text-sm font-bold flex justify-center items-center gap-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-150"
                >
                    <FaHeart className='text-white text-xl' />
                    <p>Me gusta</p>
                </button>
            </div>

            <div className="flex md:flex-row flex-col justify-center gap-8 w-full flex-grow mt-6">
                <div className='bg-green-500 flex-1 rounded-lg h-full gap-4 p-8'>
                    <div className='flex flex-col h-full justify-between'>
                        <p className='whitespace-pre-wrap lg:text-xl text-base'>{props.postcard.content}</p>
                        <p className='text-2xl text-center font-bold'>- {props.postcard.author} -</p>
                    </div>
                </div>
                <div className='bg-green-500 flex-1 rounded-lg h-full flex justify-center items-center p-8'>
                    <Image src={stickers[props.postcard.sticker].source} alt={props.postcard.author} width={300} />
                </div>
            </div>
        </div>
    )
}

export default PostcardDetail