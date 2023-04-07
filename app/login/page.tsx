"use client"
import Link from 'next/link'
import React, {useState} from 'react'
import Head from './head'
import FormStyles from '../../styles/FormStyles.module.css'
import { HiAtSymbol, HiFingerPrint,} from 'react-icons/hi';
import Image from 'next/image'
import {AiFillEye,AiFillEyeInvisible}  from 'react-icons/ai'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import CircularStatic from '../Loader';
import { Backdrop } from '@mui/material'
import createUser from '../storeUserFromSocial'



export default  function LoginPage() {
  const [show, setShow] = React.useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackDrop] = useState(false)


 

  const delay = (ms:number)=> new Promise((resolve, reject) => setTimeout(resolve, ms))
 
  const handleGoogleAuth = async ()=>{
  signIn("google", {callbackUrl: "http://localhost:3000"});

  createUser();
}

const handleGitHubAuth = async ()=>{
  signIn("github", {callbackUrl: "http://localhost:3000"})
}


  const formik = useFormik({
    initialValues: {
      email:"",
      password:""
    
    },
    
    onSubmit: async (values) =>{
      await delay(10000);
     const status =  signIn("credentials",{
       email: values.email,
         password:values.password,
         redirect:false,
         callbackUrl: "http://localhost:3000",
      })
      status.then((res)=>{
        setLoading(true)
        setBackDrop(true)
        if(res?.ok){
      
          setLoading(false)
          setBackDrop(false)
          toast("You have successfully Sign In")
         router.push("http://localhost:3000");
        }
        else{
          if(res?.error === "CredentialsSignin"){
            setLoading(false)
            setBackDrop(false);
            toast("Invalid Email or Password",{
              type:"error"
            })
          }
        }
      }).catch((err)=>{
      
        console.log(err)
      })
      console.log(status);
    },
     

    validationSchema: Yup.object({
      email:Yup.string().email("invalid email address").required("email is required"),
      password:Yup.string().required("password is required")
    })
  })
  const handleSateChange = ()=>{
    setLoading(true)
    setBackDrop(true)
  }
  
  return (
    
    <div>
     
      <Head/>
      
          <section className='flex flex-col w-3/4 gap-10 mx-auto'>
            <div className='title'>
              <h1 className='py-5 text-2xl font-bold lg:text-4xl'><span className='bg-blue-500 px-5 text-white'>Strive</span>Codes</h1>
              <p className='w-3/4 mx-auto text-gray-500'>
                Please Login to explore the full Power of StriveCodes </p>
            </div>

            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
              <div className={FormStyles.input_group}  >
                <input className={FormStyles.inputText} id="email"  type="email" placeholder='Email'  autoComplete='off' 
                {...formik.getFieldProps("email")}
            />
           
                {formik.dirty ? <button className="space-x-4 mr-3" onClick={(e)=>formik.handleReset(e)}>X</button> : ""}
                <span className="flex items-center py-4 mr-3 icon">
                  <HiAtSymbol/>
                </span>
  
              </div>
              {formik.touched.email && formik.errors.email ? (
              <div  style={{color:"red", fontSize:10}}  className='text-red-900 font-bold flex mt-0 p-0 '>
                {formik.errors.email}
              </div>
            ): null}
              
              <div  className={FormStyles.input_group} >
                <input  className={FormStyles.inputText}  type={show ? "text" :  "password"} placeholder='Password' required autoComplete='off'
                {...formik.getFieldProps("password")}
                />
                

                 <span className="flex items-center py-4 mr-3 icon" onClick={()=>setShow(!show)} >
                 {show ? <AiFillEyeInvisible /> : <AiFillEye/>  }
                </span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                    <span style={{color:"red", fontSize:10}} className=' font-bold text-sm lg:text-start lg:text-base flex'>
                      {formik.errors.password}
                    </span>
                  ) : null} 
             <Link href={"/forgetPassword"}> <span className='left-0 flex items-start justify-start pt-0 mt-0 text-sm hover:text-slate-400'>Forgot your password?</span></Link>
              
              <div className={FormStyles.input_button}>
              
              <button  disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}   onClick={()=>handleSateChange()} type='submit'>{loading ? <CircularStatic/> : "Send"}</button> 
             {backdrop ? <Backdrop  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}open={show}>
            <div className=' block'>
          <CircularStatic/>
          <p>wait trying to login....</p><br/>
          </div>
       </Backdrop> : "" }
              </div>

              <div className="Social_button">
              <button onClick={()=>handleGoogleAuth()} className = {FormStyles.social_button} type='button'>Sign in with Google<Image style={{width:"auto", height:"auto"}} alt='google Icon' src={"/assests/3d-social-media-icons-google-free-png.webp"} width="20" height={20} /></button>
              </div>

              <div className='Social_button' >
              <button onClick={()=>handleGitHubAuth()}  className={FormStyles.social_button} type='button'>Sign in with GitHub<Image style={{width:"auto", height:"auto"}} alt='google Icon' src={"/assests/GitHub-Symbol.png"} width="20" height={50}/></button>
              </div>
            </form>

           <div className='text-center text-gray'>
            <p className='text-xs font-light left-2' >Don't have an account yet?<Link className='text-sm text-blue-400' href={"/register"}> Register</Link> </p>
           
           </div>
          </section>

          <ToastContainer/>
      </div>
  )}

