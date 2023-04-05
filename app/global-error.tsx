"use client"
 import React,{useEffect} from "react"


 export default function GlobalError({reset, error }: {reset: () => void, error:Error}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="error boundary pages" />
                <meta charSet="utf-8"/>
            </head>

            <body>
                <h1>Something Went wrong </h1>
                <button className=" bg-indigo-500 rounded-lg m-auto" onClick={()=>reset()}>try agaiin</button>
            </body>
        </html>
    )
 }

