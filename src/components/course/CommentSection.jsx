import React, { useState, useEffect } from "react";
import { ExpandMore, ExpandLess, Reply } from "@mui/icons-material";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const CommentSection = ({ videoId, showComments, setShowComments, comments: propComments }) => {
  const [comment, setComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState(propComments || []);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReplies, setShowReplies] = useState({}); // Track which comment's replies are visible

  useEffect(() => {
    if (propComments) {
      setComments(propComments);
    }
  }, [propComments]);

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8085/comment/${videoId}`,
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
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

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8085/comments/${commentId}/reply`,
        { comment: replyText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
      const commentsResponse = await axios.get(
        `http://localhost:8085/comment/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setComments(commentsResponse.data);
      setReplyText("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReplies = (commentId) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId] // Toggle visibility for this comment's replies
    }));
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
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    className="border-b border-gray-200 pb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
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
                    <p className="text-gray-700 mb-2">{comment.comment}</p>
                    
                    <div className="flex items-center space-x-4 mb-2">
                      <button 
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="flex items-center text-sm text-[#42ACD0] hover:text-[#368cb1]"
                      >
                        <Reply className="mr-1" fontSize="small" />
                        Reply
                      </button>
                      
                      {comment.commentReplies?.length > 0 && (
                        <button 
                          onClick={() => toggleReplies(comment.id)}
                          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                        >
                          {showReplies[comment.id] ? (
                            <>
                              <ExpandLess className="mr-1" fontSize="small" />
                              Hide Replies
                            </>
                          ) : (
                            <>
                              <ExpandMore className="mr-1" fontSize="small" />
                              Show Replies ({comment.commentReplies.length})
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {replyingTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pl-4 border-l-2 border-[#42ACD0]"
                      >
                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mb-3">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment.userName || 'this comment'}...`}
                            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42ACD0] focus:border-[#42ACD0]"
                            rows="2"
                            disabled={loading}
                          />
                          <div className="flex space-x-2 mt-1">
                            <motion.button
                              type="submit"
                              className="text-sm bg-[#42ACD0] text-white px-3 py-1 rounded-lg hover:bg-[#368cb1] transition-all duration-200"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={loading}
                            >
                              {loading ? "Posting..." : "Post Reply"}
                            </motion.button>
                            <button
                              type="button"
                              onClick={() => setReplyingTo(null)}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}

                    <AnimatePresence>
                      {showReplies[comment.id] && comment.commentReplies?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 pl-4 border-l-2 border-gray-200 space-y-3"
                        >
                          {comment.commentReplies.map((reply, replyIndex) => (
                            <motion.div
                              key={replyIndex}
                              className="pt-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: replyIndex * 0.05 }}
                            >
                              <div className="flex items-center mb-1">
                                <div className="w-6 h-6 bg-[#42ACD0] bg-opacity-10 rounded-full flex items-center justify-center text-[#42ACD0] text-xs font-bold">
                                  {reply.userName?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="ml-2">
                                  <p className="text-sm font-medium text-gray-800">{reply.userName || 'User'}</p>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(reply.replyDate)}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700">{reply.commentReply}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
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