import {Routes, Route} from "react-router-dom"
import Signup from "/src/routes/sígnup/Sígnup.jsx"
import Signin from "/src/routes/signin/Signin.jsx"
import Home from "/src/routes/home/Home.jsx"

function App() {
  
  return (
    <>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/signup" element={<Signup/>} />
<Route path="/signin" element={<Signin/>} />
</Routes>
    </>
  )
}

export default App
