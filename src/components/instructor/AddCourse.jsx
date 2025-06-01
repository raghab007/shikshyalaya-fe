import { useEffect, useRef, useState } from "react";
import axios from "axios";

function AddCourse() {
  const courseName = useRef(null);
  const courseDescription = useRef(null);
  const coursePrice = useRef(null);
  const courseImage = useRef(null);
  const courseDifficulty = useRef(null);
  const [courseCategory, setCourseCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch course categories on component mount
  useEffect(() => {
    async function fetchCourseCategories() {
      try {
        const response = await axios.get(
          "http://localhost:8085/course/course_category"
        );
        const categories = response.data;
        console.log(categories);
        setAllCategories(categories);
        setCourseCategory(categories[0]?.categoryId || "");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    }

    fetchCourseCategories();
  }, []);

  // Handle course submission
  async function handleAddCourse() {
    const name = courseName.current.value;
    const description = courseDescription.current.value;
    const price = coursePrice.current.value;
    const image = courseImage.current.files[0];
    const difficulty = courseDifficulty.current.value;
    console.log(difficulty);
    console.log(difficulty);

    if (!image) {
      alert("Please upload a course image.");
      return;
    }
    const formData = new FormData();
    formData.append("categoryId", courseCategory);
    formData.append("courseName", name);
    formData.append("courseDescription", description);
    formData.append("coursePrice", price);
    formData.append("courseImage", image);
    formData.append("courseDifficulty", difficulty);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8085/instructor/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsSuccess(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Please try again.");
    }
  }

  if (isLoading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Course</h1>

      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
          <p className="font-medium">Course added successfully!</p>
          <p className="text-sm mt-1">
            Your new course has been created and is now available in your course
            list.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            ref={courseName}
            type="text"
            placeholder="Enter course name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02084b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Description
          </label>
          <input
            ref={courseDescription}
            type="text"
            placeholder="Enter course description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02084b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Price
          </label>
          <input
            ref={coursePrice}
            type="number"
            placeholder="Enter course price"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02084b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            ref={courseDifficulty}
            name="difficulty"
            id="difficulty"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02084b]"
          >
            <option value="BASIC">BASIC</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="ADVANCED">ADVANCED</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Image
          </label>
          <input
            ref={courseImage}
            type="file"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02084b]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Category
          </label>
          <select
            value={courseCategory}
            onChange={(e) => setCourseCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02084b]"
          >
            {allCategories.map((category) => (
              <option
                key={category.categoryId}
                value={category.courseCategoryId}
              >
                {category.courseCategoryName}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddCourse}
          className="w-full py-2 bg-[#02084b] text-white font-semibold rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#02084b] focus:ring-offset-2 transition-all"
        >
          Add Course
        </button>
      </div>
    </div>
  );
}

export default AddCourse;
