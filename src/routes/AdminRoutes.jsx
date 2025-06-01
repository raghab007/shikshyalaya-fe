import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from "../components/admin/Admin";
import ErrorPage from "../pages/Error";
import Instructors from "../components/admin/Instructors";
import Courses from "../components/admin/Courses";
import Users from "../components/admin/Users";
import Dashboard from "../components/admin/Dashboard";
import CourseDetails from '../components/admin/CourseDetails';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
