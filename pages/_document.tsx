import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div className="lg:flex-row flex-col items-center bg-green-900 lg:p-16 p-12 flex justify-center">
            <div className='flex-1'>
                Creado por <Link className="font-bold transition duration-200 hover:text-green-300" href="https://github.com/ZenithGD">
                    Darío Marcos Casalé
                </Link> - 2023
            </div>
            <div>
                <Link className="font-bold transition duration-200 hover:text-green-300" href="/credits">
                    Créditos
                </Link>
            </div>
        </div>
      </body>
    </Html>
  )
}
