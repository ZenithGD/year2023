import React, { useState } from 'react'
import Postcard from '../components/web/Postcard'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import stickers from '../lib/models/stickers'
import postcardService from '../lib/services/postcardService'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const checkVariant = {
    show : {
        opacity : 1,
        scale : 1,
        rotate : 0,
    },
    hide : {
        rotate : 180,
        opacity : 0,
        scale : 0.5
    }
}

function Create() {

    const [author, setAuthor] = useState("Anónimo")
    const [content, setContent] = useState("")
    const [sticker, setSticker] = useState(0)

    const router = useRouter()

    const handleSubmit = (e : any) => {
        e.preventDefault()
        postcardService.postPostcard(author, content, sticker)
            .then(v => {
                toast.success("¡Se ha creado la postal correctamente!")
                router.push({
                    pathname : "/postcardWall",
                    query : v.id
                })
            })
            .catch(e => {
                toast.error("¡No se pudo crear la postal!")
            })
    }

    const handleAuthor = (e : any) => {
        let name = e.target.value

        if (name.length > 0) {
            setAuthor(e.target.value)
        } else {
            setAuthor("Anónimo")
        }
    }

    return (
        <main className="lg:p-16 p-6 w-full flex items-center flex-col bg-center bg-[url(/img/bgmain.png)] min-h-screen">
            <h1 className="text-4xl font-bold">Crear postal</h1>
            <div className="flex lg:flex-row flex-col gap-8 flex-grow w-full items-center my-6">
                <div className="bg-green-800 p-4 flex-1 self-stretch rounded-lg">
                    <form 
                        onSubmit={handleSubmit} 
                        className="flex flex-col justify-between h-full items-center"
                    >
                        <div className="w-full">
                            <label>Autor</label>
                            <input 
                                type="text"
                                onChange={handleAuthor}
                                placeholder="Introduce tu nombre ( o déjalo en blanco )"
                                className="w-full text-green-900 text-sm p-2 my-2 rounded-md" />
                        </div>
                        <div className="w-full">
                            <label>Contenido</label>
                            <textarea 
                                rows={4}
                                onChange={(e : any) => setContent(e.target.value)}
                                placeholder="Introduce el contenido de la postal"
                                className="w-full text-green-900 text-sm p-2 my-2 rounded-md resize-none" />
                        </div>
                        <div className="w-full">
                            <label>Pegatina</label>
                            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 my-2 gap-4 ">
                                {stickers.map((stickerInfo, id) => (
                                    <div className='relative hover:scale-105 transition-transform duration-150 w-full' key={id}>
                                        <button 
                                            className='bg-green-100 flex flex-col items-center p-2 rounded-md w-full'
                                            onClick={(e) => { e.preventDefault(); setSticker(id) }}
                                        >
                                            <Image src={stickerInfo.source} alt={`Pegatina ${stickerInfo.name}`} width={35}/>
                                            <p className='text-center text-xs text-green-900 font-bold'>{stickerInfo.name}</p>
                                        </button>
                                        <div className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'>
                                            <motion.div 
                                                className='p-1 border-white border-2 rounded-full bg-green-400'
                                                initial="hide"
                                                variants={checkVariant}
                                                animate={sticker == id ? "show" : "hide"}
                                            >
                                                <FaCheck />
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button 
                            type="submit"
                            className="bg-gradient-to-b from-green-500 to-green-700 py-2 px-3 text-sm font-bold flex justify-center items-center gap-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-150"
                        >
                            Crear postal
                        </button>
                    </form>
                </div>
                <div className="lg:w-1/2 w-full">
                    <Postcard author={author} content={content} sticker={stickers[sticker]} likes={123}/>
                </div>
            </div>
        </main>
    )
}

export default Create