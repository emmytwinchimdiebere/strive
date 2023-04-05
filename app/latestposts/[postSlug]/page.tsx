"use client"
import React,{useEffect, useState} from 'react'
import { postslug, props } from '../../../types';
import {format} from 'date-fns'
import {TiSocialTwitter} from 'react-icons/ti'
import {TfiSharethis} from 'react-icons/tfi'
import {Popover, Alert, AlertTitle, Tooltip} from '@mui/material';
import {TiSocialFacebook, TiSocialLinkedin} from 'react-icons/ti'
import {MdOutlineContentCopy} from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify';




const fetchPost = async (postSlug:string) => {
  const post = await fetch(`http://localhost:8000/api/post/${postSlug}`,  {next:{revalidate:200}})
  const res = await post.json();
  return res.Post;
}

export default  function PostPage({params:{postSlug}}:postslug){
  const [postRes, setPostRes] = useState<Array<props>>([])
  const [open, setOpen] = useState<boolean>(false)
  const [toolTip, setToolTip] = useState<boolean>(false)
  const [twitter, setTwitter] = useState<boolean>(false)
  const [linkedIn,  setLinkedIn] = useState<boolean>(false)
  const [copyLink, setCopyLink] = useState<boolean>(false)



  const getPostRes = async ()=>{
    const data = await fetchPost(postSlug)
    setPostRes(data);

  }

  useEffect(
    ()=>{
    getPostRes();
  },[])

  const calculateTimeRead = (description:string)=>{
    const timeRead = 200;
    const wordsCount = description.trim().split(/\s+/).length;
    const timeToRead = Math.ceil(wordsCount/timeRead);

    return timeToRead;
  }

  const shareOnFb = ()=>{
  
    const fbShare = `https://www.facebook.com/sharer/sharer.php?u=` + 'https://blog.knoldus.com/sharing-content-on-social-media-by-javascript/'

    window.open(fbShare, "_blank")
  }

  const shareOnTwitter = ()=>{
    const twitterShare =  `https://twitter.com/intent/tweet?text=` + 'https://github.com/knoldus/angular-facebook-twitter.git';
    window.open(twitterShare, '_blank')
  }

const shareOnLinkedIn = () =>{
  const linkedShare = 'https://www.linkedin.com/cws/share?url=' + 'https://github.com/knoldus/angular-facebook-twitter.git';
  window.open(linkedShare, '_blank')
}

const copyPostUrl = ()=>{
  const postUrl = `http://localhost:3000/latestposts/${postSlug}`;
 navigator.clipboard.writeText(postUrl);
  toast("copied to clipboard", {type:"success", position:"bottom-center" })
  
}

  return (
      <>
      {
        postRes ? (

          postRes.map(values=>(
            <div key={values.id} className='relative '>
           
              <div className='flex flex-row mt-12  ml-10 w-full justify-between '>
             
              <div className="flex justify-start space-x-5">
                <div>
                  <img className='rounded-full w-12 h-12 space-x-12' src={values.image_path} alt={values.title}/>
                </div>
      
                <div className=''>
                  <span className='font-bold'>{values.user.name}</span>
                  <div className='flex space-x-3'>
                    <span className='text-sm text-gray-300'>{format(new Date(values.created_at), "MMM dd")}.</span>
                  <p className='text-sm text-gray-300'>{calculateTimeRead(values.description)} min read.</p>
                 
                  </div>
                </div>
              </div>
      
              <div>
            
             <div className='hidden md:flex flex-row mr-20 space-x-6 relative'>
            <Tooltip arrow onMouseOver={()=>setToolTip(true)} title="share" open={toolTip} onMouseLeave={()=>setToolTip(false)}>
            <span  className='hover:bg-gray-900 text-white p-3 bg-orange-500 rounded-full font-bold text-lg hover:cursor-pointer' onClick={()=>shareOnFb()}><TiSocialFacebook/></span>
            </Tooltip>
             <Tooltip arrow  onMouseOver={()=>setTwitter(true)} title="share" open={twitter} onMouseLeave={()=>setTwitter(false)} >
             <span className='hover:bg-gray-900 text-white p-3 bg-orange-500 rounded-full font-bold text-lg hover:cursor-pointer' onClick = {()=>shareOnTwitter()}><TiSocialTwitter/></span>
             </Tooltip>
             
              <Tooltip  arrow  onMouseOver={()=>setLinkedIn(true)} title="share" open={linkedIn} onMouseLeave={()=>setLinkedIn(false)}>
              <span className='hover:bg-gray-900 text-white p-3 bg-orange-500 rounded-full font-bold text-lg hover:cursor-pointer' onClick={()=>shareOnLinkedIn()}><TiSocialLinkedin/></span>
              </Tooltip>
            
             <Tooltip arrow title="copy link" onMouseOver={()=>setCopyLink(true)}  open={copyLink} onMouseLeave={()=>setCopyLink(false)}>
             <span className='hover:bg-gray-900 text-white p-3 bg-orange-500 rounded-full font-bold text-lg hover:cursor-pointer' onClick={()=>copyPostUrl()}> <MdOutlineContentCopy/></span>
             </Tooltip>
             </div>
      
      
             <div className= "flex md:hidden mr-16 relative">
            
               <span   onClick={()=>{setOpen(!open)}}  className="rounded-full bg-gray-300 hover:bg-slate-400 p-3"><TfiSharethis/></span>
            
            <Popover onClick={()=>setOpen(false)} anchorReference='anchorPosition' id=''open={open} anchorPosition={{
              top:200, left:400
            }}>
                <div className = "flex flex-col space-y-6 p-3">
               
                <span  className=' text-white p-3 bg-orange-500 rounded-full font-bold text-lg hover:cursor-pointer' onClick={()=>shareOnFb()}><TiSocialFacebook/></span>
              <span className=' text-white p-3 bg-orange-500 rounded-full font-bold text-lg hover:cursor-pointer' onClick = {()=>shareOnTwitter()}><TiSocialTwitter/></span>
              <span className=' text-white p-3 bg-orange-500 rounded-full font-bold text-lg hover:cursor-pointer' onClick={()=>shareOnLinkedIn()}><TiSocialLinkedin/></span>
              <span className=' text-white p-3 bg-orange-500 rounded-full font-bold text-lg hover:cursor-pointer' onClick={()=>copyPostUrl()}> <MdOutlineContentCopy/></span>
             </div>
            </Popover>
              </div>
            </div>
              </div>
       
              <div>
                
                <img src={values.image_path} className="h-80 md:h-full w-auto md:w-full object-center p-2 md:pr-5 object-cover mt:10 mr-40 pt-3 mx-3 md:mr-10 justify-center" alt={values.title}/>
                 <p className='mx-3 md:mx-10 text-justify mt-10'>{values.description}</p>
              </div>
            </div>
             
          ))

        ) : <p>Loading....</p>}
      <ToastContainer/>
      </>
   
  )
}

