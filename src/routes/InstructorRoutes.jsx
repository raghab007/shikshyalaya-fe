import { Route ,Routes} from "react-router-dom";
import Dashboard from "../components/instructor/Dashboard";
import Courses from "../components/instructor/Courses";
import Students from "../components/instructor/Students";
import Settings from "../components/instructor/Settings";
import InstructorLayout from "../components/instructor/Instructorlayout";
import AddCourse from "../components/instructor/AddCourse";
import CourseDetails from "../components/instructor/CourseDetail";
import  EnrolledCourses  from "../pages/EnrolledCourses";

const InstructorRoutes = ()=>{

   return( <Routes>
                <Route path="/instructor" element={<InstructorLayout></InstructorLayout>}>
                    <Route index element={<Dashboard />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="users" element={<Users />} />
                    <Route path="students" element={<Students />} />
                    <Route path="add-course" element={<AddCourse></AddCourse>}></Route>
                    <Route path="coursedetails/:courseId" element={<CourseDetails></CourseDetails>}></Route>
                </Route>
                <Route path="/instructor/settings" element={<Settings />} />
                <Route path="/instructor/settings/payment-methods" element={<h1>Payment Methods</h1>} />
                <Route path="/instructor/reports" element={<h1>Reports Section</h1>} />
                <Route path="/instructor/logout" element={<h1>Logging out...</h1>} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
   )
}
function Users(){
    return (
    <h1>This is users page</h1>
    )

}

export default InstructorRoutes