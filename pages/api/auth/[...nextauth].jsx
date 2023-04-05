import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider  from "next-auth/providers/credentials"
import axios from "axios"
import * as bycript from 'bcrypt'




export default NextAuth({
  session: { strategy:"jwt" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      async authorize(credentials){
        
        const response  = await axios.post("http://localhost:8000/api/login", credentials, {
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
       })
              if(response.data.email === credentials.email){
                console.log(response)
                return {
                   email: response.data.email,
                   token: response.data.token 

                  
                }
               
              }
              else{
                return null
              }
      }
      
    }),
  
      GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    GitHubProvider({
        clientId:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_SECRET_ID
        
    }), 
    ],

    callbacks: {
      jwt:async ({token, user, account})=>{
        if (user) {
          token = user;
          console.log(token);

        }
        return Promise.resolve(token)
      },
      session:  async ({session, token})=>{
      
        session = token;

      return session;
      }
    },

    pages:{
      signIn:"/login"
    }
})



