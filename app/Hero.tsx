import { Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import heroImg from "../public/assests/heroImg.png"


export default function Hero() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 bg-white h-auto border-t-2 border-t-black'>
        <div className='flex flex-col '>

       <div className='ml-5 lg:ml-10 mt-4  lg:mt-8 text-left md:text-center'>
        <h1 className='text-5xl md:text-7xl font-bold text-blue-500'>Stay Currious </h1>
        <h1  className='text-6xl'>with the trends.</h1>
       </div>

       <div className=' px-10 text-justify mt-4  lg:mt-6  justify-center'>
        <span className="text-sm">
          MUI offers a comprehensive suite of UI tools to help you ship new features faster. Start with Material UI, our fully-loaded component library, or bring your own design system to our production-ready components.
          </span>
       </div>

       <div className='ml-7 lg:ml-32 mt-4  lg:mt-6  justify-center  pb-5'>
            <Button variant='contained' href='/login'>Get Started </Button>
       </div>
        
        </div>


        <div className='hidden lg:flex flex-row '>
            <div className="">
           <Image src={heroImg} alt="heroImg" height={500}  />
            </div>
        </div>
    </div>
  )
}
