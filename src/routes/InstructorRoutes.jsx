import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/instructor/Dashboard";
import Courses from "../components/instructor/Courses";
import Students from "../components/instructor/Students";
import Settings from "../components/instructor/Settings";
import InstructorLayout from "../components/instructor/InstructorLayout";
import AddCourse from "../components/instructor/AddCourse";
import CourseDetails from "../components/instructor/CourseDetail";
import UploadLecture from "../components/instructor/CourseContent";
import PaymentHistory from "../components/instructor/PaymentHistory";
import InstructorCommentsPage from "../components/instructor/Comments";
import InstructorProfilePage from "../components/instructor/Settings";

const InstructorRoutes = () => {
  return (
    <Routes>
      <Route path="/instructor" element={<InstructorLayout></InstructorLayout>}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="users" element={<Users />} />
        <Route path="students" element={<Students />} />
        <Route path="add-course" element={<AddCourse></AddCourse>}></Route>
        <Route
          path="coursedetails/:courseId"
          element={<CourseDetails></CourseDetails>}
        ></Route>
        <Route
          path="profile"
          element={<InstructorProfilePage></InstructorProfilePage>}
        ></Route>
        <Route
          path="comments"
          element={<InstructorCommentsPage></InstructorCommentsPage>}
        ></Route>
        <Route
          path="videos/:sectionId"
          element={<UploadLecture></UploadLecture>}
        ></Route>
        <Route
          path="course/:courseId"
          element={<CourseDetails></CourseDetails>}
        ></Route>
        <Route
          path="payment-history"
          element={<PaymentHistory></PaymentHistory>}
        ></Route>
      </Route>
      <Route path="/instructor/settings" element={<Settings />} />
      <Route
        path="/instructor/settings/payment-methods"
        element={<h1>Payment Methods</h1>}
      />
      <Route path="/instructor/reports" element={<h1>Reports Section</h1>} />
      <Route path="/instructor/logout" element={<h1>Logging out...</h1>} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};
function Users() {
  return <h1>This is users page</h1>;
}

export default InstructorRoutes;
