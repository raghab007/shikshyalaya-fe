import React, { useState, useEffect } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const CommentSection = ({ videoId, showComments, setShowComments, comments: propComments }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(propComments || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propComments) {
      setComments(propComments);
    }
  }, [propComments]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8085/comment/${videoId}`,
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
      // Refresh comments after successful submission
      const commentsResponse = await axios.get(
        `http://localhost:8085/comment/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setComments(commentsResponse.data);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center text-[#42ACD0] hover:text-[#368cb1] transition-colors duration-200"
        >
          {showComments ? (
            <>
              <ExpandLess className="mr-1" />
              Hide Comments
            </>
          ) : (
            <>
              <ExpandMore className="mr-1" />
              Show Comments
            </>
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42ACD0] focus:border-[#42ACD0]"
                rows="3"
                disabled={loading}
              />
              <motion.button
                type="submit"
                className="mt-2 bg-[#42ACD0] text-white px-4 py-2 rounded-lg hover:bg-[#368cb1] transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Comment"}
              </motion.button>
            </form>
            
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <motion.div
                    key={comment.id || index}
                    className="border-b border-gray-200 pb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-[#42ACD0] bg-opacity-10 rounded-full flex items-center justify-center text-[#42ACD0] font-bold">
                        {comment.userName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-800">{comment.userName || 'User'}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(comment.date)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </motion.div>
                ))
              ) : (
                <motion.p 
                  className="text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No comments yet. Be the first to comment!
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CommentSection;