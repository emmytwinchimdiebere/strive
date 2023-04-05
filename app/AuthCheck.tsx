import React from 'react'
import { unstable_getServerSession } from "next-auth/next"
import authOptions from '../pages/api/auth/[...nextauth]'

export default  async  function AuthCheck(){
    const session = await unstable_getServerSession(authOptions)

    if (!session) {
        return {
          redirect: {
            destination: 'http://localhost:3000/login',
            permanent: false,
          },
        }
      }
    
      return {
        props: {
          session
        },
      }
    }

