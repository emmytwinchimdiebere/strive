'use client'
import React, { SyntheticEvent } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import styles from '../../styles/FormStyles.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CircularStatic from '../Loader'
import LinearBuffer from '../LineearProgress'




export default function PasswordResetEmail() {
  const [success, setSuccess] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [submitBtn , setSubmitBtn] = useState<boolean>(true)
  const [loading, setLoading] = useState(false);
  const delay = (ms: number) => new Promise((resolve, reject) => setTimeout(resolve, ms))

const formik = useFormik({
  initialValues: {
    email:"",
  },

  onSubmit: async (values) => {
        await delay(10000);
        await axios({
          url:"http://localhost:8000/api/password/email",
          method: "POST",
          data: values,
          headers: { 'Content-type': 'application/json', "Accept": 'application/json'}  ,
          
        }).then((response)=>{
          setLoading(true)
           if(response.data.status === 200){
            setSuccess(response.data.message);
            toast(response.data.message);
            console.log(response.data);
            setLoading(false)
            }


            if(response.data.status === 400){
              setLoading(false);
              toast("connection could not be established", {type: "error"});
              console.log(response.data);
            }  

            if(response.data.status === 404){
              setLoading(false);
              toast("Please check your email & again ", {type: "error"});
              console.log(response.data);
            }  
            
        }).catch((error)=>{
        setError(error.message);
        console.log(error.response.data.message)
         
        });
      },

      validationSchema:Yup.object({
        email: Yup.string().required("email is required").email("invalid email address")
      })
})







  return (
  <section>
        <div className="text-white rounded-md mx-5 lg:mx-5 text-sm lg:text-4xl">
          {loading ? <LinearBuffer /> : ""}
                <em>Please enter your email to reset your password...</em>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  <div className={styles.passwordemaildreset}>
                      <input className={styles.inputTextEmailReset} type={"text"} placeholder="email" 
                      {...formik.getFieldProps("email")}
                    
                      />

                      <span className='flex items-center py-4 mr-3 icon'>
                     <button  disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}     onClick={()=>setLoading(true)} type="submit">{loading ? <CircularStatic/>: "Send"}</button> 
                  </span>
                  </div>
                    {formik.touched.email && formik.errors.email ? (
                      <span style={{color:"white", fontSize:14}} className='font-bold flex justify-start'>
                          {formik.errors.email}
                      </span>
                    ): null}
                  
                </form>
              <ToastContainer />
              
  </section>
  )
}
