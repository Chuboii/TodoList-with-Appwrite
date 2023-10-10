import "./Signin.scss"
import {useState,useEffect, useContext} from "react"
import {v4 as uuidv4} from "uuid"
import {UserContext} from "/src/context/Context"
import {useNavigate, Link} from "react-router-dom"
import {signin, signInWithGoogle} from "/src/firebase/firebase"
import GoogleIcon from '@mui/icons-material/Google';
import Err from "/src/components/alert/Err"
import {AlertContext} from "/src/context/AlertContext"
import Loader from "/src/components/loader/Loader"

export default function Signin(){
  const [value, setValue] = useState({
  email: "",
  password: "",
});
const {setUserInfo} = useContext(UserContext)
 const {setErrMessage, isValidationToggled, setIsValidationToggled} = useContext(AlertContext)
const [isLoaded, setIsLoaded] = useState(false)

const changeValue = (e) => {
  const { name, value: inputValue } = e.target;
  setValue(prevValue => ({
    ...prevValue,
    [name]: inputValue
  }));
  
}

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setIsLoaded(true)
    try{
    const {user} = await signin(value.email, value.password)
    //console.log(value.email)
    setUserInfo(user)
    localStorage.setItem("userInfo", JSON.stringify(user))
    setIsLoaded(false)
    }
    catch(e){
      if(e.code === "auth/invalid-login-credentials"){
        setErrMessage("Invalid login details")
   setIsValidationToggled(true)
      }
    }
  }
  
  const googleBtn = async () => {
    setIsLoaded(true)
    setTimeout(()=>{
      setIsLoaded(false)
    }, 10000)
    try{
  const {user} = await signInWithGoogle()
setUserInfo(user)
localStorage.setItem("userInfo", JSON.stringify(user))
}
catch(e){
  console.log(e)
}
}
  return(
    <>
        {isValidationToggled && <Err/>}
           {isLoaded && <Loader/>}
    <form className="signin" onSubmit={handleSubmit}>
        <input className="inpp1" type="email" name="email" value={value.email} onChange={changeValue} placeholder="joedoe@gmail.com" required/>
            <input className="inpp2" value={value.password} name="password" onChange={changeValue} type="password" placeholder="******" required/>
              <button className="signin-btn">Sign in</button>
                            <GoogleIcon onClick={googleBtn} sx={{position:"relative", left:"50%", transform:"translateX(-50%)", background:"orangered", padding:"1rem", borderRadius:"50%"}}/>
              <p className="already2"> Already got an account? <Link to={"/signup"}> Sign up </Link> </p>
              
    </form>
    </>
    )
}