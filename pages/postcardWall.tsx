import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { animated, useTrail } from 'react-spring'
import Postcard from '../components/web/Postcard'
import { FaArrowCircleUp, FaPaintBrush } from 'react-icons/fa'
import postcardService from '../lib/services/postcardService'
import useSWR from "swr";
import stickers from '../lib/models/stickers'

let variants = {
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.5
        }
    },
    hide: {
        y: -100,
        opacity: 0
    }
}

let postcardVariant = {
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeOut",
            duration: 0.5
        }
    },
    hide: {
        opacity: 0,
        scale: 0.5,

    }
}

let buttonVariant = {
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.5
        }
    },
    hide: {
        y: 100,
        opacity: 0
    }
}

let containerVariant = {
    show: {
        opacity: 1,
        transition: {
            ease: 'easeOut',
            duration: 0.5
        }
    },
    hide: {
        opacity: 0
    }
}

function PostcardWall() {

    const [selectedId, setSelectedId] = useState(-1)
    const [hasScroll, setHasScroll] = useState(false);
    const [goTop, setGoTop] = useState(false);

    const { data : postcards, error, isLoading } = useSWR('/api/postcards', postcardService.getAllPostcards)

    useEffect(() => {
        // Client-side-only code
        window.addEventListener("scroll", () => {
            setHasScroll(window.scrollY > 0)
        })
    }, [])

    useEffect(() => {
        if (goTop) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });

            setGoTop(false)
        }
    }, [goTop])

    return (
        <>
            <main className="lg:p-16 md:p-12 p-6 w-full flex items-center flex-col bg-center bg-[url(/img/bgmain.png)] min-h-screen">
                <h1 className='mb-12 text-4xl font-bold'>Postales</h1>
                { isLoading ? (
                    <p>Cargando postales...</p>
                ) : (
                    error ? (
                        <p>No se han podido cargar las postales</p>
                    ) : (
                        <motion.div 
                            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-16"
                            variants={containerVariant}
                            initial="hide"
                            animate="show"
                        >
                            {postcards.map((card : any, key : number) =>
                                <motion.div
                                    variants={postcardVariant}
                                >
                                    <button className="w-full h-24" onClick={() => setSelectedId(key)}>
                                        <Postcard
                                            author={card.author}
                                            content={card.content}
                                            sticker={stickers[card.sticker]}
                                            likes={key}
                                        />
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )
                )}
            </main>

            <div className="fixed w-screen h-0 flex flex-col items-center m-0 z-0">
                <motion.div
                    animate={hasScroll && selectedId < 0 ? "show" : "hide"}
                    variants={variants}
                    initial={"hide"}
                    className="fixed top-0 mt-5 z-10"
                >
                    <button className="bg-gradient-to-b from-green-500 to-green-700 py-2 px-3 text-sm font-bold flex justify-center items-center gap-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-150">
                        <FaArrowCircleUp/>
                        <p onClick={() => setGoTop(true)} >
                            Ir al principio
                        </p>
                    </button>
                </motion.div>

                <div className="fixed top-0 h-0">
                    <motion.div
                        animate={selectedId >= 0 ? "show" : "hide"}
                        className={`p-10 h-screen w-screen backdrop-blur-sm ${selectedId >= 0 ? "" : "pointer-events-none"}`}
                        variants={postcardVariant}
                        initial="hide"
                    >
                        <div className="w-full h-full bg-green-400">
                            <p>detalle</p>
                            <button onClick={() => setSelectedId(-1)}>cerrar</button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="mb-5 fixed bottom-0"
                    variants={buttonVariant}
                    initial="hide"
                    animate="show"
                >
                    <Link href="/create">
                        <button className="bg-gradient-to-b from-green-500 to-green-700 py-2 px-3 text-sm font-bold flex justify-center items-center gap-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-150">
                            <FaPaintBrush className="" />
                            <p>Crear postal</p>
                        </button>
                    </Link>
                </motion.div>
            </div>
        </>
    )
}

export default PostcardWall
