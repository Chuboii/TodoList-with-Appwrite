import CircularProgress from '@mui/material/CircularProgress';
import "./Loader.scss"

export default function Loader({pos, bg}){
  
  return(
    <>
        <CircularProgress sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", zIndex:"11"}} />
    
    <div className="bg" style={{position:pos,background:bg }}>
</div>
</>
    )
}