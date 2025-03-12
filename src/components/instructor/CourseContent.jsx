import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GiProgression } from "react-icons/gi";
import ReactPlayer from "react-player"; // For playing YouTube videos
import video from"../../assets/video.mp4"

const VideoCard = ({ name, 
    image = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww",
     videorul, title, description }) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false); // State to control video playback
    const handleCloseVideo = () => {
        setIsVideoPlaying(false); // Close the video player
    };

    const handlePlayVideo = () => {
        setIsVideoPlaying(true); // Open the video player
    };
    return (
        <div className="relative group bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            {/* Image container */}
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <span className="text-gray-500">Thumbnail</span>
                )}
            </div>

            {/* Video name */}
            <div className="mt-3">
                <p className="text-lg font-semibold text-center text-gray-800">{title}</p>
            </div>

            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <button
                    onClick={handlePlayVideo}
                    className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-200"
                    aria-label={`Play ${name}`}
                >
                    ▶ Play
                </button>
            </div>

            {/* Video Player Modal */}
            {isVideoPlaying && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <ReactPlayer
                            url={`http://localhost:8085/videos/course/${videorul}`} // YouTube video URL
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
};

export default function UploadLecture() {
    const { sectionId } = useParams();
    const [videos, setVideos] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [videoName, setVideoName] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoImage, setVideoImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
   
    const [showAddVideoForm, setShowAddVideoForm] = useState(false); // State to toggle add video form
    const token = localStorage.getItem("token");


    useEffect(() => {
        fetchVideos();
    }, []);

    async function fetchVideos() {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8085/instructor/course/section/${sectionId}/lecture`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setVideos(response.data)
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

  

   

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold text-center">Upload Lecture Video</h1>
            {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}
            {success && <div className="text-green-500 bg-green-100 p-2 rounded">{success}</div>}

            {/* Add Video Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowAddVideoForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Add Video
                </button>
            </div>

            {/* Add Video Form Modal */}
            {showAddVideoForm && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Video</h2>
                        <div className="space-y-4">
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
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowAddVideoForm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleVideoUpload}
                                    disabled={isUploading || isLoading}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                                >
                                    {isUploading ? "Uploading..." : "Upload Video"}
                                </button>
                            </div>
                        </div>
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
                                title={video.title}
                                videorul={video.videoUrl}
                                description={video.description}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {isUploading && <GiProgression value={50} />}
            
        </div>
    );
}