import { useState } from 'react';

export default function InstructorCommentsPage() {
  // Sample data - in a real application, this would come from your API
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "johnsmith",
      courseName: "Introduction to React",
      comment: "The section on hooks was really helpful. I'd love to see more examples of useContext in real applications.",
      date: "2023-10-01",
      replied: true,
      replies: [
        {
          id: 101,
          text: "Thanks for your feedback! I'll add more useContext examples in the next update.",
          date: "2023-10-02"
        }
      ]
    },
    {
      id: 2,
      username: "sarahparker",
      courseName: "Advanced JavaScript Patterns",
      comment: "The explanation of factory patterns was confusing. Could you clarify how it differs from the builder pattern?",
      date: "2023-10-03",
      replied: false,
      replies: []
    },
    {
      id: 3,
      username: "davidwilson",
      courseName: "Introduction to React",
      comment: "Great course overall, but I think the section on Redux could be expanded. Would love to see more complex state management examples.",
      date: "2023-10-04",
      replied: false,
      replies: []
    },
    {
      id: 4,
      username: "emilyjones",
      courseName: "CSS Mastery",
      comment: "The responsive design techniques were eye-opening! I've already applied them to my portfolio website.",
      date: "2023-10-05",
      replied: true,
      replies: [
        {
          id: 102,
          text: "That's fantastic to hear, Emily! I'd love to see your portfolio if you're willing to share it.",
          date: "2023-10-06"
        }
      ]
    },
    {
      id: 5,
      username: "michaellee",
      courseName: "Advanced JavaScript Patterns",
      comment: "I'm finding the asynchronous patterns section particularly challenging. Any additional resources you'd recommend?",
      date: "2023-10-07",
      replied: false,
      replies: []
    }
  ]);

  // State for the reply being drafted
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  
  // State for filters
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "replied", "unreplied"
  
  // Get unique course names for filter dropdown
  const courseNames = [...new Set(comments.map(comment => comment.courseName))];
  
  // Handle submitting a reply
  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return;
    
    const newReply = {
      id: Date.now(),
      text: replyText,
      date: new Date().toISOString().split('T')[0]
    };
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replied: true,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    }));
    
    setReplyText("");
    setActiveReplyId(null);
  };
  
  // Filter comments based on selected filters
  const filteredComments = comments.filter(comment => {
    const matchesCourse = !courseFilter || comment.courseName === courseFilter;
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "replied" && comment.replied) || 
                          (statusFilter === "unreplied" && !comment.replied);
    return matchesCourse && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Comments</h1>
      
      {/* Filters */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Filters</h2>
        <div className="flex flex-wrap gap-4">
          <div className="w-64">
            <label htmlFor="courseFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              id="courseFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="">All Courses</option>
              {courseNames.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          
         
        </div>
      </div>
      
      {/* Comments List */}
      <div className="space-y-6">
        {filteredComments.length > 0 ? (
          filteredComments.map(comment => (
            <div key={comment.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Comment Header */}
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{comment.username}</h3>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>{comment.courseName}</span>
                    <span>·</span>
                    <span>{comment.date}</span>
                  </div>
                </div>
                <div>
                 
                </div>
              </div>
              
              {/* Comment Body */}
              <div className="p-4 bg-white">
                <p className="text-gray-800">{comment.comment}</p>
              </div>
              
              {/* Replies Section */}
              {comment.replies.length > 0 && (
                <div className="bg-blue-50 p-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Your Replies:</h4>
                  <div className="space-y-3">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="bg-white p-3 rounded border border-gray-200">
                        <p className="text-gray-800">{reply.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{reply.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Reply Form */}
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                {activeReplyId === comment.id ? (
                  <div className="space-y-3">
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows="3"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        onClick={() => {
                          setActiveReplyId(null);
                          setReplyText("");
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => handleSubmitReply(comment.id)}
                      >
                        Submit Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
                    onClick={() => setActiveReplyId(comment.id)}
                  >
                    {comment.replied ? "Add Another Reply" : "Reply"}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No comments match your current filters.</p>
          </div>
        )}
      </div>
      
      {/* Stats Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded shadow">
            <div className="text-2xl font-bold text-gray-800">{comments.length}</div>
            <div className="text-sm text-gray-600">Total Comments</div>
          </div>
          <div className="text-center p-3 bg-white rounded shadow">
            <div className="text-2xl font-bold text-green-600">
              {comments.filter(c => c.replied).length}
            </div>
            <div className="text-sm text-gray-600">Replied</div>
          </div>
        </div>
      </div>
    </div>
  );
}