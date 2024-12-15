import React from 'react';
import { Link } from 'react-router-dom';

export default function BasicCard({ price, description, title, imageSrc }) {
  return (
    <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col h-full">
      {/* Title and Description */}
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
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

      {/* Image */}
      <div className="bg-gray-100 h-48 w-full">
        <img
          src={imageSrc}
          alt={description}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Price and View Button */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Total price:</p>
          <p className="text-lg font-bold text-gray-800">Rs {price}</p>
        </div>
        <Link to="/coursedetails">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            View Course
          </button>
        </Link>
      </div>

      {/* Add to Cart Button */}
      <div className="p-4 mt-auto">
        <button
          className="w-full border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}