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
import { EnrolledCourses, EnrolledCoursesPage } from "../pages/EnrolledCourses";
import ErrorPage from "../pages/Error";
import PaymentPage from "../pages/PaymentDetails";
import UserCourse from "../pages/UserCourse";
import ChatPage from "../pages/Chat";
import PaymentSuccessPage from "../pages/PaymentSuccess";
import PaymentFailedPage from "../pages/PaymentFail";
import ContactUs from "../pages/Contact";
import CoursesByCategory from "../pages/CoursesByCategory";

export default function UserRoutes() {
  return (
    <Routes>
      {" "}
      {/* Wrap routes inside <Routes> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/category/:categoryId" element={<CoursesByCategory />} />
      <Route path="/contact" element={<ContactUs></ContactUs>}></Route>
      <Route path="/coursedetails/:courseId" element={<CourseDetails />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route
        path="/paymentsuccess"
        element={<PaymentSuccessPage></PaymentSuccessPage>}
      ></Route>
      <Route
        path="/paymentfail"
        element={<PaymentFailedPage></PaymentFailedPage>}
      ></Route>
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/chat/:courseId" element={<ChatPage></ChatPage>}></Route>
      <Route
        path="/course/:courseId"
        element={<UserCourse></UserCourse>}
      ></Route>
      <Route path="/enrolled" element={<EnrolledCoursesPage />}>
        <Route index element={<EnrolledCourses />}></Route>
      </Route>
      <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>
      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
    </Routes>
  );
}
