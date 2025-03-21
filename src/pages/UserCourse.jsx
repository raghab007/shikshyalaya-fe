import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayCircle, ExpandMore, ExpandLess, CheckCircle } from "@mui/icons-material";
import axios from "axios";
import ReactPlayer from "react-player";

// VideoPlayer Component
function VideoPlayer({ selectedVideo, onMarkCompleted, isCompleted }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{selectedVideo.title}</h1>
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
                                    controlsList: 'nodownload', // Disable download option
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
        </div>
    );
}

// VideoItem Component
function VideoItem({ video, isCompleted, onSelect }) {
    return (
        <div
            onClick={() => onSelect(video)}
            className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-200"
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
}

// Section Component
function Section({ section, expanded, onToggle, onSelectVideo, completedVideos }) {
    return (
        <div className="mb-4">
            <div
                onClick={() => onToggle(section.id)} // Use section.id for toggling
                className="flex items-center justify-between cursor-pointer p-3 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
                <h2 className="text-lg font-semibold text-gray-800">
                    Section {section.sectionNumber}: {section.name}
                </h2>
                {expanded ? <ExpandLess className="text-gray-600" /> : <ExpandMore className="text-gray-600" />}
            </div>
            {expanded && section.lectures && section.lectures.length > 0 && ( // Only render if lectures exist
                <div className="space-y-2 mt-2 pl-4">
                    {section.lectures.map((video) => (
                        <VideoItem
                            key={video.id}
                            video={video}
                            isCompleted={completedVideos.includes(video.id)}
                            onSelect={onSelectVideo}
                        />
                    ))}
                </div>
            )}
            {expanded && (!section.lectures || section.lectures.length === 0) && ( // Show message if no videos
                <div className="text-gray-500 mt-2 pl-4">No videos in this section.</div>
            )}
        </div>
    );
}

// VideoList Component
function VideoList({ sections, onSelectVideo, completedVideos }) {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionId) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId], // Toggle the expanded state for the specific section
        }));
    };

    return (
        <div className="w-1/4 bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h1>
            {sections.map((section) => (
                <Section
                    key={section.id} // Use section.id as the key
                    section={section}
                    expanded={expandedSections[section.id] || false} // Use section.id for expanded state
                    onToggle={toggleSection}
                    onSelectVideo={onSelectVideo}
                    completedVideos={completedVideos}
                />
            ))}
        </div>
    );
}

// Main UserCourse Component
function UserCourse() {
    const { courseId } = useParams();
    const [sections, setSections] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [completedVideos, setCompletedVideos] = useState([]);

    async function getSections() {
        try {
            const response = await axios.get(`http://localhost:8085/enrollment/course/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setSections(response.data.sections);
        } catch (error) {
            console.error("Error fetching sections:", error);
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
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50 p-8 space-x-8">
            {/* Left Sidebar - Video List */}
            <VideoList
                sections={sections}
                onSelectVideo={setSelectedVideo}
                completedVideos={completedVideos}
            />

            {/* Main Content Area - Video Player */}
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
}

export default UserCourse;