import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt, FaUsers } from 'react-icons/fa';

export default function CourseCard({ courseId, price, originalPrice, title, instructor, imageSrc, rating, studentsEnrolled, isBestseller = false, categories = [] }) {
  // Calculate discount percentage if both prices are available
  const discountPercentage = originalPrice && price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : null;
    
  // Generate stars based on rating
  const generateRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };
  
  // Format student count (e.g., 1000 => 1k)
  const formatStudentCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };

  return (
    <div className="w-72 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section with Gradient Overlay */}
      <div className="h-48 w-full relative">
        <img
          src={imageSrc ? "http://localhost:8085" + imageSrc : "/images/course-placeholder.jpg"}
          alt={title || "Course Image"}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Course Categories */}
        {categories && categories.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category, index) => (
              <span key={index} className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                {category}
              </span>
            ))}
          </div>
        )}
        
        {/* Bestseller and Discount Badge */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          {isBestseller && (
            <div className="bg-amber-400 text-xs font-bold text-black px-2 py-1 rounded-md">
              Bestseller
            </div>
          )}
          {discountPercentage && (
            <div className="bg-red-500 text-xs font-bold text-white px-2 py-1 rounded-md">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
        
        {/* Instructor Preview on hover */}
        <div className="absolute bottom-3 left-3 right-3 text-white font-medium">
          <h2 className="text-lg font-bold text-white line-clamp-2 drop-shadow-md">
            {title || "Untitled Course"}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="text-sm text-gray-600 flex items-center mb-2">
          <img 
            src="/images/instructor-placeholder.jpg"
            alt={instructor}
            className="w-5 h-5 rounded-full mr-2 object-cover"
          />
          {instructor || "Unknown Instructor"}
        </p>

        {/* Rating and Students */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {rating ? (
              <>
                <span className="text-yellow-500 font-bold mr-1">{rating.toFixed(1)}</span>
                <div className="flex items-center">
                  {generateRatingStars(rating)}
                </div>
              </>
            ) : (
              <span className="text-sm text-gray-500">Not rated yet</span>
            )}
          </div>
          
          <div className="flex items-center text-gray-600">
            <FaUsers className="mr-1" />
            <span className="text-sm">{formatStudentCount(studentsEnrolled || 0)}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-3 flex items-end">
          <p className="text-lg font-bold text-gray-900">Rs {price || "Free"}</p>
          {originalPrice && (
            <p className="text-sm text-gray-500 line-through ml-2">Rs {originalPrice}</p>
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="grid grid-cols-5 gap-2">
          <Link to={`/coursedetails/${courseId}`} className="col-span-3">
            <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              View Details
            </button>
          </Link>
          <button className="col-span-2 flex items-center justify-center border border-blue-600 text-blue-600 px-2 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            <FaShoppingCart className="mr-1" />
            Cart
          </button>
        </div>
      </div>
    </div>
  );
}