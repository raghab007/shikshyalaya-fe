import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnrolledCourseCard({ courseId, courseInstructor, courseImageSrc, courseDescription }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the course details page
    navigate(`/course/${courseId}`);
  };

  return (
    <div
      className={`w-72 h-96 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 ease-in-out transform ${
        isHovered ? "scale-105" : "scale-100"
      } bg-white cursor-pointer flex flex-col justify-between`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative w-full h-48 transition-opacity duration-300">
        <img
          src={courseImageSrc}
          className="w-full h-full object-cover"
          alt={`Course ${courseId}`}
        />
        {isHovered && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/27/27223.png" // Replace with your video player logo
              className="w-12 h-12 filter brightness-0 invert"
              alt="Video Player"
            />
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h1 className="text-lg font-bold text-gray-800 mb-2">Course Description: {courseDescription}</h1>
        <h2 className="text-md text-gray-600">Instructor: {courseInstructor}</h2>
      </div>
    </div>
  );
}

export default EnrolledCourseCard;