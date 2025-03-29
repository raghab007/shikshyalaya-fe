import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnrolledCourseCard({
  courseId,
  courseInstructor = "Raghab Pokhrel",
  courseName,
  courseImageSrc,
  courseDescription,
  progress = 0, // Added progress prop with default value
  totalLessons = 0, // Added total lessons count
  completedLessons = 0 // Added completed lessons count
}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${courseId}`);
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : progress;

  return (
    <div className="group relative w-80 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-100">
      {/* Course card */}
      <div
        className="h-full flex flex-col cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container with status badge */}
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={`http://localhost:8085/images/course/${courseImageSrc}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            alt={`${courseName} cover`}
          />
          
          {/* Status badge */}
          <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Enrolled
          </div>
          
          {/* Overlay with play button */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div 
              className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center transform transition-transform duration-300 hover:scale-110 shadow-lg"
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
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
        <div className="p-6 flex-grow flex flex-col" onClick={handleClick}>
          {/* Course title with truncation */}
          <h3 className="font-bold text-gray-800 text-xl mb-2 line-clamp-2 hover:text-blue-600 transition-colors">{courseName}</h3>
          
          {/* Instructor with avatar */}
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mr-2 overflow-hidden">
              {courseInstructor.charAt(0).toUpperCase()}
            </div>
            <p className="text-gray-700 font-medium">{courseInstructor}</p>
          </div>
          
          {/* Course description */}
          {courseDescription && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{courseDescription}</p>
          )}

          {/* Progress bar */}
          <div className="mt-1 mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Your progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            {totalLessons > 0 && (
              <div className="text-xs text-gray-500 mt-1 text-right">
                {completedLessons} of {totalLessons} lessons completed
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6 mt-auto grid grid-cols-2 gap-3">
          <Link
            to={`/course/${courseId}`}
            className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center"
          >
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
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
            Continue
          </Link>
          
          <Link
            to={`/chat/${courseId}`}
            className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center"
          >
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
            Chat
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourseCard;