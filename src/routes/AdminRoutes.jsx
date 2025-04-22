import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "../components/admin/Admin";
import ErrorPage from "../pages/Error";
import Instructors from "../components/admin/Instructors";
import Courses from "../components/admin/Courses";
import Users from "../components/admin/Users";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<h1>Admin Dashboard</h1>} />
        <Route path="users" element={<Users />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="courses" element={<Courses />} />
        <Route path="*" element={<ErrorPage />} />{" "}
      </Route>
    </Routes>
  );
}
