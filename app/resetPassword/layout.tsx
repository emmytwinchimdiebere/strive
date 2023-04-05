import React from 'react'

export default function ResetPasswordLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex h-full py-5 bg-slate-200'>
         <div className='lg:w-2/6 w-auto grid  grid-cols-1 m-auto justify-center bg-white px-5 py-5 rounded-md'>
               <div className='m-auto justify-center w-full flex  ' >
               {children}
               </div>
         </div>
    </div>
  )
}
