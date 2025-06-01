import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaUsers,
  FaClock,
  FaBookmark,
  FaChalkboardTeacher,
  FaCertificate,
} from "react-icons/fa";

// Shiskhyalaya theme colors with #02084b as primary
const theme = {
  primary: "#02084b", // Main dark blue
  primaryLight: "#e6e7f0", // Light blue background
  primaryDark: "#010530", // Darker blue
  secondary: "#3a3f73", // Secondary blue
  accent: "#FF9800", // Orange for highlights
  text: {
    primary: "#212121", // Dark gray for main text
    secondary: "#616161", // Medium gray for secondary text
    light: "#9E9E9E", // Light gray for subtle text
  },
  background: {
    light: "#F5F5F5", // Light background
    white: "#FFFFFF", // White background
  },
  status: {
    success: "#4CAF50", // Green for success
    warning: "#FF9800", // Orange for warning
    error: "#F44336", // Red for error
  },
};

const CourseCard = ({
  courseId,
  title = "Untitled Course",
  instructorName,
  imageSrc,
  price,
  originalPrice,
  rating,
  studentsEnrolled = 0,
  isBestseller = false,
  categories = [],
  duration = "10h 30m",
  level = "Beginner",
  totalRatings,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Helper functions
  const calculateDiscount = () => {
    if (!originalPrice || !price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const formatStudentCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // UI Components
  const RatingStars = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-amber-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-500" />);
      }
    }

    return <div className="flex items-center">{stars}</div>;
  };

  const CategoryBadges = () => (
    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
      {categories.slice(0, 2).map((category, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-800 rounded-full shadow-sm"
        >
          {category}
        </span>
      ))}
    </div>
  );

  const BadgesSection = () => (
    <div className="absolute top-3 right-3 flex flex-col gap-2">
      {isBestseller && (
        <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-sm">
          Bestseller
        </span>
      )}
      {calculateDiscount() && (
        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
          {calculateDiscount()}% OFF
        </span>
      )}
    </div>
  );

  const CourseInfo = () => (
    <div className="absolute bottom-3 left-3 right-3 text-white font-medium">
      <h2 className="text-lg font-bold text-white line-clamp-2 drop-shadow-md">
        {title}
      </h2>

      <div className="flex items-center mt-2 gap-2 text-xs text-gray-200">
        <span className="px-2 py-0.5 bg-[#02084b]/70 rounded-full">
          {level}
        </span>
      </div>
    </div>
  );

  const CourseImageSection = () => (
    <div className="h-48 w-full relative group">
      <img
        src={
          imageSrc
            ? `http://localhost:8085/files/course/images/${imageSrc}`
            : "/images/course-placeholder.jpg"
        }
        alt={title}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <CategoryBadges />
      <BadgesSection />
      <CourseInfo />
    </div>
  );

  const RatingAndStudentsSection = () => (
    <div className="flex items-center justify-between mt-3 bg-[#e6e7f0] p-2 rounded-lg">
      <div className="flex items-center gap-2">
        {rating ? (
          <>
            <div className="flex items-center bg-white px-2 py-1 rounded">
              <span className="text-amber-500 font-bold mr-1">
                {rating.toFixed(1)}
              </span>
              <RatingStars rating={rating} />
            </div>
            <span className="text-xs text-gray-600">
              ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
            </span>
          </>
        ) : (
          <span className="text-sm text-gray-500">Not rated yet</span>
        )}
      </div>

      <div className="flex items-center text-gray-600 bg-white px-2 py-1 rounded">
        <FaUsers className="mr-1 text-[#02084b]" size={12} />
        <span className="text-xs font-medium">
          {formatStudentCount(studentsEnrolled)}
        </span>
      </div>
    </div>
  );

  const PriceSection = () => (
    <div className="mt-4 flex items-end">
      <p className="text-xl font-bold text-gray-900">
        {price ? `Rs ${price}` : "Free"}
      </p>
      {originalPrice && (
        <p className="text-sm text-gray-500 line-through ml-2">
          Rs {originalPrice}
        </p>
      )}
    </div>
  );

  // Main render
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="w-72 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl 
                   transition-all duration-300 flex flex-col h-full border border-gray-100"
    >
      <CourseImageSection />

      <div className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-gray-500 mr-1" size={14} />
            <p className="text-sm text-gray-600 font-medium truncate">
              {instructorName || "Instructor"}
            </p>
          </div>
        </div>

        <RatingAndStudentsSection />
        <PriceSection />
      </div>

      <div className="p-4 pt-2">
        <Link to={`/coursedetails/${courseId}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#02084b] hover:bg-[#010530] text-white px-4 py-2.5 rounded-lg 
                          text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#02084b] 
                          focus:ring-offset-2 transition-colors shadow-sm"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
