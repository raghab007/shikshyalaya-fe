import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayCircle, ExpandMore, ExpandLess, CheckCircle, Star, StarBorder } from "@mui/icons-material";
import axios from "axios";
import ReactPlayer from "react-player";

// VideoItem Component
const VideoItem = ({ video, isCompleted, onSelect, isSelected }) => {
  return (
    <div
      onClick={() => onSelect(video)}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-100"
      }`}
    >
      <PlayCircle className={`text-${isCompleted ? "green-500" : "blue-500"} mr-3`} />
      <div className="flex-1">
        <p className={`font-medium ${isCompleted ? "text-green-600" : "text-gray-800"}`}>
          {video.title}
        </p>
        <p className="text-sm text-gray-500">{video.duration}</p>
      </div>
      {isCompleted && <CheckCircle className="text-green-500" />}
    </div>
  );
};

// VideoSection Component
const VideoSection = ({ 
  section, 
  isExpanded, 
  onToggle, 
  onSelectVideo, 
  completedVideos,
  selectedVideo 
}) => {
  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <div
        onClick={() => onToggle(section.id)}
        className={`flex items-center justify-between cursor-pointer p-3 hover:bg-gray-50 transition-all duration-200 ${
          isExpanded ? "bg-gray-100" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Section {section.sectionNumber}: {section.name}
        </h2>
        {isExpanded ? <ExpandLess className="text-gray-600" /> : <ExpandMore className="text-gray-600" />}
      </div>
      {isExpanded && (
        <div className="bg-white p-2">
          {section.lectures && section.lectures.length > 0 ? (
            <div className="space-y-1">
              {section.lectures.map((video) => (
                <VideoItem
                  key={video.id}
                  video={video}
                  isCompleted={completedVideos.includes(video.id)}
                  onSelect={onSelectVideo}
                  isSelected={selectedVideo?.id === video.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 p-3">No videos in this section.</div>
          )}
        </div>
      )}
    </div>
  );
};

// VideoList Component
const VideoList = ({ 
  sections, 
  onSelectVideo, 
  completedVideos,
  selectedVideo,
  expandedSection,
  setExpandedSection
}) => {
  const toggleSection = (sectionId) => {
    setExpandedSection(prev => prev === sectionId ? null : sectionId);
    
    if (expandedSection !== sectionId) {
      const section = sections.find(s => s.id === sectionId);
      if (section && section.lectures && section.lectures.length > 0) {
        onSelectVideo(section.lectures[0]);
      }
    }
  };

  return (
    <div className="w-1/4 bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h1>
      {sections.map((section) => (
        <VideoSection
          key={section.id}
          section={section}
          isExpanded={expandedSection === section.id}
          onToggle={toggleSection}
          onSelectVideo={onSelectVideo}
          completedVideos={completedVideos}
          selectedVideo={selectedVideo}
        />
      ))}
    </div>
  );
};

// VideoPlayer Component
const VideoPlayer = ({ selectedVideo, onMarkCompleted, isCompleted }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    if (selectedVideo) {
      // Fetch comments for the selected video
      const fetchComments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8085/comment/${selectedVideo.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setComments(response.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      // Fetch rating for the selected video
      const fetchRating = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8085/videos/${selectedVideo.id}/rating`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setRating(response.data.averageRating || 0);
          setUserRating(response.data.userRating || 0);
        } catch (error) {
          console.error("Error fetching rating:", error);
        }
      };

      fetchComments();
      fetchRating();
    }
  }, [selectedVideo]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await axios.post(
        `http://localhost:8085/comment/${selectedVideo.id}`,
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
      // Refresh comments after successful submission
      const commentsResponse = await axios.get(
        `http://localhost:8085/comment/${selectedVideo.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setComments(commentsResponse.data);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleRateVideo = async (newRating) => {
    try {
      await axios.post(
        `http://localhost:8085/videos/${selectedVideo.id}/rate`,
        { rating: newRating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserRating(newRating);
      
      const newAverage = ((rating * comments.length) + newRating - (userRating || 0)) / comments.length;
      setRating(newAverage);
    } catch (error) {
      console.error("Error rating video:", error);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "2025";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{selectedVideo.title}</h1>
        <div className="flex items-center space-x-4">
          {!isCompleted && (
            <button
              onClick={() => onMarkCompleted(selectedVideo.id)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              <CheckCircle className="mr-2" />
              Mark as Completed
            </button>
          )}
          {isCompleted && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-2" />
              <span className="font-semibold">Completed</span>
            </div>
          )}
          
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRateVideo(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                {star <= (hoverRating || userRating) ? (
                  <Star className="text-yellow-500" />
                ) : (
                  <StarBorder className="text-yellow-500" />
                )}
              </button>
            ))}
            <span className="ml-2 text-gray-600">
              ({rating.toFixed(1)})
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-black rounded-xl shadow-md overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <ReactPlayer
            url={"http://localhost:8085/videos/course/" + selectedVideo.videoUrl}
            controls={true}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
            className="react-player"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Description</h2>
        <p className="text-gray-600">{selectedVideo.description}</p>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            {showComments ? (
              <>
                <ExpandLess className="mr-1" />
                Hide Comments
              </>
            ) : (
              <>
                <ExpandMore className="mr-1" />
                Show Comments
              </>
            )}
          </button>
        </div>
        
        {showComments && (
          <>
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Post Comment
              </button>
            </form>
            
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id || Math.random()} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {comment.userName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-800">{comment.userName || 'User'}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(comment.date)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main UserCourse Component
const UserCourse = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);

  async function getSections() {
    try {
      const response = await axios.get(`http://localhost:8085/enrollment/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSections(response.data.sections);
      
      if (response.data.sections.length > 0 && !expandedSection) {
        const firstSection = response.data.sections[0];
        setExpandedSection(firstSection.id);
        
        if (firstSection.lectures && firstSection.lectures.length > 0) {
          setSelectedVideo(firstSection.lectures[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleMarkCompleted = async (videoId) => {
    try {
      await axios.post(
        `http://localhost:8085/enrollment/course/${courseId}/complete-video/${videoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCompletedVideos((prev) => [...prev, videoId]);
    } catch (error) {
      console.error("Error marking video as completed:", error);
    }
  };

  useEffect(() => {
    getSections();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading course content...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 p-8 space-x-8">
      <VideoList
        sections={sections}
        onSelectVideo={setSelectedVideo}
        completedVideos={completedVideos}
        selectedVideo={selectedVideo}
        expandedSection={expandedSection}
        setExpandedSection={setExpandedSection}
      />

      <div className="flex-1">
        {selectedVideo ? (
          <VideoPlayer
            selectedVideo={selectedVideo}
            onMarkCompleted={handleMarkCompleted}
            isCompleted={completedVideos.includes(selectedVideo.id)}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-600 text-xl">Select a video to start learning.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourse;