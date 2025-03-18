import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnrolledCourseCard({
  courseId,
  courseInstructor = "Raghab Pokhrel",
  courseName,
  courseImageSrc,
  courseDescription
}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="group relative w-72 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      {/* Course card */}
      <div
        className="h-full flex flex-col cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={`http://localhost:8085/images/course/${courseImageSrc}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            alt={`${courseName} cover`}
          />
          {/* Overlay with play button */}
          <div className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-grow flex flex-col" onClick={handleClick}>
          <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">{courseName}</h3>
          <p className="text-gray-600 text-sm mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {courseInstructor}
          </p>
          
          {courseDescription && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-3">{courseDescription}</p>
          )}
        </div>

        {/* Footer with chat button */}
        <div className="px-5 pb-4 mt-auto">
          <Link
            to={`/chat/${courseId}`}
            className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md transition-colors duration-300 font-medium"
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Course Chat
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourseCard;