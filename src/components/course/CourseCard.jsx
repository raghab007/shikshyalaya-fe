import React from 'react';
import { Link } from 'react-router-dom';

export default function BasicCard({ courseId, price, description, title, imageSrc }) {

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden relative flex flex-col h-full transition-transform transform hover:scale-105 hover:border-blue-500 border-2 border-transparent">
      {/* Image */}
      <div className="bg-gray-100 h-48 w-full relative">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-full h-full"
        />
        {/* Bookmark Button */}
        <button
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label="Bookmark course"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3.75v16.5l6.75-4.5 6.75 4.5V3.75a.75.75 0 00-.75-.75H7.5a.75.75 0 00-.75.75z"
            />
          </svg>
        </button>
      </div>

      {/* Title and Description */}
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{description}</p>
      </div>

      {/* Price and View Button */}
      <div className="px-6 pb-6 flex justify-between items-center border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Price:</p>
          <p className="text-xl font-bold text-gray-900">Rs {price}</p>
        </div>
        <Link to={`/coursedetails/${courseId}`}>
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            View Course
          </button>
        </Link>
      </div>

      {/* Add to Cart Button */}
      <div className="px-6 pb-6">
        <button
          className="w-full border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}