import React from 'react'
export interface PostcardProps {
    author: string,
    content: string,
    sticker: number
}

function Postcard(props: PostcardProps) {
    return (
        <div className="w-full h-full text-sm backdrop-blur-md bg-green-400/10 rounded-b-md shadow-md hover:scale-105 transition-transform duration-150">
            <div className="bg-white py-2 px-4 flex justify-center items-center gap-2 rounded-t-md">
                <p className="text-green-800 font-bold">{props.author}</p>
            </div>
            <div className='p-4'>
                <p>{props.content}</p>
                <p>{props.sticker}</p>
            </div>
        </div>
    )
}

export default Postcard