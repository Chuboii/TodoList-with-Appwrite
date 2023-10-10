import {createContext} from "react"
import {useState} from "react"

export const AlertContext = createContext()

export const AlertProvider = ({children})=>{
  const [isValidationToggled, setIsValidationToggled] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  
  const toggleValidationErr = () => {
    setIsValidationToggled(!isValidationToggled)
  }
  
  
  const value = {isValidationToggled, setIsValidationToggled, toggleValidationErr, errMessage, setErrMessage}
  
  return (
    <AlertContext.Provider value={value}>
   {children}
    </AlertContext.Provider>
    )
}