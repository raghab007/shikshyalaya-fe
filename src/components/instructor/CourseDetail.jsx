import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CourseDetails() {
    const { courseId } = useParams();
    const [sections, setSections] = useState([]);
    const [error, setError] = useState(false);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [isEditingCourse, setIsEditingCourse] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [sectionName, setSectionName] = useState("");
    const [sectionDescription, setSectionDescription] = useState("");
    const [course, setCourse] = useState(null);
    const [editedCourse, setEditedCourse] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        getSections();
    }, []);

    useEffect(() => {
        if (course) {
            setEditedCourse({
                name: course.courseName,
                description: course.courseDescription,
                price: course.coursePrice
            });
        }
    }, [course]);

    async function getSections() {
        try {
            const response = await axios.get(`http://localhost:8085/course/${courseId}`);
            setCourse(response.data);
            setSections(response.data.sections || []);
        } catch (error) {
            console.error("Error fetching course details:", error);
            setError(true);
        }
    }

    async function addSection(e) {
        e.preventDefault();
        const section = {
            name: sectionName,
            description: sectionDescription
        };
        
        try {
            const response = await axios.post(
                `http://localhost:8085/instructor/course/${courseId}/section`, 
                section, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            if (response.status === 200) {
                getSections();
                setIsAddingSection(false);
                setSectionName("");
                setSectionDescription("");
                
                // Show success message with fade out
                const successMessage = document.createElement("div");
                successMessage.innerText = "Section added successfully";
                successMessage.className = "fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg";
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.classList.add("opacity-0", "transition-opacity", "duration-500");
                    setTimeout(() => document.body.removeChild(successMessage), 500);
                }, 3000);
            }
        } catch (error) {
            console.error("Error adding section:", error);
            alert("Failed to add section. Please try again.");
        }
    }

    const handleChangeImage = () => {
        alert("Change image functionality to be implemented.");
    };

    const handleEditCourseClick = () => {
        setIsEditingCourse(true);
    };

    const handleCancelEdit = () => {
        setIsEditingCourse(false);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse({
            ...editedCourse,
            [name]: value
        });
    };

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8085/course/${courseId}`,
                editedCourse,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setCourse({
                ...course,
                courseName: editedCourse.name,
                courseDescription: editedCourse.description,
                coursePrice: editedCourse.price
            });
            setIsEditingCourse(false);
            
            // Show success notification
            const successMessage = document.createElement("div");
            successMessage.innerText = "Course updated successfully";
            successMessage.className = "fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg";
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.classList.add("opacity-0", "transition-opacity", "duration-500");
                setTimeout(() => document.body.removeChild(successMessage), 500);
            }, 3000);
        } catch (error) {
            console.error('Error saving course details:', error);
            alert("Failed to update course details. Please try again.");
        }
    };

    const handleDeleteCourse = async () => {
        try {
            await axios.delete(`http://localhost:8085/course/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Show success notification
            const successMessage = document.createElement("div");
            successMessage.innerText = "Course deleted successfully";
            successMessage.className = "fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg";
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                window.location.href = "/courses";
            }, 1500);
        } catch (error) {
            console.error('Error deleting course:', error);
            alert("Failed to delete the course.");
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Course</h1>
                    <p className="text-gray-600 mb-4">We couldn't fetch the course details. Please try again later.</p>
                    <button 
                        onClick={() => window.location.href = "/courses"} 
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mb-2.5"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Course Header */}
                <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 rounded-xl shadow-xl p-8 mb-8 text-white transform transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        {/* Course Image */}
                        <div className="relative group flex-shrink-0 w-72 h-48 rounded-lg overflow-hidden">
                            <img
                                src={`http://localhost:8085/images/course/${course.imageUrl}`}
                                alt={course.courseName}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                <button
                                    onClick={handleChangeImage}
                                    className="text-white px-3 py-1 bg-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-500 transition"
                                >
                                    Change Image
                                </button>
                            </div>
                        </div>
                        {/* Course Details */}
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-3xl font-bold mb-2">{course.courseName}</h1>
                            <p className="text-indigo-100 text-lg mb-4">{course.courseDescription}</p>
                            <div className="flex flex-col lg:flex-row gap-3 items-center">
                                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-lg font-semibold">
                                    Price: {course.coursePrice}
                                </span>
                                <span className="bg-white/10 text-indigo-100 px-4 py-2 rounded-full text-sm">
                                    Course ID: {courseId}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Course Overview */}
                        <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                                </svg>
                                Course Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                This course provides in-depth knowledge on modern web development.
                                Instructors can add sections, manage content, and track student progress.
                            </p>
                        </div>

                        {/* Manage Sections */}
                        <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                Course Sections
                            </h2>
                            <div className="space-y-4">
                                {sections.length === 0 ? (
                                    <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <p className="text-gray-500">No sections have been added to this course yet.</p>
                                    </div>
                                ) : (
                                    sections.map((section, index) => (
                                        <div 
                                            key={index} 
                                            className="border-l-4 border-indigo-400 bg-indigo-50 p-4 rounded-lg transition-all duration-200 hover:shadow-md hover:border-indigo-600"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{section.name}</h3>
                                                    <p className="text-gray-600 mt-1">{section.description}</p>
                                                </div>
                                                <Link 
                                                    to={`/instructor/videos/${section.sectionId}`}
                                                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Manage
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <button
                                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center font-medium"
                                onClick={() => setIsAddingSection(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add New Section
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Course Actions */}
                        <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                                Course Actions
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    className="w-full px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center font-medium"
                                    onClick={handleEditCourseClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit Course Details
                                </button>
                                <button className="w-full px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center justify-center font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    View Student Progress
                                </button>
                                <button
                                    className="w-full px-4 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center justify-center font-medium"
                                    onClick={() => setIsDeleteConfirmationOpen(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Delete Course
                                </button>
                            </div>
                        </div>

                        {/* Course Stats */}
                        <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                </svg>
                                Course Stats
                            </h2>
                            <dl className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <dt className="text-gray-600 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                                        </svg>
                                        Total Sections
                                    </dt>
                                    <dd className="text-gray-800 font-medium bg-indigo-100 py-1 px-3 rounded-full">
                                        {sections.length}
                                    </dd>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <dt className="text-gray-600 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        Total Duration
                                    </dt>
                                    <dd className="text-gray-800 font-medium bg-indigo-100 py-1 px-3 rounded-full">
                                        35 hours
                                    </dd>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <dt className="text-gray-600 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                        Enrolled Students
                                    </dt>
                                    <dd className="text-gray-800 font-medium bg-indigo-100 py-1 px-3 rounded-full">
                                        1,234
                                    </dd>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <dt className="text-gray-600 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        Last Updated
                                    </dt>
                                    <dd className="text-gray-800 font-medium bg-indigo-100 py-1 px-3 rounded-full">
                                        March 15, 2024
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Section Modal */}
            {isAddingSection && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div 
                        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all animate-fadeIn"
                        style={{animation: "fadeIn 0.3s ease-out"}}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-indigo-800">Add New Section</h3>
                            <button 
                                onClick={() => setIsAddingSection(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={addSection}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Section Name
                                    </label>
                                    <input
                                        type="text"
                                        id="sectionName"
                                        name="sectionName"
                                        value={sectionName}
                                        onChange={(e) => setSectionName(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sectionDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="sectionDescription"
                                        name="sectionDescription"
                                        value={sectionDescription}
                                        onChange={(e) => setSectionDescription(e.target.value)}
                                        rows="3"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingSection(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Save Section
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Course Modal */}
            {isEditingCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div 
                        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all animate-fadeIn"
                        style={{animation: "fadeIn 0.3s ease-out"}}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-indigo-800">Edit Course Details</h3>
                            <button 
                                onClick={handleCancelEdit}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSaveCourse}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Course Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={editedCourse.name}
                                        onChange={handleEditInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={editedCourse.description}
                                        onChange={handleEditInputChange}
                                        rows="3"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={editedCourse.price}
                                        onChange={handleEditInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteConfirmationOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div 
                        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all animate-fadeIn"
                        style={{animation: "fadeIn 0.3s ease-out"}}
                    >
                        <h3 className="text-xl font-bold text-red-600 mb-6">Delete Course</h3>
                        <p className="text-gray-700 mb-8">Are you sure you want to delete this course? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleteConfirmationOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteCourse}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}