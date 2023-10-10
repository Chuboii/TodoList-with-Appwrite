import "./Signup.scss"
import {useState,useEffect, useContext} from "react"
import {v4 as uuidv4} from "uuid"
import {UserContext} from "/src/context/Context"
import {useNavigate, Link} from "react-router-dom"
import {emailSignup, signInWithGoogle} from "/src/firebase/firebase"
import {updateProfile} from "firebase/auth"
import GoogleIcon from '@mui/icons-material/Google';
import Err from "/src/components/alert/Err"
import {AlertContext} from "/src/context/AlertContext"
import Loader from "/src/components/loader/Loader"
import img from '/src/assets/fb7.jpg';
export default function Signup(){
  const [value, setValue] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
})
const {setUserInfo, userInfo} = useContext(UserContext)
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

    if (value.password === value.confirmPassword) {
      let timeout;
   if(value.password.length >= 6){
     try {
      setIsLoaded(true)
      timeout = setTimeout(() => {
        setIsLoaded(false)
        setErrMessage("Connection timeout")
        setIsValidationToggled(true)
      }, 4000)

   const {user} = await emailSignup(value.email, value.password)

       
    await updateProfile(user, {
      displayName: value.name
    })
    
    setUserInfo(user)
    localStorage.setItem("userInfo", JSON.stringify(user))
    setIsLoaded(false)
  }
    
    catch (err) {
       clearTimeout(timeout)
       setIsLoaded(false)
        setErrMessage("Email already in use")
        setIsValidationToggled(true)
      console.log(err)
      
    }
   }
   else{
     setErrMessage("Passwords should be at least 6 characters")
     setIsValidationToggled(true)
     setIsLoaded(false)
   }
 }
 else {
   setErrMessage("Passwords does not match")
   setIsValidationToggled(true)
   setIsLoaded(false)
 }
  }
  
const googleBtn = async () => {

setIsLoaded(true)
    setTimeout(()=>{
      setIsLoaded(false)
    }, 5000)

 
  try{
    setIsLoaded(true)
  const {user} = await signInWithGoogle()
setUserInfo(user)
localStorage.setItem("userInfo", JSON.stringify(user))

}
catch(e){
  console.log(e);
}
}
  return(
    <>
    {isValidationToggled && <Err/>}
   {isLoaded && <Loader/>}
      <form className="signup" onSubmit={handleSubmit}>
        <div className="first"><img src={img} /></div>
        <div className="second">
    <input type="text" name="name" placeholder="Joe Doe" value={value.name} className="inp1" onChange={changeValue} required/>
        <input className="inp2" type="email" name="email" value={value.email} onChange={changeValue} placeholder="joedoe@gmail.com" required/>
            <input className="inp3" value={value.password} name="password" onChange={changeValue} type="password" placeholder="******" required/>
                <input className="inp4" name="confirmPassword" value={value.confirmPassword} onChange={changeValue} type="password" placeholder="******" required/>
              <button className="sign-btn">Sign up</button>
              <GoogleIcon onClick={googleBtn} sx={{position:"relative",color:'white', left:"50%", transform:"translateX(-50%)", background:"orangered", padding:"1rem", borderRadius:"50%"}}/>
              <p className="already"> Already got an account? <Link to={"/signin"}> Sign in </Link> </p>
        </div>
    </form>
    </>
    )
}