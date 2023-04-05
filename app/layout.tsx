"use client"
import "../styles/globals.css"
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "./Providers";
import Navbar from "./Navbar";





export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>

      <head>
        <title>

        </title>
        <meta name=""/>
        
      </head>
    
      <body className="bg-white "> 
      <Providers>
        <main>
          <Navbar/>
      {children}
      </main>
       </Providers>
        </body>
    </html>
  )
}
