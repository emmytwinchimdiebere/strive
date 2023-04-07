'use client'
import React, { SyntheticEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import {useState} from 'react'
import axios from 'axios'
import { FormikProvider, useFormik} from 'formik'
import FormStyles from "../../styles/FormStyles.module.css"
import * as Yup from 'yup'
import { AiFillAlert, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import {  HiOutlineUser,} from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'



export default function() {
    const token = useSearchParams().getAll("token");
    const email = useSearchParams().getAll("email");
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState({password:false, cpassword:false});
    const router = useRouter();


const formik = useFormik({
    initialValues:{
        email:email,
        password:"",
        confirm_password:"",
        token:token
    }, 
    onSubmit:async values =>{
        alert(JSON.stringify(values))
        await axios({
            url:"http://localhost:8000/api/password/reset",
            method:"post",
            data:values,
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((response)=>{
            setLoading(true)
            
            if(response.data.status === 500){
    
                setLoading(false)
                toast("token or email required",{type:"error"})
                console.log(response.data.validationError.email);
               
            };

                if(response.data.status === 300 ){
                    setLoading(false)
                    toast("Token expired ", {type:"error"})
                    console.log(response.data.message)
                };

                if(response.data.status === 200){
                    setLoading(false)
                    toast("You have successfully changed your password", {type:"success"});
                    router.push("/login")
                    
                }
        }).catch((error)=>{
            if(error){
                console.log(error);
              
            }
        });

    },
    validationSchema:Yup.object({
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
       <section className='flex flex-col w-3/4 gap-10 mx-auto'>
       <div className='title m-auto'>
            <h1 className='py-5 text-2xl font-bold lg:text-4xl '><span className='bg-blue-500 px-5 text-white mx-auto'>Strive</span>Codes</h1>
              <p className=' mx-auto text-gray-500'>
                Please enter a new & confirm to reset your password
               </p>
            </div>
                <form onSubmit={formik.handleSubmit}  className='flex flex-col gap-5' >
                    <div className={FormStyles.input_group}>
                    <input  className={FormStyles.inputText} type="email" placeholder='Email' disabled 
                    {...formik.getFieldProps("email")}
                    />

                    <span className='m-auto mr-5'>
                        <HiOutlineUser />
                    </span>
                    </div>

                    <div className= {FormStyles.input_group}>
                    <input  className= {FormStyles.inputText} type={showPassword.password ? "text" : "password"} placeholder='Password' required
                        {...formik.getFieldProps("password")}
                        
                    />
                       <span onClick={()=>setShowPassword({...showPassword, password:!showPassword.password})}  className=' m-auto mr-5'>
                        {showPassword.password ? <AiFillEyeInvisible/> : <AiFillEye />  }
                    
                        </span>    
                    </div>
                    {formik.errors.password && formik.touched.password ? (
                        <span style={{color:"red"}} className=" flex text-left justify-start font-bold">
                            {formik.errors.password}
                        </span>
                    ) : null }

                    <div className={FormStyles.input_group}>
                    <input className={FormStyles.inputText} type={showPassword ? "text" : "password"}  placeholder='confirm password'
                     {...formik.getFieldProps("confirm_password")}
                    />

                    <span className='m-auto mr-5' onClick={()=>setShowPassword({...showPassword, cpassword:!showPassword.cpassword})}>
                        {showPassword.cpassword ? <AiFillEyeInvisible/> : <AiFillEye /> }
                    </span>
                    </div>

                   {formik.errors.confirm_password && formik.touched.confirm_password ? (
                        <span style={{color:"red"}} className="text-bold text-left">
                            {formik.errors.confirm_password}
                        </span>
                   ) : null}

                    <div className=''>
                    <input type="hidden" id='token' 
                    {...formik.getFieldProps("token")}
                    />
                    </div>

                    <div onClick={()=>setLoading(true)}>
                    <button className={FormStyles.input_button} disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}   type='submit'> {loading ? "...loading" : "Send"}</button>
                    </div>
                </form>

       </section>
        <ToastContainer/>
   </div>
  )
}

