import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AboutUs from "../pages/AboutUs";
import Course from "../pages/Course";
import CourseDetails from "../components/course/CourseDetails";
import UserProfile from "../pages/UserProfile";
import ChangePassword from "../components/ChangePassword";
import ForgotPassword from "../pages/Forgotpassword";
import {ArchivedCourses, EnrolledCourses, EnrolledCoursesPage} from "../pages/EnrolledCourses";
import ErrorPage from "../pages/Error";
import PaymentPage from "../pages/PaymentDetails";
import UserCourse from "../pages/UserCourse";
export default function UserRoutes() {
    return (
        <Routes> {/* Wrap routes inside <Routes> */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/coursedetails/:courseId" element={<CourseDetails />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/course/:courseId" element={<UserCourse></UserCourse>}></Route>
            <Route path="/enrolled" element={<EnrolledCoursesPage/>}>
                <Route index  element={<EnrolledCourses/>}></Route>
                <Route path="archived" element={<ArchivedCourses/>}></Route>
            </Route>
            <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>
            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
    );
}





