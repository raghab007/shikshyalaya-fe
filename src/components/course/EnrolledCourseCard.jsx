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
    <div className="w-72 bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
      {/* Course image */}
      <div className="relative w-full h-40">
        <img
          src={`http://localhost:8085/files/course/images/${courseImageSrc}`}
          className="w-full h-full object-cover"
          alt={`${courseName} cover`}
        />

        {/* Progress bar at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className={`h-full ${getProgressColor()}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4">
        {/* Course title */}
        <h3
          className="font-semibold text-gray-800 text-lg mb-2 line-clamp-1 cursor-pointer"
          onClick={handleClick}
        >
          {courseName}
        </h3>

        {/* Instructor info */}
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">
            {getInstructorInitials()}
          </div>
          <p className="text-gray-600 text-sm">{courseInstructor}</p>
        </div>

        {/* Progress info */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>

          {totalLessons > 0 && (
            <div className="text-xs text-gray-500">
              {completedLessons} of {totalLessons} lessons completed
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleClick}
            className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white text-center rounded text-sm flex items-center justify-center"
          >
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
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
            Continue
          </button>

          <Link
            to={`/chat/${courseId}`}
            className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center rounded text-sm flex items-center justify-center"
          >
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
