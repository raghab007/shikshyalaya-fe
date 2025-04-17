import { useState, useEffect } from "react";
import axios from "axios";

export default function InstructorCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [courseFilter, setCourseFilter] = useState("");
  const [replying, setReplying] = useState(false); // New state for reply loading

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
        `http://localhost:8085/instructor/comments/${commentId}/replies`,
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Student Comments
        </h1>
        <p>Loading comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Student Comments
        </h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Student Comments
      </h1>

      {/* Filters */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Filters</h2>
        <div className="flex flex-wrap gap-4">
          <div className="w-64">
            <label
              htmlFor="courseFilter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course
            </label>
            <select
              id="courseFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.commentId}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Comment Header */}
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{comment.userName}</h3>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>{comment.courseName}</span>
                    <span>·</span>
                    <span>{comment.lectureTitle}</span>
                    <span>·</span>
                    <span>
                      {comment.date
                        ? new Date(comment.date).toLocaleString()
                        : "No date"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comment Body */}
              <div className="p-4 bg-white">
                <p className="text-gray-800">{comment.comment}</p>
              </div>

              {/* Replies Section */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="bg-blue-50 p-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Replies:
                  </h4>
                  <div className="space-y-3">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="bg-white p-3 rounded border border-gray-200"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">
                            {reply.userFirstName} {reply.userLastName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {reply.date
                              ? new Date(reply.date).toLocaleString()
                              : "No date"}
                          </span>
                        </div>
                        <p className="text-gray-800">{reply.reply}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Form */}
              {activeReplyId === comment.commentId ? (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <div className="space-y-3">
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows="3"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      disabled={replying}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => {
                          setActiveReplyId(null);
                          setReplyText("");
                        }}
                        disabled={replying}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                        onClick={() => handleSubmitReply(comment.commentId)}
                        disabled={!replyText.trim() || replying}
                      >
                        {replying ? "Submitting..." : "Submit Reply"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <button
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
                    onClick={() => setActiveReplyId(comment.commentId)}
                  >
                    {comment.replies?.length > 0
                      ? "Add Another Reply"
                      : "Reply"}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No comments found.</p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded shadow">
            <div className="text-2xl font-bold text-gray-800">
              {comments.length}
            </div>
            <div className="text-sm text-gray-600">Total Comments</div>
          </div>
          <div className="text-center p-3 bg-white rounded shadow">
            <div className="text-2xl font-bold text-green-600">
              {comments.filter((c) => c.replies?.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">Replied</div>
          </div>
          <div className="text-center p-3 bg-white rounded shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {comments.length -
                comments.filter((c) => c.replies?.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
}
