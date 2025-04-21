import { useState, useEffect } from "react";
import axios from "axios";

export default function InstructorCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [courseFilter, setCourseFilter] = useState("");
  const [replying, setReplying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedReplies, setExpandedReplies] = useState({}); // Track which replies are expanded

  // Toggle reply visibility
  const toggleReplies = (commentId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Fetch comments from API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        let url = "http://localhost:8085/instructor/comments";
        if (courseFilter) {
          url += `?courseName=${encodeURIComponent(courseFilter)}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchComments();
  }, [courseFilter]);

  // Get unique course names for filter dropdown
  const courseNames = [
    ...new Set(comments.map((comment) => comment.courseName)),
  ];

  // Handle submitting a reply
  const handleSubmitReply = async (commentId) => {
    if (!replyText.trim()) return;

    try {
      setReplying(true);

      // Make API call to save the reply
      const response = await axios.post(
        `http://localhost:8085/instructor/${commentId}/replies`,
        { reply: replyText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the comments state with the new reply from the backend
      setComments(
        comments.map((comment) => {
          if (comment.commentId === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), response.data],
            };
          }
          return comment;
        })
      );

      // Reset reply state
      setReplyText("");
      setActiveReplyId(null);
    } catch (err) {
      console.error("Failed to submit reply:", err);
      setError(err.response?.data?.message || "Failed to submit reply");
    } finally {
      setReplying(false);
    }
  };

  // Filter comments based on search term
  const filteredComments = comments.filter(
    (comment) =>
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.lectureTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count unresponded comments
  const unrespondedComments = comments.filter(
    (comment) => !comment.replies || comment.replies.length === 0
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
              <div className="h-4 w-48 bg-blue-200 rounded mb-3"></div>
              <div className="h-3 w-36 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-center h-64 flex-col">
            <div className="text-red-500 text-5xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Error Loading Comments
            </h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Student Feedback Center
              </h1>
              <p className="text-blue-100 text-lg">
                Review and respond to your students' comments
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transition-all hover:shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-gray-500 text-sm font-medium">
                  Total Comments
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  {comments.length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 transition-all hover:shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-gray-500 text-sm font-medium">
                  Responded
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  {comments.length - unrespondedComments}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter & Search
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="courseFilter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course
              </label>
              <select
                id="courseFilter"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors focus:outline-none"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="">All Courses</option>
                {courseNames.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="searchTerm"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search by student name, comment, course..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6 mb-12">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <div
                key={comment.commentId}
                className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-blue-400 transition-all hover:shadow-lg"
              >
                {/* Comment Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {comment.userName}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-lg flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        {comment.courseName}
                      </span>
                      <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        {comment.lectureTitle}
                      </span>
                      <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-lg flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {comment.date
                          ? new Date(comment.date).toLocaleString()
                          : "No date"}
                      </span>
                    </div>
                  </div>
                  {(!comment.replies || comment.replies.length === 0) && (
                    <div className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                      Needs Response
                    </div>
                  )}
                </div>

                {/* Comment Body */}
                <div className="p-5 bg-white">
                  <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-gray-200">
                    <p className="text-gray-800">{comment.comment}</p>
                  </div>
                </div>

                {/* Replies Section */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="bg-gray-50 p-5 border-t border-gray-100">
                    <h4
                      className="text-sm font-medium text-gray-700 mb-3 flex items-center cursor-pointer"
                      onClick={() => toggleReplies(comment.commentId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                      Replies ({comment.replies.length})
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-2 transition-transform ${expandedReplies[comment.commentId] ? "transform rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </h4>
                    {expandedReplies[comment.commentId] && (
                      <div className="space-y-3">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-white p-4 rounded-lg border-l-2 border-blue-400 shadow-sm"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="bg-blue-100 rounded-full p-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-blue-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <span className="font-medium text-blue-700">
                                {reply.userFirstName} {reply.userLastName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {reply.date
                                  ? new Date(reply.date).toLocaleString()
                                  : "No date"}
                              </span>
                            </div>
                            <p className="text-gray-800 pl-7">{reply.reply}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Reply Form */}
                {activeReplyId === comment.commentId ? (
                  <div className="bg-gray-50 p-5 border-t border-gray-100">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Your Response
                      </h4>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors focus:outline-none"
                        rows="4"
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        disabled={replying}
                      />
                      <div className="flex justify-end space-x-3">
                        <button
                          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                          onClick={() => {
                            setActiveReplyId(null);
                            setReplyText("");
                          }}
                          disabled={replying}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
                          onClick={() => handleSubmitReply(comment.commentId)}
                          disabled={!replyText.trim() || replying}
                        >
                          {replying ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Submitting
                            </>
                          ) : (
                            <>Submit Reply</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-5 border-t border-gray-100">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      onClick={() => setActiveReplyId(comment.commentId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                      {comment.replies?.length > 0
                        ? "Add Another Reply"
                        : "Reply to Student"}
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="mb-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                No comments found
              </h3>
              <p className="text-gray-500">
                {searchTerm || courseFilter
                  ? "Try adjusting your filters to see more results."
                  : "When students leave comments, they'll appear here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
