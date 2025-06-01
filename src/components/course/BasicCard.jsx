import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import RatingStars from '../RatingStars';

const BasicCard = ({
  courseId,
  price,
  description,
  title,
  imageSrc,
  difficulty,
  duration,
  category,
  instructorName,
  studentsEnrolled,
  level,
  rating,
  totalRatings,
  originalPrice,
  isEnrolled
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCardClick = () => {
    navigate(`/course/${courseId}`);
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isEnrolled) {
      navigate(`/course/${courseId}`);
      return;
    }
    navigate(`/payment/${courseId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={handleCardClick}>
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <RatingStars rating={rating} />
            <span className="text-sm text-gray-600 ml-2">
              {rating ? `${rating.toFixed(1)} (${totalRatings})` : 'Not rated yet'}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {studentsEnrolled} students
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold text-blue-600">${price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleEnrollClick}
            className={`px-4 py-2 rounded ${
              isEnrolled
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors duration-300`}
          >
            {isEnrolled ? 'Go to Course' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicCard; 