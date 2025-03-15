import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayCircle, ExpandMore, ExpandLess } from "@mui/icons-material";
import axios from "axios";
import ReactPlayer from "react-player";

// VideoPlayer Component
function VideoPlayer({ selectedVideo }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6">{selectedVideo.title}</h1>
            <div className="bg-black rounded-lg shadow-md p-4">
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
                <h2 className="text-xl font-semibold mb-4">Video Description</h2>
                <p className="text-gray-700">This is video description</p>
            </div>
        </div>
    );
}

// VideoList Component
function VideoList({ sections, setSelectedVideo }) {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionNumber) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionNumber]: !prev[sectionNumber],
        }));
    };

    return (
        <div className="w-1/4 bg-gradient-to-b from-blue-800 to-indigo-900 text-white p-6 overflow-y-auto shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Course Content</h1>
            {sections.map((section) => (
                <div key={section.sectionNumber} className="mb-6">
                    <div
                        onClick={() => toggleSection(section.sectionNumber)}
                        className="flex items-center justify-between cursor-pointer p-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
                    >
                        <h2 className="text-xl font-semibold">
                            Section {section.sectionNumber}: {section.name}
                        </h2>
                        {expandedSections[section.sectionNumber] ? (
                            <ExpandLess className="text-blue-300" />
                        ) : (
                            <ExpandMore className="text-blue-300" />
                        )}
                    </div>
                    {expandedSections[section.sectionNumber] && (
                        <div className="space-y-2 mt-2 pl-4">
                            {section.lectures?.map((video) => (
                                <div
                                    key={video.id}
                                    onClick={() => setSelectedVideo(video)}
                                    className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
                                >
                                    <PlayCircle className="text-blue-300 mr-3" />
                                    <div>
                                        <p className="font-medium">{video.title}</p>
                                        <p className="text-sm text-gray-300">{video.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// Main UserCourse Component
function UserCourse() {
    const { courseId } = useParams();
    const [sections, setSections] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    async function getSections() {
        try {
            const response = await axios.get(`http://localhost:8085/enrollment/course/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const sections = response.data.sections;
            setSections(sections);
        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    }

    useEffect(() => {
        getSections();
    }, []);

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Left Sidebar - Video List */}
            <VideoList sections={sections} setSelectedVideo={setSelectedVideo} />

            {/* Main Content Area - Video Player */}
            <div className="flex-1 p-8">
                {selectedVideo ? (
                    <VideoPlayer selectedVideo={selectedVideo} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-600 text-xl">Select a video to start learning.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserCourse;