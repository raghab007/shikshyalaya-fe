import { BrowserRouter, Link, Route,Routes } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home"
import AboutUs from "./components/AboutUs"
import { Button, TextField } from "@mui/material"
import Course from "./components/Course"

function App(){
  return <>
  
  <BrowserRouter>
  <div style={{display:'flex',justifyContent:'center',backgroundColor:'black',font:'white',padding:'50px'}}>
   <div style={{width:'50%',backgroundColor:'red'}}>
   <TextField variant="outlined" placeholder="search courses" type="search" backgroundColor="white"></TextField>
   </div>
   <div style={{width :'50%',display:'flex',justifyContent:'center',backgroundColor:'green'}}>
   <Button> <Link to={"/home"}>Home</Link></Button>
    <Button><Link to={"/courses"}>Courses</Link></Button>
    <Button>  <Link to={"/about-us"}>About-us</Link></Button>
    <Button><Link to={"/login"}>Login</Link></Button>
    <Button><Link to={"/signup"}>Signup</Link></Button>
   </div>
  </div>
  
    <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
      <Route path="/courses" element={<Course></Course>}></Route>
    </Routes>
  </BrowserRouter>

 
  </>
}


export default App