import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PlayCircle, Description } from "@mui/icons-material";

function UserCourse() {
    const { courseId } = useParams();

    // Static data for sections and videos
    const [sections, setSections] = useState([
        {
            sectionNumber: 1,
            title: "Introduction to React",
            description: "Learn the basics of React.",
            videos: [
                { id: 1, title: "What is React?", duration: "5:30" },
                { id: 2, title: "Setting Up Your Environment", duration: "7:15" },
                { id: 3, title: "Your First React Component", duration: "10:00" },
            ],
        },
        {
            sectionNumber: 2,
            title: "Intermediate React",
            description: "Dive deeper into React concepts.",
            videos: [
                { id: 4, title: "State and Props", duration: "12:00" },
                { id: 5, title: "Handling Events", duration: "8:45" },
                { id: 6, title: "Conditional Rendering", duration: "9:30" },
            ],
        },
        {
            sectionNumber: 3,
            title: "Advanced React",
            description: "Master advanced React techniques.",
            videos: [
                { id: 7, title: "React Hooks", duration: "15:00" },
                { id: 8, title: "Context API", duration: "11:30" },
                { id: 9, title: "Performance Optimization", duration: "14:00" },
            ],
        },
    ]);

    const [selectedVideo, setSelectedVideo] = useState(null); // Track the selected video

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-1/4 bg-white shadow-lg p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Course Content</h1>
                {sections.map((section) => (
                    <div key={section.sectionNumber} className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Section {section.sectionNumber}: {section.title}
                        </h2>
                        <p className="text-gray-600 mb-4">{section.description}</p>
                        <div className="space-y-2">
                            {section.videos.map((video) => (
                                <div
                                    key={video.id}
                                    onClick={() => setSelectedVideo(video)}
                                    className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                                >
                                    <PlayCircle className="text-blue-600 mr-3" />
                                    <div>
                                        <p className="font-medium">{video.title}</p>
                                        <p className="text-sm text-gray-500">{video.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
                {selectedVideo ? (
                    <div>
                        <h1 className="text-3xl font-bold mb-6">{selectedVideo.title}</h1>
                        <div className="bg-black rounded-lg shadow-lg p-6">
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg"
                                ></iframe>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4">Video Description</h2>
                            <p className="text-gray-700">
                                This is a placeholder description for the video. Replace it with actual content.
                            </p>
                        </div>
                    </div>
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