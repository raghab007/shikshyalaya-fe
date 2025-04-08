import React from "react";
import VideoSection from "./VideoSection";

const VideoList = ({ 
  sections, 
  onSelectVideo, 
  completedVideos,
  selectedVideo,
  expandedSection,
  setExpandedSection,
  courseId
}) => {
  const toggleSection = (sectionId) => {
    setExpandedSection(prev => prev === sectionId ? null : sectionId);
  };

  return (
    <div className="w-1/4 bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h1>
      {sections.map((section) => (
        <VideoSection
          key={section.sectionId}
          section={section}
          isExpanded={expandedSection === section.sectionId}
          onToggle={toggleSection}
          onSelectVideo={onSelectVideo}
          completedVideos={completedVideos}
          selectedVideo={selectedVideo}
          courseId={courseId}
        />
      ))}
    </div>
  );
};

export default VideoList;