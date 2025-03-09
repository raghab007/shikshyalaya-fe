import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ courseId, price, originalPrice, title, instructor, imageSrc, rating, studentsEnrolled, isBestseller = false }) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="h-40 w-full relative">
        <img
          src={imageSrc ? "http://localhost:8085" + imageSrc : "placeholder.jpg"}
          alt={title || "Course Image"}
          className="object-cover w-full h-full"
        />
        {isBestseller && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold text-black px-2 py-1 rounded">
            Bestseller
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-md font-bold text-gray-900 line-clamp-2">{title || "Untitled Course"}</h2>
        <p className="text-sm text-gray-600">{instructor || "Unknown Instructor"}</p>

        {/* Rating and Students Count */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-yellow-500 font-bold">{rating || "N/A"}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${rating && i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.41 9.384c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">({studentsEnrolled || 0})</span>
        </div>

        {/* Price Section */}
        <div className="mt-2">
          <p className="text-lg font-bold text-gray-900">Rs {price || "N/A"}</p>
          {originalPrice && (
            <p className="text-sm text-gray-500 line-through">Rs {originalPrice}</p>
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="p-4 border-t border-gray-100">
        <Link to={`/coursedetails/${courseId}`}>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            View Course
          </button>
        </Link>
        <button className="w-full mt-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
