import { useParams } from "react-router-dom";
import axios from "axios";
import VideoList from "../components/course/VideoList";
import VideoPlayer from "../components/course/VideoPlayer";
import { useEffect, useState } from "react";

const UserCourse = () => {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);
  console.log("Selected Video:", selectedVideo);
  const getSections = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8085/enrollment/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSections(response.data.sections);

      // Expand first section by default if exists
      if (response.data.length > 0) {
        setExpandedSection(response.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
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
    <div className="flex min-h-screen bg-gray-50 p-8 space-x-8 mt-16">
      <VideoList
        sections={sections}
        onSelectVideo={setSelectedVideo}
        selectedVideo={selectedVideo}
        expandedSection={expandedSection}
        setExpandedSection={setExpandedSection}
        courseId={courseId}
      />

      <div className="flex-1">
        {selectedVideo ? (
          <VideoPlayer selectedVideo={selectedVideo} />
        ) : (
          <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-600 text-xl">
              Select a section to view lectures
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourse;
