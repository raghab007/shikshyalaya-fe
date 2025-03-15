import axios from "axios";
import React, { useState } from "react";

function EnrolledStudents() {
    // Static data for enrolled students
    const enrolledStudents = [
        { id: 1, name: "Raghab Pokhrel", email: "john.doe@example.com", course: "React Basics", enrollmentDate: "2023-10-01" },
        { id: 2, name: "Aastha Aryal ", email: "jane.smith@example.com", course: "Advanced JavaScript", enrollmentDate: "2023-10-02" },
        { id: 3, name: "Niroj Panta", email: "alice.johnson@example.com", course: "React Basics", enrollmentDate: "2023-10-03" },
        { id: 4, name: "Pemba Lama", email: "bob.brown@example.com", course: "Node.js Fundamentals", enrollmentDate: "2023-10-04" },
        { id: 5, name: "Alish Sunuwar", email: "charlie.davis@example.com", course: "Advanced JavaScript", enrollmentDate: "2023-10-05" },
    ];

    // State for filters
    const [courseFilter, setCourseFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // Get unique course titles for the dropdown
    const uniqueCourses = [...new Set(enrolledStudents.map((student) => student.course))];

    // Filtered students based on course and date
    const filteredStudents = enrolledStudents.filter((student) => {
        const matchesCourse = courseFilter ? student.course === courseFilter : true;
        const matchesDate = dateFilter ? student.enrollmentDate === dateFilter : true;
        return matchesCourse && matchesDate;
    });



    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Enrolled Students</h1>

                {/* Filter Section */}
                <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Course</label>
                        <select
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Courses</option>
                            {uniqueCourses.map((course, index) => (
                                <option key={index} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Course
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Enrollment Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{student.course}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{student.enrollmentDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EnrolledStudents;