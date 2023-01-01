import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import ginger from "../public/img/stickers/gingerbread-man.png"
import wreath from "../public/img/stickers/christmas-wreath.png"
import candy from "../public/img/stickers/candy-cane.png"
import clover from "../public/img/stickers/clover.png"
import smile from "../public/img/stickers/smile.png"
import heartSmiley from "../public/img/stickers/hearts.png"

function Credits() {
    return (
        <main className="lg:p-16 p-6 w-full flex items-center flex-col bg-center bg-[url(/img/bgmain.png)] min-h-screen">
            <h1 className="text-4xl font-bold mb-5">Créditos</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <Link className="rounded-md bg-green-200 text-green-900 p-5 text-sm flex flex-col items-center transition hover:scale-105 duration-150" href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">
                    <p>Gingerbread man created by iconixar - </p>
                    <Image src={ginger} alt="Gingerbread" priority width={100}/>
                </Link>
                <Link className="rounded-md bg-green-200 text-green-900 p-5 text-sm flex flex-col items-center transition hover:scale-105 duration-150" href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">
                    Christmas wreath created by Umeicon - Flaticon
                    <Image src={wreath} alt="Wreath" priority width={100}/>
                </Link>
                <Link className="rounded-md bg-green-200 text-green-900 p-5 text-sm flex flex-col items-center transition hover:scale-105 duration-150" href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">
                    Candy cane created by Freepik - Flaticon
                    <Image src={candy} alt="Candy cane" priority width={100}/>
                </Link>
                <Link className="rounded-md bg-green-200 text-green-900 p-5 text-sm flex flex-col items-center transition hover:scale-105 duration-150" href="https://www.flaticon.com/free-icons/clover" title="clover icons">
                    Clover icons created by Freepik - Flaticon
                    <Image src={clover} alt="Clover" priority width={100}/>
                </Link>
                <Link className="rounded-md bg-green-200 text-green-900 p-5 text-sm flex flex-col items-center transition hover:scale-105 duration-150" href="https://www.flaticon.com/free-icons/smile" title="smile icons">
                    Smile icons created by Pixel perfect - Flaticon
                    <Image src={smile} alt="Smile" priority width={100}/>
                </Link>
                <Link className="rounded-md bg-green-200 text-green-900 p-5 text-sm flex flex-col items-center transition hover:scale-105 duration-150" href="https://www.flaticon.com/free-icons/smile" title="smile icons">
                    Smile icons created by Vectors Market - Flaticon
                    <Image src={heartSmiley} alt="Heart smile" priority width={100}/>
                </Link>
            </div>
        </main>
    )
}

export default Credits