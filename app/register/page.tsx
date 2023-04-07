"use client"
import Link from 'next/link'
import React from 'react'
import Head from './head'
import FormStyles from '../../styles/FormStyles.module.css'
import { HiAtSymbol, HiOutlineUser,} from 'react-icons/hi';
import Image from 'next/image'
import {AiFillEye,AiFillEyeInvisible}  from 'react-icons/ai'
import {useFormik} from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import {useRouter} from 'next/navigation';
import LinearBuffer from '../LineearProgress'
import CircularStatic from '../Loader'




export default function RegisterPage() {
  const [show, setShow] = React.useState({password:false, cPassword:false});
  const [loading, setLoading ] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const delay =  (ms:any)=> new Promise((resolve, reject)=>setTimeout(resolve, ms))

  const formik = useFormik({
   initialValues: {
    name:"",
    email:"",
    password:"",
    confirm_password:"",

   },

   onSubmit: async (values) => {
    await delay(10000)
      
    await axios({
        url:"http://localhost:8000/api/register",
        data:values,
        method:"Post",
        headers:{
          "Content-Type": "application/json",
          "Accept":"application/json"
        }
       }).then((response)=>{

          if(response.data.status === 500){
            setLoading(false);
            console.log(response.data.errors)
            setError(response.data.errors.email)
            toast(response.data.errors.email, {type:"error"})
          }
          
          if(response.data.status === 200){
            setLoading(false);
            console.log(response)
            toast(response.data.message, {type:"success"})
              setTimeout(()=>{
                router.push("/login")
              },5000)

          }
       }).catch((err)=>{
      
        console.log(err)
          
       })
        
    
   
   },

   validationSchema:Yup.object({
    name:Yup.string().required("Name is required").max(20, "Name must not be more than 20 characters").min(2,"Name must be more than 3 characters"),
    email:Yup.string().required("email is requred").email("invalid email address"),
    password:Yup.string().required() .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirm_password: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value){
      return this.parent.password === value
    })
   
  })
    
  })
  return (
    
    <div>
      
      <Head/>
      
          <section className='flex flex-col w-3/4 gap-4 mx-auto'>
          {loading ? <LinearBuffer /> : " "}
            <div className='title'>
            <h1 className='py-5 text-2xl font-bold lg:text-4xl'><span className='bg-blue-500 px-5 text-white'>Strive</span>Codes</h1>
              <p className='w-3/4 mx-auto text-gray-500'>
                Please register to explore the full Power of StriveCodes </p>
            </div>
              <span className=' text-red-700'>{error ? error : " "}</span>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
              <div className={FormStyles.input_group}  >
                <input className={FormStyles.inputText} type="email" placeholder='Email'
                  {...formik.getFieldProps("email")}
                />
                <span className="flex items-center py-4 mr-3 icon">
                  <HiAtSymbol/>
                </span>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <span style={{color:"red", fontSize:12}} className=' flex text-left justify-start font-bold'>

                  {formik.errors.email}
                 

                </span>
              ): null}
             
              <div className={FormStyles.input_group}  >
                <input className={FormStyles.inputText} type="text" placeholder='UserName' required 
                {...formik.getFieldProps("name")}
                />
                <span className="flex items-center py-4 mr-3 icon">
                <HiOutlineUser/>
                </span>
              </div>

              {formik.touched.name && formik.errors.name ? ( 
                <span style={{color:"red", fontSize:12}} className="flex justify-start font-bold ">
                    {formik.errors.name}
                </span>
              ): null}

              <div  className={FormStyles.input_group} >
                <input  className={FormStyles.inputText}  type={show.password ? "text" :  "password"} placeholder='Password' 
                {...formik.getFieldProps("password")}
                />
                 <span className="flex items-center py-4 mr-3 icon" onClick={()=>setShow({...show, password:!show.password})} >
                 {show.password ? <AiFillEyeInvisible /> : <AiFillEye/>  }
                </span>
              </div>
                  {formik.touched.password && formik.errors.password ? (
                    <span style={{color:"red", fontSize: 12}} className="flex justify-start font-bold">
                      {formik.errors.password}
                    </span>
                  ) : null} 
             
              <div  className={FormStyles.input_group} >
                <input  className={FormStyles.inputText}  type={show.cPassword ? "text" :  "password"} placeholder='Confirm Password'
                {...formik.getFieldProps("confirm_password")}
                />
                 <span className="flex items-center py-4 mr-3 icon" onClick={()=>setShow({...show, cPassword:!show.cPassword})} >
                 {show.cPassword ? <AiFillEyeInvisible /> : <AiFillEye/>  }
                </span>
              </div>

              {formik.touched.confirm_password && formik.errors.confirm_password ? (
               
                  <span style={{color:"red", fontSize: 12}} className="text-left font-bold flex">
                    {formik.errors.confirm_password}
                  </span>
                
              ) 
                  
              : null} 
             
              <div className={FormStyles.input_button}>
              <button onClick={()=>setLoading(true)} disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}  type='submit'> {loading ? <CircularStatic/> : "Send"}</button>
              </div>
            </form>

           <div className='text-center text-gray'>
            <p className='text-xs font-light left-2' >already have account?<Link className='text-sm text-blue-400' href={"/login"}> Login</Link> </p>
           
           </div>
          </section>
          <ToastContainer />
      </div>
  )
}
