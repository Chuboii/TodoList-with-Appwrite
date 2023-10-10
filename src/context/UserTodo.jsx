import {createContext,useState} from "react"

export const UserTodoContext = createContext()

export const UserTodoProvider = ({children}) =>{
  const [todo, setTodo] = useState("")
  return <UserTodoContext.Provider value={todo, setTodo}r>
 {children}
  </UserTodoContext.Provider>
}