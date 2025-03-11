import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GiProgression } from "react-icons/gi";
import ReactPlayer from "react-player"; // For playing YouTube videos

const VideoCard = ({ name, onPlay }) => {
    return (
        <div className="relative group bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                <span className="text-gray-500">Thumbnail</span>
            </div>
            <div className="mt-3">
                <p className="text-lg font-semibold text-center">{name}</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <button
                    onClick={onPlay}
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                    ▶ Play
                </button>
            </div>
        </div>
    );
};

export default function UploadLecture() {
    const { courseId } = useParams();
    const [videos, setVideos] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [videoName, setVideoName] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoImage, setVideoImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isVideoPlaying, setIsVideoPlaying] = useState(false); // State to control video playback
    const [showAddVideoForm, setShowAddVideoForm] = useState(false); // State to toggle add video form
    const token = localStorage.getItem("token");

    const staticVideos = [
        { id: 1, name: "Introduction to React" },
        { id: 2, name: "Advanced JavaScript" },
        { id: 3, name: "Spring Boot Basics" }
    ];

    useEffect(() => {
        fetchVideos();
    }, []);

    async function fetchVideos() {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8085/course/${courseId}/videos`);
            setVideos(response.data.length > 0 ? response.data : staticVideos);
        } catch (error) {
            setError("Failed to fetch videos. Showing static examples.");
            setVideos(staticVideos);
        } finally {
            setIsLoading(false);
        }
    }

    const handleVideoUpload = async () => {
        if (!videoFile || !videoName.trim() || !videoDescription.trim() || !videoImage) {
            setError("All fields are required.");
            return;
        }

        if (!videoFile.type.startsWith("video/")) {
            setError("Please upload a valid video file.");
            return;
        }
        if (videoFile.size > 100 * 1024 * 1024) {
            setError("Video file size should not exceed 100MB.");
            return;
        }
        if (videoImage.size > 5 * 1024 * 1024) {
            setError("Image file size should not exceed 5MB.");
            return;
        }

        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("name", videoName);
        formData.append("description", videoDescription);
        formData.append("image", videoImage);

        setIsUploading(true);
        setError("");
        setSuccess("");
        try {
            await axios.post(
                `http://localhost:8085/course/${courseId}/upload-video`,
                formData,
                { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
            );
            setSuccess("Video uploaded successfully!");
            setVideoFile(null);
            setVideoName("");
            setVideoDescription("");
            setVideoImage(null);
            setShowAddVideoForm(false); // Hide the form after successful upload
            fetchVideos();
        } catch (error) {
            setError("Video upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handlePlayVideo = () => {
        setIsVideoPlaying(true); // Open the video player
    };

    const handleCloseVideo = () => {
        setIsVideoPlaying(false); // Close the video player
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold text-center">Upload Lecture Video</h1>
            {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}
            {success && <div className="text-green-500 bg-green-100 p-2 rounded">{success}</div>}

            {/* Add Video Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowAddVideoForm(!showAddVideoForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    {showAddVideoForm ? "Cancel" : "Add Video"}
                </button>
            </div>

            {/* Add Video Form */}
            {showAddVideoForm && (
                <div className="bg-white shadow rounded-lg">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Add New Video</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        <input
                            type="text"
                            value={videoName}
                            onChange={(e) => setVideoName(e.target.value)}
                            placeholder="Enter video name"
                            disabled={isUploading}
                            className="w-full p-2 border rounded-lg"
                        />
                        <textarea
                            value={videoDescription}
                            onChange={(e) => setVideoDescription(e.target.value)}
                            placeholder="Enter video description"
                            disabled={isUploading}
                            className="w-full p-2 border rounded-lg"
                            rows={3}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Video File</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideoFile(e.target.files[0])}
                                    disabled={isUploading}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setVideoImage(e.target.files[0])}
                                    disabled={isUploading}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleVideoUpload}
                            disabled={isUploading || isLoading}
                            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                        >
                            {isUploading ? "Uploading..." : "Upload Video"}
                        </button>
                    </div>
                </div>
            )}

            {/* Uploaded Videos Section */}
            <div className="bg-white shadow rounded-lg">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Uploaded Videos</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {videos.map((video) => (
                            <VideoCard
                                key={video.id}
                                name={video.name}
                                onPlay={handlePlayVideo} // Pass the play handler
                            />
                        ))}
                    </div>
                </div>
            </div>

            {isUploading && <GiProgression value={50} />}

            {/* Video Player Modal */}
            {isVideoPlaying && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=t-UhINPsmj4" // YouTube video URL
                            controls={true}
                            width="100%"
                            height="400px"
                        />
                        <button
                            onClick={handleCloseVideo}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}