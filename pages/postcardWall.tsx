import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { animated, useTrail } from 'react-spring'
import Postcard from '../components/web/Postcard'
import { FaArrowCircleUp } from 'react-icons/fa'

const postcards = [
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
    {
        author: "aaa",
        sticker: 0,
        content: "Contenido contenido"
    },
]

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
        scale: 1
    },
    hide: {
        opacity: 0,
        scale: 0.2,
        rotate: -45
    }
}

function PostcardWall() {
    const [selectedId, setSelectedId] = useState(-1)
    const [hasScroll, setHasScroll] = useState(false);
    const [goTop, setGoTop] = useState(false);

    const config = { tension: 2000, friction: 100 };
    const trail = useTrail(postcards.length, {
        config,
        opacity: 1,
        scale: 1,
        from: { opacity: 0, scale: 0.5 },
    });

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
            <main className="lg:p-16 p-6 w-full flex items-center flex-col bg-center bg-[url(/img/bgmain.png)] min-h-screen">
                <motion.div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-16">
                    {trail.map((props, key) =>
                        <animated.div
                            key={key}
                            style={props}
                        >
                            <button className="w-full h-full" onClick={() => setSelectedId(key)}>
                                <Postcard
                                    author={postcards[key].author}
                                    content={postcards[key].content}
                                    sticker={postcards[key].sticker}
                                />
                            </button>
                        </animated.div>
                    )}
                </motion.div>
            </main>

            <div className="fixed w-screen h-0 flex flex-col items-center m-0 z-0">
                <motion.div
                    animate={hasScroll && selectedId < 0 ? "show" : "hide"}
                    variants={variants}
                    initial={"hide"}
                    className="fixed top-0 mt-5 z-50"
                >
                    <button className="py-2 px-3 text-sm font-bold bg-white flex justify-center items-center gap-2 rounded-full shadow-md">
                        <FaArrowCircleUp className='text-green-900' />
                        <p
                            className="text-green-900 z-10"
                            onClick={() => setGoTop(true)}
                        >
                            Ir al principio
                        </p>
                    </button>
                </motion.div>

                <div className="fixed top-0 h-0">
                    <motion.div 
                        animate={selectedId >= 0 ? "show" : "hide"}
                        className="m-10 bg-green-400"
                        variants={postcardVariant}
                        initial="hidden"
                    >
                        <p>detalle</p>
                        <button onClick={() => setSelectedId(-1)}>cerrar</button>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default PostcardWall