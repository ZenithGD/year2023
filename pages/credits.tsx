import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import ginger from "../public/img/stickers/gingerbread-man.png"

function Credits() {
    return (
        <main className="lg:p-16 p-6 w-full flex items-center flex-col bg-center bg-[url(/img/bgmain.png)] min-h-screen">
            <h1 className="text-4xl font-bold">Crear postal</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <a href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">
                    <p>Gingerbread man created by iconixar - </p>
                    <Image src={ginger} alt="Gingerbread" priority fill/>
                </a>
                <a href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">
                    Christmas wreath created by Umeicon - Flaticon
                </a>
                <a href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">
                    Candy cane created by Freepik - Flaticon
                </a>
                <a href="https://www.flaticon.com/free-icons/clover" title="clover icons">
                    Clover icons created by Freepik - Flaticon
                </a>
                <a href="https://www.flaticon.com/free-icons/smile" title="smile icons">
                    Smile icons created by Pixel perfect - Flaticon
                </a>
                <a href="https://www.flaticon.com/free-icons/smile" title="smile icons">
                    Smile icons created by Vectors Market - Flaticon
                </a>
            </div>
        </main>
    )
}

export default Credits