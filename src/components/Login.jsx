import { Button, TextField } from "@mui/material"

 export default function Login(){
    const inputStyle = {
        marginTop:'10px'
    }
    function login(){
        alert("Login successfully")
    }
    return <>
    <div style={{width:'100%',alignContent:'center',display:'flex',justifyContent:'center'}}>
   
    <form  style={{display:'flex',flexDirection:'column',width:'300px',border:'1px solid black',padding:'10px',marginTop:'50px',borderRadius:'11px'}} action="">
    <p style={{marginLeft:'20px'}}>Enter your credentials to login</p>
        <TextField required style={inputStyle} type="text" placeholder="enter your email"></TextField>
        <TextField required style={inputStyle} type="password" placeholder="Enter your password"></TextField>
        <Button variant="contained" style={inputStyle}>Login</Button>
    </form>
    </div>
   
    </>
}