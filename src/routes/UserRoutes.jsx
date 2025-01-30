import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AboutUs from "../pages/AboutUs";
import Course from "../pages/Course";
import CourseDetails from "../components/course/CourseDetails";
import ForgotPassword from "../pages/Forgetpassword";
import UserProfile from "../pages/UserProfile";

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/coursedetails/:courseId" element={<CourseDetails />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profile" element={<UserProfile />} />
        </Routes>
    )
}