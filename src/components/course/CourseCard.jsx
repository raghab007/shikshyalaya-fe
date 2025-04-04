import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt, FaUsers, FaClock, FaBookmark } from 'react-icons/fa';

export default function CourseCard({ 
  courseId, 
  price, 
  originalPrice, 
  title, 
  instructorName, 
  imageSrc, 
  rating, 
  studentsEnrolled, 
  isBestseller = false, 
  categories = [],
  duration = "10h 30m", // New prop with default value
  level = "Beginner", // New prop with default value
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
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
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };
  
  // Handle bookmark toggle
  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="w-72 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      {/* Image Section with Gradient Overlay */}
      <div className="h-48 w-full relative group">
        <img
          src={imageSrc ? `http://localhost:8085${imageSrc}` : "/images/course-placeholder.jpg"}
          alt={title || "Course Image"}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Course Categories */}
        {categories && categories.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category, index) => (
              <span key={index} className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                {category}
              </span>
            ))}
            {categories.length > 2 && (
              <span className="bg-gray-700/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                +{categories.length - 2}
              </span>
            )}
          </div>
        )}
        
        {/* Bestseller and Discount Badge */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          {isBestseller && (
            <div className="bg-amber-400 text-xs font-bold text-black px-2 py-1 rounded-md shadow-sm">
              Bestseller
            </div>
          )}
          {discountPercentage && (
            <div className="bg-red-500 text-xs font-bold text-white px-2 py-1 rounded-md shadow-sm">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
        
        {/* Bookmark button */}
        <button 
          onClick={toggleBookmark}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isBookmarked ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        >
          <FaBookmark className={isBookmarked ? "text-white" : "text-gray-700"} />
        </button>
        
        {/* Course Preview on hover */}
        <div className="absolute bottom-3 left-3 right-3 text-white font-medium">
          <h2 className="text-lg font-bold text-white line-clamp-2 drop-shadow-md">
            {title || "Untitled Course"}
          </h2>
          
          {/* Course Level */}
          <div className="flex items-center mt-1 text-xs text-gray-200">
            <span className="px-2 py-0.5 bg-gray-700/60 rounded-full">
              {level? level:"Not specified"}
            </span>
            <span className="flex items-center ml-2">
              <FaClock className="mr-1" size={10} />
              {duration}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
         
            <p className="text-sm text-gray-700 font-medium truncate">
              {instructorName}
            </p>
          </div>
        </div>

        {/* Rating and Students */}
        <div className="flex items-center justify-between mt-3 bg-gray-50 p-2 rounded-lg">
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
          
          <div className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded">
            <FaUsers className="mr-1 text-blue-600" size={12} />
            <span className="text-xs font-medium">{formatStudentCount(studentsEnrolled || 0)}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-4 flex items-end">
          <p className="text-xl font-bold text-gray-900">Rs {price || "Free"}</p>
          {originalPrice && (
            <p className="text-sm text-gray-500 line-through ml-2">Rs {originalPrice}</p>
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="p-4 pt-2">
        <div className="grid grid-cols-5 gap-2">
          <Link to={`/coursedetails/${courseId}`} className="col-span-5">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}