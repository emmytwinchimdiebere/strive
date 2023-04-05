"use client"
import React,{useState, useEffect} from 'react'
import { postProps, props } from '../../types';
import { Skeleton, Paper, Chip, Avatar} from '@mui/material';
import axios from 'axios';
import {HiOutlineUser} from 'react-icons/hi'
import postImg  from "../../public/assests/ezgif-2-2febffef9e-removebg-preview.png"
import Image from 'next/image';
import Link from 'next/link'
import Loader from "../Loader"
import {format } from 'date-fns'
import { deepOrange } from '@mui/material/colors';
import {MdTrendingUp} from 'react-icons/md';
import {useSession} from 'next-auth/react'



const fetchPost = async () => {

    const response = await axios("http://localhost:8000/api/latestposts", {
        headers: {
            "Content-Type": "application/json",
            "accept":"application/json"
        },

        method: "get",

        
    });
    const PostData = await response.data
    return PostData.LatestPost
}
export default function LatestPost(){
  const [PostData, setPostData] = useState<Array<props>>([]);
  const {data:session, status} = useSession();
   
  const getData = async () => {
    const PostData   = await fetchPost();
    setPostData(PostData)
    console.log(PostData)

  }
  useEffect(()=>{
    getData()
  },[])
  const stringSub = (str:string,  n:number)=>{
      return str.length > n ? str.slice(0, n-1) + "...." : str + "...."
  }

  const calculateMinsRead=(post:string)=>{
    const wordsPerMin= 200; 
    const wordCount = post.trim().split(/\s+/).length
    const minsToRead = Math.ceil(wordCount/wordsPerMin);

    return minsToRead;

  }
 
    return (
    <>
     {PostData && PostData ?  <span className="mx-6 text-sm  flex"><MdTrendingUp className="rounded-full text-base  bg-gray-300 mx-3"/>Trending Stories</span> :  <span className= "mx-6 text-sm">Trending Stories Loading...<Loader /></span>}
    
        <>
        <div className= ' grid grid-cols-1 md:grid-cols-3 text-sm bg-gray-50 border-x-neutral-900 divide-y-2'>
            {PostData && PostData?.map((values)=>(
                <div key={values.id} className='flex flex-col md:flex-row px-1'>
               <Link href={`/latestposts/${values.slug}`}>

              
                  <div className="flex flex-row m-5 space-x-2">

                   
                    <Avatar src = {values.image_path} alt="postImage" sx={{width:56, height:56}} className='mx-2 w-10 h-10 hover:shadow-lg mt-4  rounded-full p-2 group-hover:transform scale-50 duration-100 ease-in  '/>
          
                   
                
                  <div className = "justify-end mt-4  ">
                  <Chip  avatar={<Avatar src={values.image_path} sx={{bgColor:deepOrange[500]}}/>} variant='outlined' label= {values.user.name} />
                    <p className=' font-extrabold'>{values.title}</p>
                   <span>{format(new Date(values.created_at), `MMM dd, yyyy ${'@'}hh:mm a`)}</span>
                    <p className=' text-gray-500 text-xs'>{calculateMinsRead(values.description)} Mins read</p><br/>

                 
                
                  </div>
                  
                  
                
                  </div>
               </Link>
                </div>
            ))}
        </div>
        
        
        </>
    
    </>
  )
}
