import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnrolledCourseCard({
  courseId,
  courseInstructor = "Raghab Pokhrel",
  courseName,
  courseImageSrc,
  courseDescription,
  progress = 0,
  totalLessons = 0,
  completedLessons = 0,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${courseId}`);
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : progress;

  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (progressPercentage < 30) return "bg-yellow-500";
    if (progressPercentage < 70) return "bg-blue-500";
    return "bg-green-500";
  };

  // Format instructor initials
  const getInstructorInitials = () => {
    return courseInstructor
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <div
      className="group w-80 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course image with gradient overlay */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={`http://localhost:8085/files/course/images/${courseImageSrc}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          alt={`${courseName} cover`}
        />

        {/* Permanent subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>

        {/* Continue watching button that appears on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={handleClick}
            className="px-4 py-2.5 bg-white text-blue-600 rounded-full font-medium flex items-center shadow-lg transform transition-transform duration-300 hover:scale-105 border-2 border-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
          </button>
        </div>

        {/* Progress indicator at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-1">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-5 flex flex-col h-56">
        {/* Course title */}
        <h3
          className="font-bold text-gray-800 text-xl mb-2 leading-tight line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleClick}
        >
          {courseName}
        </h3>

        {/* Instructor with styled avatar */}
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium mr-2.5 text-xs shadow-sm">
            {getInstructorInitials()}
          </div>
          <p className="text-gray-700 font-medium text-sm">
            {courseInstructor}
          </p>
        </div>

        {/* Course description */}
        {courseDescription && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {courseDescription}
          </p>
        )}

        {/* Progress section */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs font-medium mb-1.5">
            <span className="text-gray-700">Course Progress</span>
            <span
              className={`font-semibold ${progressPercentage < 30 ? "text-yellow-600" : progressPercentage < 70 ? "text-blue-600" : "text-green-600"}`}
            >
              {Math.round(progressPercentage)}%
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`${getProgressColor()} h-full rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {totalLessons > 0 && (
            <div className="flex justify-between text-xs text-gray-500 mt-1.5">
              <span>
                {completedLessons} of {totalLessons} lessons completed
              </span>
              {progressPercentage === 100 && (
                <span className="text-green-600 font-medium">Completed</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons with improved styling */}
      <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-3 border-t border-gray-100">
        <Link
          to={`/course/${courseId}`}
          className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5"
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
          className="py-2.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-800 text-center rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center border border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5"
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
  );
}

export default EnrolledCourseCard;
