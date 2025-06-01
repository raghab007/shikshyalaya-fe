import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GiProgression } from "react-icons/gi";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPlus,
  FaTimes,
  FaUpload,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const VideoCard = ({
  title,
  image = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww",
  videorul,
  description,
  id,
  onEdit,
  onDelete,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="relative group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Image container with gradient overlay */}
      <div className="w-full h-44 rounded-lg overflow-hidden relative">
        {image ? (
          <img
            src={"http://localhost:8085/files/course/thumbnails/" + image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Thumbnail</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Video title */}
      <h3 className="mt-3 text-lg font-semibold text-gray-800 line-clamp-1">
        {title}
      </h3>

      {/* Description preview */}
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>

      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onEdit(id, title, description, image, videorul)}
          className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-50 focus:outline-none shadow-md"
          aria-label={`Edit ${title}`}
        >
          <FaEdit size={14} />
        </button>
        <button
          onClick={() => onDelete(id, title)}
          className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 focus:outline-none shadow-md"
          aria-label={`Delete ${title}`}
        >
          <FaTrash size={14} />
        </button>
      </div>

      {/* Play button overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <button
          onClick={() => setIsVideoPlaying(true)}
          className="bg-white text-black p-3 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-110"
          aria-label={`Play ${title}`}
        >
          <FaPlay className="text-blue-600" />
        </button>
      </div>

      {/* Video duration badge */}
      <div className="absolute bottom-16 right-6 bg-black/70 text-white text-xs px-2 py-1 rounded">
        12:34
      </div>

      {/* Video Player Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <ReactPlayer
              url={`http://localhost:8085/files/course/videos/${videorul}`}
              controls={true}
              width="100%"
              height="450px"
              playing={true}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            />
            <p className="mt-4 text-gray-600">{description}</p>
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
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lectureToDelete, setLectureToDelete] = useState({
    id: null,
    title: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8085/instructor/course/section/${sectionId}/lecture`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setVideos(response.data);
    } catch (error) {
      setError("Failed to fetch videos. Showing static examples.");
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!videoName.trim() || !videoDescription.trim()) {
      setError("Title and description are required.");
      return;
    }

    if (!isEditMode && (!videoFile || !videoImage)) {
      setError(
        "Video file and thumbnail are required when adding a new lecture."
      );
      return;
    }

    if (videoFile && !videoFile.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      return;
    }
    if (videoFile && videoFile.size > 100 * 1024 * 1024) {
      setError("Video file size should not exceed 100MB.");
      return;
    }
    if (videoImage && videoImage.size > 5 * 1024 * 1024) {
      setError("Image file size should not exceed 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("title", videoName);
    formData.append("description", videoDescription);

    if (videoFile) {
      formData.append("video", videoFile);
    }

    if (videoImage) {
      formData.append("image", videoImage);
    }

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      let response;

      if (isEditMode) {
        response = await axios.put(
          `http://localhost:8085/instructor/course/section/${sectionId}/lecture/${currentLectureId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );
        setSuccess("Lecture updated successfully!");
      } else {
        response = await axios.post(
          `http://localhost:8085/instructor/course/section/${sectionId}/lecture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );
        setSuccess("Lecture uploaded successfully!");
      }

      resetForm();
      fetchVideos();
    } catch (error) {
      setError(
        isEditMode
          ? "Lecture update failed. Please try again."
          : "Video upload failed. Please try again."
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setVideoFile(null);
    setVideoName("");
    setVideoDescription("");
    setVideoImage(null);
    setVideoPreview(null);
    setImagePreview(null);
    setShowAddVideoForm(false);
    setIsEditMode(false);
    setCurrentLectureId(null);
  };

  const handleEditLecture = (id, title, description, image, videoUrl) => {
    setIsEditMode(true);
    setCurrentLectureId(id);
    setVideoName(title);
    setVideoDescription(description);
    // We don't set the actual file objects since we don't have them from the server
    // But we can keep the previews for user reference
    setImagePreview(
      image ? `http://localhost:8085/files/course/thumbnails/${image}` : null
    );
    setVideoPreview(
      videoUrl ? `http://localhost:8085/files/course/videos/${videoUrl}` : null
    );
    setShowAddVideoForm(true);
  };

  const handleDeleteLecture = (id, title) => {
    setLectureToDelete({ id, title });
    setShowDeleteConfirm(true);
  };

  const confirmDeleteLecture = async () => {
    try {
      await axios.delete(
        `http://localhost:8085/instructor/course/section/${sectionId}/lecture/${lectureToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(`Lecture "${lectureToDelete.title}" deleted successfully!`);
      fetchVideos();
    } catch (error) {
      setError("Failed to delete lecture. Please try again.");
    } finally {
      setShowDeleteConfirm(false);
      setLectureToDelete({ id: null, title: "" });
    }
  };

  const [videoPreview, setVideoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Course Lectures</h1>
        <button
          onClick={() => {
            resetForm();
            setShowAddVideoForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <FaPlus size={14} />
          Add Lecture
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
          <div className="text-red-500 flex-shrink-0 mr-3">
            <FaTimes size={20} />
          </div>
          <div>
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={() => setError("")}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <FaTimes size={16} />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-start">
          <div className="text-green-500 flex-shrink-0 mr-3">
            <FaUpload size={20} />
          </div>
          <div>
            <p className="text-green-800 font-medium">Success</p>
            <p className="text-green-700">{success}</p>
          </div>
          <button
            onClick={() => setSuccess("")}
            className="ml-auto text-green-500 hover:text-green-700"
          >
            <FaTimes size={16} />
          </button>
        </div>
      )}

      {/* Video grid */}
      {isLoading ? (
        <div className="py-20 flex justify-center">
          <GiProgression className="animate-spin text-blue-500" size={48} />
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              videorul={video.videoUrl}
              description={video.description}
              image={video.imageUrl || undefined}
              onEdit={handleEditLecture}
              onDelete={handleDeleteLecture}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-10 text-center">
          <div className="text-gray-400 mb-3">
            <FaUpload size={40} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No lectures uploaded yet
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first lecture video
          </p>
          <button
            onClick={() => setShowAddVideoForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Lecture
          </button>
        </div>
      )}

      {/* Add/Edit Video Form Modal */}
      {showAddVideoForm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditMode ? "Edit Lecture" : "Add New Lecture"}
              </h2>
              <button
                onClick={() => setShowAddVideoForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lecture Title
                </label>
                <input
                  type="text"
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                  placeholder="Enter an engaging title for your lecture"
                  disabled={isUploading}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  placeholder="Describe what students will learn in this lecture"
                  disabled={isUploading}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video File {isEditMode && "(Optional for editing)"}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      disabled={isUploading}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      {videoPreview ? (
                        <div className="relative">
                          <video
                            src={videoPreview}
                            className="w-full h-36 object-cover rounded"
                            controls={false}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <span className="text-white bg-blue-600 px-2 py-1 rounded text-xs">
                              Change
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-6">
                          <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to upload video
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            MP4, WebM (max 100MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thumbnail Image {isEditMode && "(Optional for editing)"}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      disabled={isUploading}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Thumbnail preview"
                            className="w-full h-36 object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <span className="text-white bg-blue-600 px-2 py-1 rounded text-xs">
                              Change
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-6">
                          <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to upload thumbnail
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            JPG, PNG (max 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {isUploading && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Uploading: {uploadProgress}%
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddVideoForm(false)}
                  disabled={isUploading}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleVideoUpload}
                  disabled={isUploading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300 flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <GiProgression className="animate-spin" />
                      {isEditMode ? "Updating..." : "Uploading..."}
                    </>
                  ) : (
                    <>
                      {isEditMode ? <FaEdit /> : <FaUpload />}
                      {isEditMode ? "Update Lecture" : "Upload Lecture"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <FaTrash className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Delete Lecture
              </h2>
              <p className="text-gray-600 mt-2">
                Are you sure you want to delete "{lectureToDelete.title}"? This
                action cannot be undone.
              </p>
            </div>

            <div className="flex justify-center space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteLecture}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors flex items-center gap-2"
              >
                <FaTrash size={14} />
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
