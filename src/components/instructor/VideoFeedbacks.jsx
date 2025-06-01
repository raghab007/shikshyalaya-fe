import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  PlayCircle as PlayIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
  VolumeUp as VolumeUpIcon,
} from "@mui/icons-material";
import {
  Button,
  TextField,
  CircularProgress,
  Tooltip,
  Chip,
  Pagination,
  Box,
  Modal,
  IconButton,
  Typography,
} from "@mui/material";

function VideoFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [courseFilter, setCourseFilter] = useState("");
  const [videoModal, setVideoModal] = useState({
    open: false,
    videoUrl: "",
    studentName: "",
    courseName: "",
  });
  const feedbacksPerPage = 8;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8085/api/video-feedback",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFeedbacks(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching video feedbacks:", error);
        setError("Failed to load video feedbacks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Get unique course names for filter dropdown
  const courseNames = [
    ...new Set(feedbacks.map((feedback) => feedback.course.name)),
  ];

  // Filter and search feedbacks
  const processedFeedbacks = feedbacks.filter((feedback) => {
    const studentName = `${feedback.user.firstName} ${feedback.user.lastName}`;
    const matchesSearch =
      studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      !courseFilter || feedback.course.name === courseFilter;
    return matchesSearch && matchesCourse;
  });

  // Pagination
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = processedFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );
  const pageCount = Math.ceil(processedFeedbacks.length / feedbacksPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenVideoModal = (videoUrl, studentName, courseName) => {
    setVideoModal({
      open: true,
      videoUrl,
      studentName,
      courseName,
    });
  };

  const handleCloseVideoModal = () => {
    setVideoModal({
      open: false,
      videoUrl: "",
      studentName: "",
      courseName: "",
    });
  };

  const handleDownloadVideo = (videoUrl, studentName) => {
    // Create a download link
    const link = document.createElement("a");
    link.href = `http://localhost:8085/files/videofeedback/${videoUrl}`;
    link.download = `feedback_${studentName.replace(/\s+/g, "_")}_${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#02084b]/10 to-[#02084b]/20">
        <CircularProgress sx={{ color: "#02084b" }} size={60} thickness={4} />
        <p className="mt-4 text-gray-600">Loading video feedbacks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#02084b]/10 to-[#02084b]/20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Oops!</h2>
          <p className="text-red-600">{error}</p>
          <Button
            variant="contained"
            sx={{ bgcolor: "#02084b", "&:hover": { bgcolor: "#02084b/90" } }}
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Video Feedbacks
          </h1>
          <p className="text-gray-600">
            View and manage video feedbacks from your students (
            {processedFeedbacks.length} total)
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="courseFilter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Course
              </label>
              <select
                id="courseFilter"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors focus:outline-none"
                value={courseFilter}
                onChange={(e) => {
                  setCourseFilter(e.target.value);
                  setCurrentPage(1); // Reset to first page when filtering
                }}
              >
                <option value="">
                  All Courses ({feedbacks.length} videos)
                </option>
                {courseNames.map((course) => (
                  <option key={course} value={course}>
                    {course} (
                    {feedbacks.filter((f) => f.course.name === course).length}{" "}
                    videos)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search
              </label>
              <div className="relative">
                <TextField
                  id="search"
                  variant="outlined"
                  size="small"
                  placeholder="Search by student name, email, or course..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <SearchIcon color="action" className="mr-2" />
                    ),
                    className: "bg-white rounded-lg pr-2",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#02084b",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feedbacks List */}
        {processedFeedbacks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FilterIcon sx={{ fontSize: 48 }} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No feedbacks found
            </h3>
            <p className="text-gray-500">
              {searchTerm || courseFilter
                ? "Try adjusting your search or filter criteria"
                : "No video feedbacks have been submitted yet"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Video Type
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentFeedbacks.map((feedback, index) => {
                    const studentName = `${feedback.user.firstName} ${feedback.user.lastName}`;
                    const videoExtension = feedback.videoUrl
                      .split(".")
                      .pop()
                      .toUpperCase();

                    return (
                      <tr
                        key={`${feedback.user.userName}-${feedback.course.courseId}-${index}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-[#02084b] flex items-center justify-center text-white font-medium">
                                {feedback.user.firstName.charAt(0)}
                                {feedback.user.lastName.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {studentName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {feedback.user.email}
                              </div>
                              <div className="text-xs text-gray-400">
                                @{feedback.user.userName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {feedback.course.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Course ID: {feedback.course.courseId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Chip
                            label={videoExtension}
                            color={
                              videoExtension === "MP4" ? "primary" : "secondary"
                            }
                            size="small"
                          />
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Tooltip title="Watch Feedback Video">
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<PlayIcon />}
                                onClick={() =>
                                  handleOpenVideoModal(
                                    feedback.videoUrl,
                                    studentName,
                                    feedback.course.name
                                  )
                                }
                                sx={{
                                  bgcolor: "#02084b",
                                  "&:hover": { bgcolor: "#02084b/90" },
                                }}
                              >
                                Watch
                              </Button>
                            </Tooltip>
                            <Tooltip title="Download Video">
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<DownloadIcon />}
                                onClick={() =>
                                  handleDownloadVideo(
                                    feedback.videoUrl,
                                    studentName
                                  )
                                }
                                sx={{
                                  borderColor: "#02084b",
                                  color: "#02084b",
                                  "&:hover": {
                                    borderColor: "#02084b",
                                    bgcolor: "#02084b/10",
                                  },
                                }}
                              >
                                Download
                              </Button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstFeedback + 1} to{" "}
                    {Math.min(indexOfLastFeedback, processedFeedbacks.length)}{" "}
                    of {processedFeedbacks.length} results
                  </div>
                  <Box display="flex" justifyContent="center">
                    <Pagination
                      count={pageCount}
                      page={currentPage}
                      onChange={handlePageChange}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#02084b",
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#02084b !important",
                          color: "white !important",
                        },
                      }}
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <Modal
        open={videoModal.open}
        onClose={handleCloseVideoModal}
        aria-labelledby="video-modal-title"
        aria-describedby="video-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "80%",
            maxWidth: "900px",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            outline: "none",
            p: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseVideoModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="video-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {videoModal.studentName}'s Feedback for {videoModal.courseName}
          </Typography>
          <Box
            sx={{
              position: "relative",
              paddingBottom: "56.25%", // 16:9 aspect ratio
              height: 0,
              overflow: "hidden",
            }}
          >
            <video
              controls
              autoPlay
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <source
                src={`http://localhost:8085/files/videofeedback/${videoModal.videoUrl}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={() =>
                handleDownloadVideo(videoModal.videoUrl, videoModal.studentName)
              }
              sx={{
                bgcolor: "#02084b",
                "&:hover": { bgcolor: "#02084b/90" },
              }}
            >
              Download
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default VideoFeedbacks;
