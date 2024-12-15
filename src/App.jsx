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
import Admin from "./admin/components/Admin";
import UserRoutes from "./routes/UserRoutes";
import { useState } from "react";
import Course from "./pages/Course";

function App() {
  const location = useLocation();

  // Determine whether to render the Navbar and Footer
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <div>
        {!isAdminRoute && <Navbar />} {/* Render Navbar only if not in Admin */}
        <div style={{ margnBottom: !isAdminRoute ? "100px" : "0" }}>
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
          </Routes>
        </div>
        {!isAdminRoute && (
          <div style={{ height: "150px", backgroundColor: "#282c34" }}>
            <Footer />
          </div>
        )} {/* Render Footer only if not in Admin */}
      </div>
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


