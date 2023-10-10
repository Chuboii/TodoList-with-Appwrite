import {createContext, useState, useEffect } from "react"
import {onAuthChanged} from "/src/firebase/firebase"
import {useNavigate} from "react-router-dom"
export const UserContext = createContext()

function getUser(){
  const storage = localStorage.getItem("userInfo")
  return storage ? JSON.parse(storage) : null
}
export const UserProvider = ({children}) =>{
  const [userInfo, setUserInfo] = useState(getUser)
 const navigate = useNavigate()
 
 useEffect(()=>{
   const unsub = onAuthChanged((user) =>{
  
   if(user){

 
     navigate("/")

   }
   else{
     navigate("/signup")

   }

   })
 },[userInfo])
 

 
 
 
 const value = {setUserInfo, userInfo}
  return (
    <UserContext.Provider value={value}>
    {children}
    </UserContext.Provider>
    )
}