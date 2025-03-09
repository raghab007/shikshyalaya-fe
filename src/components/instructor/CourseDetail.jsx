import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
    const { courseId } = useParams();
    const [sections, setSections] = useState([]);
    const [error, setError] = useState(false);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [isEditingCourse, setIsEditingCourse] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [newSection, setNewSection] = useState({
        name: "",
        description: ""
    });

    const [sectionName, setSectionName] =useState(null);
    const [sectionDescription, setSectionDescription] = useState(null)
    const [course, setCourse] = useState(null);
    const [editedCourse, setEditedCourse] = useState({ ...course });
    const token = localStorage.getItem("token")

    console.log(sectionName, sectionDescription)

    useEffect(function () {
        async function getSections() {
            try {
                const response = await axios.get(`http://localhost:8085/course/` + courseId);
                console.log(response);
                setCourse(response.data);
                setSections(response.data.sections);
            } catch (error) {
                setError(true);
            }
        }

        getSections();
    }, [courseId]);



    const addSection  = (e)=>{
        e.preventDefault()
        const section = {
            name: sectionName,
            description:sectionDescription
        }

      

        console.log(section)
        const response  = axios.post(`http://localhost:8085/instrcutor/course/${courseId}/section`,)
    }

    const handleAddSectionClick = () => {
        setIsAddingSection(true);
    };

    const handleCancelAdd = () => {
        setIsAddingSection(false);
       
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSection({
            ...newSection,
            [name]: value
        });
    };

    const handleSubmitSection = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/courses/${courseId}/sections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSection),
            });
            const data = await response.json();
            setSections([...sections, data]);
            setIsAddingSection(false);
            setNewSection({
                name: "",
                description: ""
            });
        } catch (error) {
            console.error('Error saving section:', error);
        }
    };

    const handleChangeImage = () => {
        alert("Change image functionality to be implemented.");
    };

    const handleEditCourseClick = () => {
        setIsEditingCourse(true);
        setEditedCourse({ ...course });
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
            const response = await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedCourse),
            });
            const data = await response.json();
            setCourse(data);
            setIsEditingCourse(false);
        } catch (error) {
            console.error('Error saving course details:', error);
        }
    };

    const handleDeleteCourse = async () => {
        try {
            await axios.delete(`http://localhost:8085/course/${courseId}`);
            alert("Course deleted successfully!");
            window.location.href = "/courses";
        } catch (error) {
            console.error('Error deleting course:', error);
            alert("Failed to delete the course.");
        }
    };

    if (course == null) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error fetching course details</h1>;
    }

    if (sections == null) {
        return <h1>Loading courses</h1>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Course Header */}
                <div className="bg-indigo-700 rounded-lg shadow-lg p-6 mb-8 text-white">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Course Image */}
                        <div className="relative group flex-shrink-0 w-64 h-36">
                            <img
                                src={"http://localhost:8085/images/course/" + course.imageUrl}
                                alt="Course"
                                className="w-full h-full object-cover rounded-lg shadow-md"
                            />
                            <button
                                onClick={handleChangeImage}
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                            >
                                <span className="text-white text-sm font-medium">Change Image</span>
                            </button>
                        </div>
                        {/* Course Details */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">{course.courseName}</h1>
                            <p className="opacity-90 mt-2">{course.courseDescription}</p>
                            <div className="mt-4">
                                <span className="text-lg font-semibold">{course.coursePrice}</span>
                            </div>
                            <p className="opacity-90 mt-2">Course ID: {courseId}</p>
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
                                Instructors can add sections, manage content, and track student progress.
                            </p>
                        </div>

                        {/* Manage Sections */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Sections</h2>
                            <div className="space-y-4">
                                {sections.map((section, index) => (
                                    <div key={index} className="border-l-4 border-indigo-200 bg-gray-50 p-4 rounded">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium text-gray-800">{section.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                                            </div>
                                            <button className="text-indigo-600 hover:underline">Edit</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
                                onClick={handleAddSectionClick}
                            >
                                + Add New Section
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Course Actions */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Actions</h2>
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                                    onClick={handleEditCourseClick}
                                >
                                    Edit Course Details
                                </button>
                                <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                                    View Student Progress
                                </button>
                                <button
                                    className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
                                    onClick={() => setIsDeleteConfirmationOpen(true)}
                                >
                                    Delete Course
                                </button>
                            </div>
                        </div>

                        {/* Course Stats */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Stats</h2>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Total Sections</dt>
                                    <dd className="text-gray-800 font-medium">{sections.length}</dd>
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

            {/* Add Section Modal */}
            {isAddingSection && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="font-medium text-indigo-800 mb-3">Add New Section</h3>
                        <form onSubmit={handleSubmitSection}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Section Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={e=>setSectionName(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        onChange= {(e)=>setSectionDescription(e.target.value)}
                                        rows="3"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCancelAdd}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                       onClick={addSection}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="font-medium text-indigo-800 mb-3">Edit Course Details</h3>
                        <form onSubmit={handleSaveCourse}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="font-medium text-red-600 mb-4">Delete Course</h3>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this course? This action cannot be undone.</p>
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