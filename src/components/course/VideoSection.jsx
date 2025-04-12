import React, { useState, useEffect } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import VideoItem from "./VideoItem";
import axios from "axios";

const VideoSection = ({ 
  section, 
  isExpanded, 
  onToggle, 
  onSelectVideo, 
  completedVideos,
  selectedVideo,
  courseId
}) => {
  const [lectures, setLectures] = useState([]);
  const [loadingLectures, setLoadingLectures] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isExpanded && !lectures.length) {
      fetchLectures();
    }
  }, [isExpanded]);

  const fetchLectures = async () => {
    try {
      setLoadingLectures(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:8085/sections/${section.sectionId}/lectures`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Fetched lectures:", response.data);
      setLectures(response.data);
      // Select first lecture if none is selected
      if (response.data.length > 0 && !selectedVideo) {
        onSelectVideo(response.data[0]);
      }
    } catch (err) {
      setError("Failed to load lectures");
      console.error("Error fetching lectures:", err);
    } finally {
      setLoadingLectures(false);
    }
  };

  const handleToggle = () => {
    onToggle(section.sectionId);
  };

  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <div
        onClick={handleToggle}
        className={`flex items-center justify-between cursor-pointer p-3 hover:bg-gray-50 transition-all duration-200 ${
          isExpanded ? "bg-gray-50" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Section {section.sectionNumber}: {section.name}
        </h2>
        {isExpanded ? <ExpandLess className="text-gray-600" /> : <ExpandMore className="text-gray-600" />}
      </div>
      {isExpanded && (
        <div className="bg-white p-2">
          {loadingLectures ? (
            <div className="text-center p-4 text-gray-500">Loading lectures...</div>
          ) : error ? (
            <div className="text-red-500 p-3">{error}</div>
          ) : lectures.length > 0 ? (
            <div className="space-y-1">
              {lectures.map((video) => (
                <VideoItem
                  key={video.id}
                  video={video}
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

export default VideoSection;