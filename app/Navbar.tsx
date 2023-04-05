"use client"
import React, {useState} from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import Link from 'next/link'
import NavbarStyles from "../styles/Navbar.module.css"
import {Drawer} from 'antd'
import {HiBars3} from "react-icons/hi2";
import {AiFillHome} from "react-icons/ai"
import {GrTechnology} from 'react-icons/gr'
import {SiBmcsoftware} from "react-icons/si"
import { HiOutlineUser} from "react-icons/hi"
import {Collapse, Box, IconButton, Card, CardContent, Button} from '@mui/material'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
 

export default function Navbar() {
    const {data:session, status}= useSession();
    const [open, setOpen] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false)
    console.log(session)
   
   


   const handleSignIn = ()=>{
      signIn()
   }
    const handleSignOut = ()=>{
        signOut()
    }
    
  return (
    <div className={NavbarStyles.navBar}>
       <div className={NavbarStyles.logo} >
              <Link href={"/"}>StriveCodes</Link>
       </div>


       
         
         
         
         {status === "authenticated" ? (
          <div className='flex'>
             <img src = {session?.image} alt="Profile image" className='m-auto hover:shadow-lg w-10 h-10  rounded-full '/>
            
             <div className="flex-col">
             <div className=' justify-center m-auto mt-3 ml-3'>
             <IconButton size='small' onClick={()=>setOpenProfile(!openProfile)} aria-label = "expand"  >
               {openProfile ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>}
              </IconButton>
             </div>
              <Card sx={{bgcolor:"white", minWidth:300, height:"auto"}}>
              <Collapse in={openProfile} timeout="auto">
                  <CardContent>
                     <div className='flex-col list-none space-y-5'>
                        <li><Link href={"/write"}>Write</Link></li>
                        <li><span>Profile</span></li>
                       <li><Link href={"/library"}>Library</Link></li>
                       <li><Link href={"/stories"}>Stories</Link></li> 
                       <hr></hr>
                        <div className='flex-col'>
                           <small className=' hover:cursor-pointer' onClick={()=>handleSignOut()}>Signout</small>
                          <div>
                          <small>{session?.email}</small>
                          </div>
                        </div>
                     </div>
                  </CardContent>
              </Collapse> 
              </Card>
             </div>
            </div>
         ) 
         
         
         
         : (

            <div className={NavbarStyles.links}>
         
            <ul className={NavbarStyles.ul}> 
            <Button className='hover:cursor-pointer text-black hover:text-slate-300' variant='text' onClick={()=>handleSignIn()}>SignIn</Button>
            <button className="rounded-full bg-sky-800 text-white  p-3 h-auto w-auto ">Get Started</button>
        
             
             
             
            </ul>
         </div>

         )}
       

       <button className='flex flex-row lg:hidden m-auto mr-10' onClick={()=>setOpen(!open)} ><HiBars3/></button>
      
       <Drawer  onClose={()=>setOpen(false)} open={open}>
       
       <ul className='block ml-5 justify-between divide-y-2 space-y-5' onClick={()=>setOpen(false)}> 
            <li><Link className='flex flex-row m-auto space-x-2' href={"/"}> <span className=''><AiFillHome/></span>Home</Link></li>
            <li><Link href={"/backend"}>Backend</Link></li>
            <li><Link href={"/frontend"}>Frontend</Link></li>
            <li><Link className='flex flex-row m-auto space-x-2' href={"/software"}> <span><SiBmcsoftware/></span>Software</Link></li>
            <li><Link className='flex flex-row m-auto space-x-2' href={"/technology"}><span><GrTechnology/></span>Technology</Link></li>
            <li><Link href={"/mobileApp"}>Mobile App Dev</Link></li>
          </ul>
       </Drawer>
    </div>
  )
}
