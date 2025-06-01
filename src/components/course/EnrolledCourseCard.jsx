import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaVideo, FaTimes, FaUpload, FaSpinner, FaStar } from "react-icons/fa";

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
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hasRated, setHasRated] = useState(false);
  const [showVideoFeedback, setShowVideoFeedback] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [isCheckingRating, setIsCheckingRating] = useState(false);

  // Get JWT token from localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setJwtToken(token);
      checkIfUserHasRated();
    }
  }, []);

  const checkIfUserHasRated = async () => {
    if (!courseId || !jwtToken) return;

    try {
      setIsCheckingRating(true);
      const response = await axios.get(
        `http://localhost:8085/api/rating-reviews/has-rated/${parseInt(courseId)}`,
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        }
      );
      setHasRated(response.data);
      
      // If user has rated, fetch their existing rating
      if (response.data) {
        const ratingResponse = await axios.get(
          `http://localhost:8085/api/rating-reviews/user-course/${parseInt(courseId)}`,
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`
            }
          }
        );
        if (ratingResponse.data) {
          setRating(ratingResponse.data.rating || 0);
          setFeedback(ratingResponse.data.review || '');
        }
      }
    } catch (error) {
      console.error('Error checking rating status:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to check rating status');
      }
    } finally {
      setIsCheckingRating(false);
    }
  };

  const handleClick = () => {
    navigate(`/course/${courseId}`);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    
    if (!jwtToken) {
      toast.error('Authentication required. Please login again.');
      return;
    }

    if (!courseId) {
      toast.error('Course ID is missing');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!feedback.trim()) {
      toast.error('Please provide a review');
      return;
    }

    try {
      setIsSubmittingRating(true);
      const requestPayload = {
        courseId: parseInt(courseId),
        rating: parseInt(rating),
        review: feedback.trim()
      };
      
      console.log('Submitting rating:', requestPayload);

      const response = await axios.post(
        `http://localhost:8085/api/rating-reviews`,
        requestPayload,
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Rating submission response:', response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success('🎉 Thank you for your feedback!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: '#4CAF50',
            color: 'white',
            fontSize: '16px',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }
        });

        setHasRated(true);
        setShowRating(false);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to submit rating. Please try again.');
      }
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type and size
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a valid video file');
        return;
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error('Video file size should be less than 50MB');
        return;
      }
      setVideoFile(file);
    }
  };

  const handleVideoFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast.error('Please select a video file first');
      return;
    }

    if (!jwtToken) {
      toast.error('Authentication required. Please login again.');
      return;
    }

    const formData = new FormData();
    formData.append('videoFile', videoFile);
    formData.append('courseId', courseId);

    try {
      setIsUploading(true);
      const response = await axios.post(
        `http://localhost:8085/api/video-feedback`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${jwtToken}`
          }
        }
      );

      toast.success('🎉 Video feedback submitted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: '#4CAF50',
          color: 'white',
          fontSize: '16px',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      });
      
      setShowVideoFeedback(false);
      setVideoFile(null);
    } catch (error) {
      console.error('Error submitting video feedback:', error);
      toast.error(error.response?.data?.message || 'Failed to submit video feedback', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: '#f44336',
          color: 'white',
          fontSize: '16px',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : progress;

  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (progressPercentage < 30) return "bg-yellow-500";
    if (progressPercentage < 70) return "bg-[#02084b]";
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

  // Star rating component
  const StarRating = ({ value, onRate, onHover, hoverValue }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`h-5 w-5 cursor-pointer ${
              star <= (hoverValue || value)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            onClick={() => onRate(star)}
          />
        ))}
      </div>
    );
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
          <div className="w-6 h-6 bg-[#02084b] rounded-full flex items-center justify-center text-white text-xs mr-2">
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

        {/* Feedback and Rating Section */}
        {showVideoFeedback ? (
          <div className="mb-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-3">
              {videoFile ? (
                <div className="flex flex-col items-center">
                  <FaVideo className="text-blue-500 mb-2" size={24} />
                  <p className="text-sm font-medium text-gray-700">{videoFile.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div 
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaUpload className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm font-medium text-gray-700">Click to upload video</p>
                  <p className="text-xs text-gray-500">MP4, MOV, AVI (Max 50MB)</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowVideoFeedback(false);
                  setVideoFile(null);
                }}
                className="text-xs px-3 py-1 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVideoFeedbackSubmit}
                disabled={!videoFile || isUploading}
                className={`text-xs px-3 py-1 rounded ${
                  !videoFile || isUploading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isUploading ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-1" />
                    Uploading...
                  </span>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </div>
          </div>
        ) : showRating ? (
          <div className="mb-4">
            <form onSubmit={handleRatingSubmit}>
              <div className="mb-2">
                <div className="mb-1">
                  <StarRating 
                    value={rating} 
                    onRate={setRating} 
                    onHover={setHoveredRating} 
                    hoverValue={hoveredRating} 
                  />
                </div>
                <textarea
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded resize-none"
                  rows="2"
                  placeholder="Share your experience with this course"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowRating(false)}
                  className="text-xs text-gray-500"
                  disabled={isSubmittingRating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rating === 0 || isSubmittingRating}
                  className={`text-xs px-2 py-1 rounded ${
                    rating === 0 || isSubmittingRating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#02084b] text-white hover:bg-[#0a1e6f]"
                  }`}
                >
                  {isSubmittingRating ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-1" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mb-4 flex justify-between items-center">
            {isCheckingRating ? (
              <div className="flex items-center">
                <FaSpinner className="animate-spin h-4 w-4 text-gray-400" />
              </div>
            ) : hasRated ? (
              <div className="flex items-center">
                <StarRating value={rating} onRate={() => {}} onHover={() => {}} hoverValue={0} />
                <span className="text-xs text-gray-500 ml-1">Rated</span>
              </div>
            ) : (
              <button
                onClick={() => setShowRating(true)}
                className="text-xs text-[#02084b] hover:text-[#0a1e6f] flex items-center"
              >
                <FaStar className="h-4 w-4 mr-1" />
                Rate Course
              </button>
            )}
          </div>
        )}

        {/* Video Feedback Button */}
        <button
          onClick={() => setShowVideoFeedback(true)}
          className="w-full py-2 px-3 mb-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center rounded text-sm flex items-center justify-center"
        >
          <FaVideo className="mr-2" />
          Send Course Feedback
        </button>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleClick}
            className="py-2 px-3 bg-[#02084b] hover:bg-[#0a1e6f] text-white text-center rounded text-sm flex items-center justify-center"
          >
            Continue
          </button>

          <Link
            to={`/chat/${courseId}`}
            className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center rounded text-sm flex items-center justify-center"
          >
            Chat
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourseCard;