"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react'
import React from 'react'

 export default async function createUser(){

    const {data:session, status } = useSession();
  
    const socialData = {
      username : session?.name,
      email: session?.email
    }


    const generatePassword = (length:number)=>{
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*_+";
        let password = ""

        for(let i = 0 ; i < length ; i++){

             password += charset.charAt(Math.floor(Math.random() * charset.length))

        }
        return password;
    }

    

        let password = generatePassword(16);

        const response = await axios.post('http://localhost:8000/api/register', {
            ...socialData, password })

            console.log(response.data)

            createUser()

}


