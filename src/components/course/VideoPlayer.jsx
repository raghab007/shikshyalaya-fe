import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { CheckCircle, Star, StarBorder } from "@mui/icons-material";
import CommentSection from "./CommentSection";
import { motion } from "framer-motion";
import axios from "axios";

const VideoPlayer = ({ selectedVideo }) => {
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  console.log("Selected Video:", selectedVideo);
  useEffect(() => {
    if (selectedVideo?.id) {
      fetchComments();
    }
  }, [selectedVideo?.id]);


  async function onMarkCompleted(videoId) {
    try {

      const response = await axios.post(
        `http://localhost:8085/lectures/${selectedVideo.id}/markcompleted`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsCompleted(true);
      console.log("Marked as completed:", response.data);
    } catch (error) {
      console.error("Error marking video as completed:", error);
    }
    
  }

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8085/comment/${selectedVideo.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

 

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{selectedVideo.title}</h1>
        <div className="flex items-center space-x-4">
          {!selectedVideo.completed ? (
            <motion.button
              onClick={() => onMarkCompleted()}
              className="flex items-center bg-[#42ACD0] text-white px-4 py-2 rounded-lg hover:bg-[#368cb1] transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle className="mr-2" />
              Mark as Completed
            </motion.button>
          ) : (
            <motion.div 
              className="flex items-center text-green-600"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle className="mr-2" />
              <span className="font-semibold">Completed</span>
            </motion.div>
          )}
          
       
        </div>
      </div>
      
      <div className="bg-black rounded-xl shadow-md overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <ReactPlayer
            url={`http://localhost:8085/videos/course/${selectedVideo.videoUrl}`}
            controls={true}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
          />
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Description</h2>
        <p className="text-gray-600">{selectedVideo.description}</p>
      </div>
      
      <CommentSection 
        videoId={selectedVideo.id}
        comments={comments}
        showComments={showComments}
        setShowComments={setShowComments}
      />
    </div>
  );
};

export default VideoPlayer;