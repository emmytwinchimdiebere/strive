import React, { ReactNode } from 'react'



export default function layout({children} : {children:ReactNode}) {

  
  return (
    <div className = "grid grid-cols-1 md:grid-cols-3 bg-white">
       <div className='md:col-span-2'>

        
            {children}
       </div>
        
        <div className=' border-l-2 border-l-gray-200 hidden md:flex'>
           
        </div> 
        </div>
  )
}
