import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AboutUs from "../pages/AboutUs";
import Course from "../pages/Course";
import Admin from "../admin/components/Admin";
import CourseDetails from "../components/course/CourseDetails";
import ForgotPassword from "../pages/Forgetpassword";

export default function UserRoutes(){
        return (
            <Routes>
                 <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/courses" element={<Course />} />
                <Route path="/admin" element={<Admin></Admin>} />
                 <Route path="/coursedetails?type='cat',name='oscar'" element={<CourseDetails />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
        )
}