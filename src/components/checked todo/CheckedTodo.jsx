import {databases} from "/src/appwrite/appwrite"
import {useEffect, useState, useContext} from "react"
import {UserContext} from "/src/context/Context"
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import "./CheckedTodos.scss"
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from "/src/components/loader/Loader"
export default function CheckedTodo({doThis}){
 const [data, setData] = useState(null)
 const {userInfo} = useContext(UserContext)
 const [isLoaded, setIsLoaded] = useState(true)
 
 useEffect(()=>{
  const getData = async () =>{
    try{
    const existingData = await databases.getDocument("65215d5726c0a4351a63", "652371b6be52213fb8c9", userInfo.uid)
 setData(existingData)
 setIsLoaded(false)
    }
    catch(e){
      setIsLoaded(false)
      if(e.message === "Document with requested ID could not be found"){
        consope.log("waitt ")
      }
      }
      console.log(e)
    }

  
  getData()
  
 },[data])
 
 const deleteTodos = async (idx, cIdx) =>{

     try{
 const existingDocument = await databases.getDocument("65215d5726c0a4351a63","652371b6be52213fb8c9", userInfo.uid);

  const deleteItem = existingDocument.UserCheckedTodos.filter(el => JSON.parse(el).id !== idx)

 console.log(existingDocument)

const updateObject = {
   UserCheckedTodos: deleteItem
 }
 const updatedDocument = await databases.updateDocument("65215d5726c0a4351a63", "652371b6be52213fb8c9", userInfo.uid, updateObject)
  

  }
  catch(e){
    console.log(e)
  }

 }
 
 const close = (e) => {
   e.stopPropagation()
   doThis(false)
 }

  return(
    <>
    <div className="checked-todo" onClick={(e) =>{
      e.stopPropagation()
    }}>
           {isLoaded && <Loader pos="absolute" bg="rgba(0,0,0,.5)"/>}
        <CloseIcon onClick={close} sx={{ position: "fixed", color:"white", top: "10px", zIndex: '20', left:'10px',  background:"rgba(0,0,0,.7)", padding:".5rem", borderRadius:"10px"}}/>
    
    <h3 style={{zIndex:'20'}}> List of Todos Done </h3>
    
    <div className="checked-contain">
   {data ? data.UserCheckedTodos.map(el =>(
   <div className="checked-item">
        <p className="checked-name">{JSON.parse(el).data}</p>
    <div className="btn">
    <button style={{background:"white"}}  onClick={()=>{deleteTodos(JSON.parse(el).id, el.$collectionId)}} style={{marginRight:"1rem", position:'absolute', right:"1rem"}}><DeleteForeverSharpIcon sx={{color:"black"}}/></button>
    
    </div>
    </div>
    
 )) : ""  }
    </div>
    </div>
    </>
    )
}