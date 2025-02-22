import React from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
    const { courseId } = useParams();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Course Header */}
                <div className="bg-indigo-700 rounded-lg shadow-lg p-6 mb-8 text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Manage Course: Advanced Web Development</h1>
                            <p className="opacity-90">Course ID: {courseId}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Course Overview */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Overview</h2>
                            <p className="text-gray-600 leading-relaxed">
                                This course provides in-depth knowledge on modern web development. 
                                Instructors can add lessons, manage content, and track student progress.
                            </p>
                        </div>

                        {/* Manage Lessons */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Lessons</h2>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((section) => (
                                    <div key={section} className="border-l-4 border-indigo-200 bg-gray-50 p-4 rounded">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium text-gray-800">Section {section}: Advanced Concepts</h3>
                                                <p className="text-sm text-gray-600 mt-1">5 Videos • 2h 30m</p>
                                            </div>
                                            <button className="text-indigo-600 hover:underline">Edit</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
                                + Add New Lesson
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Course Actions */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Actions</h2>
                            <div className="grid grid-cols-1 gap-3">
                                <button className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                                    Edit Course Details
                                </button>
                                <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                                    View Student Progress
                                </button>
                                <button className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition">
                                    Delete Course
                                </button>
                            </div>
                        </div>

                        {/* Course Stats */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Stats</h2>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Total Lessons</dt>
                                    <dd className="text-gray-800 font-medium">12</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Total Duration</dt>
                                    <dd className="text-gray-800 font-medium">35 hours</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Enrolled Students</dt>
                                    <dd className="text-gray-800 font-medium">1,234</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Last Updated</dt>
                                    <dd className="text-gray-800 font-medium">March 15, 2024</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
