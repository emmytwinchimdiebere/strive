"use client"
import React from 'react';
import Hero from './Hero';
import LatestPost from './latestposts/LatestPost';





export default function Home() {
  return (
    <div>
  
<Hero/>
{/*@ts-ignore */}
<LatestPost/>

<div className=' grid grid-cols-1 md:grid-cols-3'>

  <div className='flex flex-nowrap flex-row col-span-2 '>
   
  </div>
  
  <div className='hidden md:flex'>

  </div>
</div>
  </div>
    
  )
}
