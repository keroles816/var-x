import React,{useReducer,createContext,useEffect} from 'react'
import userReducer from '../reducers/user-reducers'
import axios from 'axios'
import { setuser } from '../actions'

export const Usercontext=createContext()
const UseProvider=Usercontext.Provider


export function UserWrapper({children}){
   const defaultuser={username:"Guest"}
   const storeduser= typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")): null
   const [user,dispatchuser]=useReducer(userReducer,
    storeduser || defaultuser)
    useEffect(()=>{
        if(storeduser){
             setTimeout(()=>{
           axios.get(process.env.GATSBY_STRAPI_URL + "/users/me",{
            headers:{
                Authorization:`Bearer ${storeduser.jwt}`
            }
            }).then(Response=>{
               
               dispatchuser(setuser({
                    ...Response.data,jwt:storeduser.jwt,onboarding:true
                }))
            }).catch(error=>{
                console.error(error)
                dispatchuser(setuser(defaultuser))
            })
     },3000)
        }
    

    },[])
    return (
    <UseProvider value={{user,dispatchuser,defaultuser}}>
        {children}
    </UseProvider>
   )

}
