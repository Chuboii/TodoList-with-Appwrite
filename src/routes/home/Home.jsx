import {useState, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import {UserContext} from "/src/context/Context"
import "./Home.scss"
import {signout} from "/src/firebase/firebase"
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import {v4 as uuidv4} from "uuid"
import {UserTodoContext} from "/src/context/UserTodo"
import { databases } from "/src/appwrite/appwrite"
import {AlertContext} from "/src/context/AlertContext"
import CircularProgress from '@mui/material/CircularProgress';
import CheckedTodo from "/src/components/checked todo/CheckedTodo"
import EditIcon from '@mui/icons-material/Edit';

export default function Home(){
 const {userInfo, setUserInfo} = useContext(UserContext)
 const navigate = useNavigate()

const [todo, setTodo] = useState("")
const [data, setData] = useState("")
const [length, setLength] = useState(0)
const [enableHistory, setEnableHistory] = useState(false)
const [clicked, setClicked] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true)
 const {setErrMessage, isValidationToggled, setIsValidationToggled} = useContext(AlertContext)
 async function logout(){
  await signout()
   setUserInfo(null)
   setIsLoaded(false)
      setIsValidationToggled(false)
 localStorage.setItem('userInfo', JSON.stringify(null))
}

const changeValue = (e) =>{
  setTodo(e.target.value)
}

useEffect(()=>{
  
  const getData = async () =>{
  try{  
  let promise = await databases.listDocuments(
    "65215d5726c0a4351a63",
    "65234cc90f7f296b7d0f"
)
const info = await promise
setData(info)
setIsLoaded(false)


const existingDocument2 = await databases.getDocument("65215d5726c0a4351a63", "652371b6be52213fb8c9", userInfo.uid);


setLength(existingDocument2.UserCheckedTodos.length)
}
catch(e){
   if(e.message === "Document with requested ID could not be found"){
        console.log("waitt ")
      }
  console.log(e)
}


}


getData()
}, [data])

const handleSubmit = async  (e) =>{
  e.preventDefault()
  if(todo){
  try{
   const existingDocument = await databases.getDocument("65215d5726c0a4351a63", "65234cc90f7f296b7d0f", userInfo.uid);


const todos = {
  id: uuidv4(),
  data: todo
};
existingDocument.UserTodos.push(JSON.stringify(todos));

const updateObject = {
    UserTodos:existingDocument.UserTodos
  }

  const updatedDocument = await databases.updateDocument("65215d5726c0a4351a63", "65234cc90f7f296b7d0f", userInfo.uid, updateObject)
  
 
}
catch(e){
  let todos = {
      id: uuidv4(),
      data: todo
    }
  if (e.message === "Document with the requested ID could not be found.") {
    const newDocument = {
      UserTodos:[JSON.stringify(todos)]
    }
    const createdDocument = await databases.createDocument("65215d5726c0a4351a63","65234cc90f7f296b7d0f", userInfo.uid, newDocument);
    
  } else {
    console.error('Error:', e);
  }
}
}
setTodo("")
}







const deleteTodos = async (idx)=>{
  
  try{
 const existingDocument = await databases.getDocument("65215d5726c0a4351a63", "65234cc90f7f296b7d0f", userInfo.uid);

  const deleteItem = existingDocument.UserTodos.filter(el => JSON.parse(el).id !== idx)

const updateObject = {
   UserTodos: deleteItem
 }
 const updatedDocument = await databases.updateDocument("65215d5726c0a4351a63", "65234cc90f7f296b7d0f", userInfo.uid, updateObject)
  

  }
  catch(e){
    console.log(e)
  }
}








const checkedTodos = async (el, idx) =>{
 
  try{
    
    const existingDocument2 = await databases.getDocument("65215d5726c0a4351a63", "65234cc90f7f296b7d0f", userInfo.uid);

const deleteItem = existingDocument2.UserTodos.filter(el => JSON.parse(el).id !== idx)

const updateObject2 = {
    UserTodos:deleteItem
  }

  const updatedDocument2 = await databases.updateDocument("65215d5726c0a4351a63", "65234cc90f7f296b7d0f", userInfo.uid, updateObject2)
  
    
    
    
    
    
 const existingDocument = await databases.getDocument("65215d5726c0a4351a63", "652371b6be52213fb8c9", userInfo.uid);
 
 
 const duplicate = existingDocument.UserCheckedTodos.some(el => JSON.parse(el).id === idx)
 
 if(!duplicate){
existingDocument.UserCheckedTodos.push(el);

const updateObject = {
    UserCheckedTodos:existingDocument.UserCheckedTodos
  }

  const updatedDocument = await databases.updateDocument("65215d5726c0a4351a63", "652371b6be52213fb8c9", userInfo.uid, updateObject)

const existingDocument2 = await databases.getDocument("65215d5726c0a4351a63", "652371b6be52213fb8c9", userInfo.uid);

setLength(existingDocument2.UserCheckedTodos.length)

}
else{
  console.log("duplicate is being made")
}

}
catch(e){
  
  if (e.message === "Document with the requested ID could not be found.") {
    const newDocument = {
      UserCheckedTodos:[el]
    }
     console.log([JSON.stringify(el)])
    const createdDocument = await databases.createDocument("65215d5726c0a4351a63","652371b6be52213fb8c9", userInfo.uid, newDocument);
    const existingDocument2 = await databases.getDocument("65215d5726c0a4351a63", "652371b6be52213fb8c9", userInfo.uid);


setLength(existingDocument2.UserCheckedTodos.length)

  
  } else {
    console.error('Error:', e);
  }
  
}
}


const historyFunc = (e) =>{
  e.stopPropagation()
  setEnableHistory(true)
}



   return(
    <div  onClick={()=> setEnableHistory(false)}>
 {enableHistory && <CheckedTodo doThis={setEnableHistory}/>}
  {  userInfo ? (
    <div className="container">
    <header> 
    <h4 className="name">Welcome {userInfo.displayName} 😇</h4>

    <button onClick={logout} style={{color:'black', background:"white"}}> Logout</button>
    </header>
    
    <main>
   <form className="add-form" onSubmit={handleSubmit}>
               <input className="add" placeholder="Add todo here..." value={todo} onChange={changeValue} />
               <button className="add-form-btn"> <EditIcon sx={{color:'white'}} /> </button>
             </form>
             
      <div onClick={historyFunc} className="history">
    View History <span className="num">{length}</span>
    </div>
    
   
    <div className="todo-container">
      {isLoaded &&  <CircularProgress sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", zIndex:"11"}} />}
 {
  data ? (
    data.documents.map(doc => {
      return userInfo.uid === doc.$id ? (
        doc.UserTodos.map((el, index) => {
          const parsedEl = JSON.parse(el);
          return (
            <div key={index} className="item">
              <p className="item-name">{parsedEl.data}</p>
              <div className="btn">
                <button  style={{ marginRight: "1rem", background:"white" }} onClick={() => deleteTodos(parsedEl.id)}>
                  <DeleteForeverSharpIcon sx={{color:"black"}} />
                </button>
                <button style={{background:"white"}} onClick={() => checkedTodos(el, parsedEl.id)}>
                  <CheckCircleOutlineSharpIcon sx={{color:"black"}} />
                </button>
              </div>
            </div>
          );
        })
      ) : null;
    })
  ) : null
}

    </div>
    </main>
    
    </div>
    ) 
    : isLoaded && <CircularProgress sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", zIndex:"11"}} />
    
  }
    
    </div>
    )
}