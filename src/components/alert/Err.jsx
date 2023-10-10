import "./Err.scss"
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import {useState, useContext} from "react"
import {AlertContext} from "/src/context/AlertContext"


export default function Err(){
 const {toggleValidationErr, errMessage} = useContext(AlertContext)
 
 
  
 
 return(
    <div className="err-container">
    <CloseIcon className="err-times" onClick={toggleValidationErr}/>
   
    <div className='err-icon-div'>
    <ErrorIcon sx={{fontSize:"40px", color:""}}/>
    <p>{errMessage}</p>
    </div>
    </div> 
    ) 
}