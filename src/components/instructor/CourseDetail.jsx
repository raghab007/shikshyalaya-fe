import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

export default function CourseDetails() {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(false);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isDeleteSectionConfirmationOpen, setIsDeleteSectionConfirmationOpen] =
    useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [course, setCourse] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    name: "",
    description: "",
    price: 0,
    difficulty: "BEGINNER",
    categoryId: 1,
  });
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getCourseDetails();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (course) {
      setEditedCourse({
        name: course.courseName,
        description: course.courseDescription,
        price: course.coursePrice,
        difficulty: course.courseDifficulty,
        categoryId: course.category?.courseCategoryId || 1,
      });
    }
  }, [course]);

  async function getCourseDetails() {
    try {
      const response = await axios.get(
        `http://localhost:8085/course/${courseId}`
      );
      console.log(response.data);
      setCourse(response.data);
      setSections(response.data.sections || []);
      setTotalEnrollments(response.data.totalEnrollments || 0);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError(true);
    }
  }

  async function fetchCategories() {
    try {
      const response = await axios.get(
        "http://localhost:8085/course/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function addSection(e) {
    e.preventDefault();
    const section = {
      name: sectionName,
      description: sectionDescription,
    };

    try {
      const response = await axios.post(
        `http://localhost:8085/instructor/course/${courseId}/section`,
        section,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        getCourseDetails();
        setIsAddingSection(false);
        setSectionName("");
        setSectionDescription("");
        showSuccessMessage("Section added successfully");
      }
    } catch (error) {
      console.error("Error adding section:", error);
      showErrorMessage("Failed to add section. Please try again.");
    }
  }

  async function deleteSection() {
    if (!sectionToDelete) return;

    try {
      await axios.delete(
        `http://localhost:8085/instructor/section/${sectionToDelete.sectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the sections list by filtering out the deleted section
      setSections(
        sections.filter(
          (section) => section.sectionId !== sectionToDelete.sectionId
        )
      );
      setIsDeleteSectionConfirmationOpen(false);
      setSectionToDelete(null);
      showSuccessMessage("Section deleted successfully");
    } catch (error) {
      console.error("Error deleting section:", error);
      showErrorMessage("Failed to delete section. Please try again.");
    }
  }

  const handleDeleteSectionClick = (section) => {
    setSectionToDelete(section);
    setIsDeleteSectionConfirmationOpen(true);
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
      [name]: value,
    });
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8085/instructor/course/${courseId}`,
        {
          courseName: editedCourse.name,
          courseDescription: editedCourse.description,
          coursePrice: editedCourse.price,
          courseDifficulty: editedCourse.difficulty,
          categoryId: editedCourse.categoryId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourse(response.data);
      setIsEditingCourse(false);
      showSuccessMessage("Course updated successfully");
    } catch (error) {
      console.error("Error saving course details:", error);
      showErrorMessage("Failed to update course details. Please try again.");
    }
  };

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      showErrorMessage("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showErrorMessage("Image size should be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.patch(
        `http://localhost:8085/instructor/course/${courseId}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourse((prev) => ({
        ...prev,
        imageUrl: response.data,
      }));

      showSuccessMessage("Course image updated successfully");
    } catch (error) {
      console.error("Error updating course image:", error);
      showErrorMessage("Failed to update course image. Please try again.");
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await axios.delete(
        `http://localhost:8085/instructor/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSuccessMessage("Course deleted successfully");
      setTimeout(() => {
        window.location.href = "/instructor/courses";
      }, 1500);
    } catch (error) {
      console.error("Error deleting course:", error);
      showErrorMessage("Failed to delete the course.");
    }
  };

  const showSuccessMessage = (message) => {
    const successMessage = document.createElement("div");
    successMessage.innerText = message;
    successMessage.className =
      "fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg";
    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.classList.add(
        "opacity-0",
        "transition-opacity",
        "duration-500"
      );
      setTimeout(() => document.body.removeChild(successMessage), 500);
    }, 3000);
  };

  const showErrorMessage = (message) => {
    alert(message);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded shadow text-center">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Course
          </h1>
          <p className="text-gray-600 mb-4">
            We couldn't fetch the course details. Please try again later.
          </p>
          <button
            onClick={() => (window.location.href = "/courses")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
          <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Course Header */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Course Image */}
          <div className="relative w-full md:w-64 h-48">
            <img
              src={`http://localhost:8085/files/course/images/${course.imageUrl}`}
              alt={course.courseName}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-2 right-2">
              <label className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-600">
                Change Image
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChangeImage}
                />
              </label>
            </div>
          </div>
          {/* Course Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{course.courseName}</h1>
            <p className="text-gray-600 mb-4">{course.courseDescription}</p>
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Price: {course.coursePrice}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {course.courseDifficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Course Sections */}
          <div className="bg-white rounded shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Course Sections</h2>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 flex items-center gap-1"
                onClick={() => setIsAddingSection(true)}
              >
                <FaPlus size={12} />
                Add Section
              </button>
            </div>

            {sections.length === 0 ? (
              <div className="border border-dashed border-gray-300 rounded p-4 text-center">
                <p className="text-gray-500">
                  No sections have been added to this course yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-400 bg-gray-50 p-4 rounded"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{section.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {section.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/instructor/videos/${section.sectionId}`}
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm flex items-center gap-1"
                        >
                          Manage
                        </Link>
                        <button
                          onClick={() => handleDeleteSectionClick(section)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 text-sm flex items-center justify-center"
                          title="Delete Section"
                        >
                          <FaTrash size={12} />
                        </button>
                        <button
                          onClick={() => {
                            // Add your update section logic here
                            // For example, you might want to open a modal to edit the section
                            console.log("Update section:", section);
                          }}
                          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 text-sm flex items-center justify-center"
                          title="Edit Section"
                        >
                          <FaEdit size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Course Actions */}
          <div className="bg-white rounded shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Course Actions</h2>
            <div className="space-y-3">
              <button
                className="w-full px-3 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-sm font-medium flex items-center justify-center gap-2"
                onClick={handleEditCourseClick}
              >
                <FaEdit size={14} />
                Edit Course Details
              </button>
              <button
                className="w-full px-3 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 text-sm font-medium flex items-center justify-center gap-2"
                onClick={() => setIsDeleteConfirmationOpen(true)}
              >
                <FaTrash size={14} />
                Delete Course
              </button>
            </div>
          </div>

          {/* Course Stats */}
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Course Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Total Sections</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {sections.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Enrolled Students</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {totalEnrollments}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Section Modal */}
      {isAddingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Section</h3>
              <button
                onClick={() => setIsAddingSection(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            <form onSubmit={addSection}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="sectionName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Section Name
                  </label>
                  <input
                    type="text"
                    id="sectionName"
                    name="sectionName"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="sectionDescription"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="sectionDescription"
                    name="sectionDescription"
                    value={sectionDescription}
                    onChange={(e) => setSectionDescription(e.target.value)}
                    rows="3"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingSection(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                  >
                    <FaPlus size={12} />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Course Details</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveCourse}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedCourse.name}
                    onChange={handleEditInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={editedCourse.description}
                    onChange={handleEditInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={editedCourse.price}
                    onChange={handleEditInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label
                    htmlFor="difficulty"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={editedCourse.difficulty}
                    onChange={handleEditInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                  >
                    <FaEdit size={12} />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Course Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Delete Course
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteConfirmationOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCourse}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
              >
                <FaTrash size={12} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Section Confirmation Modal */}
      {isDeleteSectionConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Delete Section
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the section "
              {sectionToDelete?.name}"? This action cannot be undone, and all
              videos in this section will also be deleted.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsDeleteSectionConfirmationOpen(false);
                  setSectionToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteSection}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
              >
                <FaTrash size={12} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
