import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
//import Course from "./pages/Course";
import Footer from './components/Footer'
import ForgotPassword from "./pages/Forgetpassword";
import Navbar from "./components/Navbar";
import "./App.css";
import UserRoutes from "./routes/UserRoutes";
import { useState } from "react";
import Course from "./pages/Course";
import Admin from "./pages/Admin";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const location = useLocation();

  // Determine whether to render the Navbar and Footer
  //onst isAdminRoute = location.pathname.startsWith("/admin");
  
  const isAdmin = location.pathname.split('/')[1]=="admin";
  console.log(isAdmin)
  if(isAdmin){
    <>
    <Admin></Admin>
    <Route path="/admin/*" element={<AdminRoutes></AdminRoutes>}></Route>
    </>
  }
  return (
    <>{isAdmin? <Admin></Admin>:< Navbar></Navbar>
    }
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/admin" element={<Admin></Admin>} />
            <Route path="/coursedetails" element={<CourseDetails />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
            <Route path="/*" element={<UserRoutes></UserRoutes>}></Route>
            {/* <Route path="/admin/*" element={<AdminRoutes/>}></Route> */}
            <Route path="/admin/*" element={<AdminRoutes></AdminRoutes>}></Route>
            {/* <Route path="/admin/*" element={<AdminRoutes></AdminRoutes>}/> */}
          </Routes>
          {isAdmin?<></>:
          <Footer ></Footer>
          }
        
    </>
  );
}

   export default function RootApp() {
     return (
       <BrowserRouter>
         <App />
       </BrowserRouter>
    );
   }


