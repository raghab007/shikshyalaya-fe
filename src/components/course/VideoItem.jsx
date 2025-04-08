import React from "react";
import { PlayCircle, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";

const VideoItem = ({ video, isCompleted, onSelect, isSelected }) => {
  return (
    <motion.div
      onClick={() => onSelect(video)}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected ? "bg-blue-50 border border-[#42ACD0]" : "hover:bg-gray-50"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <PlayCircle className={`${isCompleted ? "text-green-500" : "text-[#42ACD0]"} mr-3`} />
      <div className="flex-1">
        <p className={`font-medium ${isCompleted ? "text-green-600" : "text-gray-800"}`}>
          {video.title}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(video.uploadedDate).toLocaleDateString()}
        </p>
      </div>
      {isCompleted && <CheckCircle className="text-green-500" />}
    </motion.div>
  );
};

export default VideoItem;