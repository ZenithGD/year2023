import React, { useState, useEffect } from 'react'
import { FaArrowCircleLeft, FaHeart } from 'react-icons/fa'
import Postcard from '../../lib/models/postcard'
import stickers from '../../lib/models/stickers'
import Image from 'next/image'
import postcardService from '../../lib/services/postcardService'
import { ObjectId } from 'mongodb'
import { toast } from 'react-hot-toast'
import { useSWRConfig } from 'swr'
interface PostcardDetailProps {
    postcard: any,
    onClose: () => void
};

function PostcardDetail(props: PostcardDetailProps) {

    const { mutate } = useSWRConfig()
    const [ liked, setLiked ] = useState(false)

    useEffect(() => {
        setLiked(localStorage.getItem(props.postcard._id) !== null)
    }, [])

    const handleLike = (e : any) => {
        e.preventDefault()
        
        postcardService.likePostcard(props.postcard._id)
        .then((r) => {
            mutate('/api/postcards');

            // very dirty, but avoids having to store identification data on server side
            localStorage.setItem(props.postcard._id, "l")

            setLiked(true)
        })
        .catch((e) => {
            toast.error("Ha habido un error :(")
        })

    }

    return (
        <div className='relative p-8 w-full h-full flex flex-col'>
            <div className='flex lg:flex-row flex-col justify-center lg:gap-8 gap-2'>
                <button
                    onClick={props.onClose}
                    className="bg-gradient-to-b from-green-500 to-green-700 py-2 px-3 text-sm font-bold flex justify-center items-center gap-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-150"
                >
                    <FaArrowCircleLeft className='text-white text-xl' />
                    <p>Volver al muro</p>
                </button>
                <button
                    disabled={liked}
                    onClick={handleLike}
                    className="disabled:bg-gray-500 enabled:bg-gradient-to-b enabled:from-pink-500 enabled:to-pink-700 py-2 px-3 text-sm font-bold flex justify-center items-center gap-2 rounded-full shadow-lg hover:scale-105 transition duration-150"
                >
                    <FaHeart className='text-white text-xl' />
                    <p>Me gusta</p>
                </button>
            </div>

            <div className="flex md:flex-row flex-col justify-center gap-8 w-full flex-grow mt-6">
                <div className='bg-green-500 lg:flex-1 grow rounded-lg h-full gap-4 p-8'>
                    <div className='flex flex-col h-full justify-between  overflow-hidde'>
                        <p className='whitespace-pre-wrap lg:text-xl text-base'>{props.postcard.content}</p>
                        <p className='lg:text-2xl text-xl text-center font-bold'>- {props.postcard.author} -</p>
                    </div>
                </div>
                <div className='bg-green-500 lg:flex-1 shrink rounded-lg h-full flex justify-center items-center p-8'>
                    <Image src={stickers[props.postcard.sticker].source} alt={props.postcard.author} width={200} />
                </div>
            </div>
        </div>
    )
}

export default PostcardDetail