import React from 'react';
import { Link } from 'react-router-dom';

export default function BasicCard({ courseId, price, description, title, imageSrc, rating, studentsEnrolled, isBestseller }) {
  return (
    <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="h-40 w-full relative">
        <img
          src={"http://localhost:8085" + imageSrc}
          alt={title}
          className="object-cover w-full h-full"
        />
        {/* Bestseller Badge */}
        {isBestseller && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold text-black px-2 py-1 rounded">
            Bestseller
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-grow">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {description}
        </p>

        {/* Rating and Students Enrolled */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-yellow-500 font-bold">{rating}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.41 9.384c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">({studentsEnrolled} students)</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-xs text-gray-500">Total Price:</p>
          <p className="text-lg font-bold text-gray-900">Rs {price}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 border-t border-gray-100">
        {/* View Course Button */}
        <Link to={`/coursedetails/${courseId}`}>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            View Course
          </button>
        </Link>

        {/* Add to Cart Button */}
        <button className="w-full mt-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}