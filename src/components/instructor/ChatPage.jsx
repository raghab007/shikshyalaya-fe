import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userProfileSelector } from "../../store/atoms/profle";
import axios from "axios";

function ChatPage() {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const messageRef = useRef();
  const chatContainerRef = useRef();
  const [userInfo] = useRecoilState(userProfileSelector);
  const [isLoading, setIsLoading] = useState(false);

  // Theme colors
  const primaryColor = "rgb(33, 146, 185)";
  const primaryColorLight = "rgba(33, 146, 185, 0.1)";

  // Format date to display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Fetch instructor's courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "http://localhost:8085/instructor/course",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setConnectionStatus("Error loading courses");
      } finally {
        setIsLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch messages and connect WebSocket when course changes
  useEffect(() => {
    if (!selectedCourse) return;

    const fetchMessagesAndConnect = async () => {
      setIsLoading(true);
      setConnectionStatus("Loading messages...");

      try {
        // Fetch previous messages
        const response = await axios.get(
          `http://localhost:8085/messages/${selectedCourse}`
        );
        const formattedMessages = response.data.map((msg) => ({
          text: msg.message,
          sender: msg.userName,
          isCurrentUser: msg.userName === userInfo.userName,
          timestamp: formatDate(msg.date),
          fullDate: msg.date,
        }));

        formattedMessages.sort(
          (a, b) => new Date(a.fullDate) - new Date(b.fullDate)
        );
        setMessages(formattedMessages);

        // Setup WebSocket connection
        setupWebSocket();
      } catch (error) {
        console.error("Error loading messages:", error);
        setConnectionStatus("Error loading messages");
      } finally {
        setIsLoading(false);
      }
    };

    const setupWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      setConnectionStatus("Connecting...");
      const webSocket = new WebSocket("ws://localhost:8086");

      webSocket.onopen = () => {
        setIsConnected(true);
        setConnectionStatus("Connected");
        webSocket.send(
          JSON.stringify({
            type: "join",
            roomcode: selectedCourse,
            userName: userInfo.userName,
          })
        );
      };

      webSocket.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          setMessages((prev) => [
            ...prev,
            {
              text: data.message,
              sender: data.username,
              isCurrentUser: data.username === userInfo.userName,
              timestamp: formatDate(new Date()),
              fullDate: new Date().toISOString(),
            },
          ]);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      webSocket.onerror = () => {
        setIsConnected(false);
        setConnectionStatus("Connection error");
      };

      webSocket.onclose = () => {
        setIsConnected(false);
        setConnectionStatus("Disconnected");
        setTimeout(() => {
          if (selectedCourse) {
            setConnectionStatus("Reconnecting...");
            setupWebSocket();
          }
        }, 3000);
      };

      wsRef.current = webSocket;
    };

    fetchMessagesAndConnect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [selectedCourse, userInfo.userName]);

  const sendMessage = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setConnectionStatus("Cannot send - not connected");
      return;
    }

    const messageText = messageRef.current.value.trim();
    if (!messageText) return;

    wsRef.current.send(
      JSON.stringify({
        type: "message",
        message: messageText,
        roomcode: selectedCourse,
        userName: userInfo.userName,
      })
    );

    setMessages((prev) => [
      ...prev,
      {
        text: messageText,
        sender: userInfo.userName,
        isCurrentUser: true,
        timestamp: formatDate(new Date()),
        fullDate: new Date().toISOString(),
      },
    ]);

    messageRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getCourseName = (id) => {
    const course = courses.find(
      (c) => c.id === id || c._id === id || c.courseID === id
    );
    return course ? course.courseName || course.name : id;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Course Selection */}
      <div className="p-4 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Course Chat</h1>
            <div className="w-full md:w-80">
              {isLoadingCourses ? (
                <div className="flex items-center justify-center h-10">
                  <div
                    className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2"
                    style={{ borderColor: primaryColor }}
                  ></div>
                </div>
              ) : (
                <select
                  value={selectedCourse || ""}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: primaryColorLight }}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option
                      key={course.courseID || course._id || course.id}
                      value={course.courseID || course._id || course.id}
                    >
                      {course.courseName || course.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedCourse ? (
        <>
          {/* Chat Header */}
          <div
            className="p-4 shadow-sm border-b border-gray-200"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div>
                <div className="text-sm text-blue-100 mt-1 flex items-center">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      isConnected ? "bg-green-300" : "bg-red-300"
                    }`}
                  ></span>
                  {connectionStatus}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-white bg-blue-400 px-3 py-1 rounded-full">
                  {userInfo.userName} (Instructor)
                </span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white"
          >
            <div className="max-w-4xl mx-auto space-y-3">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div
                    className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2"
                    style={{ borderColor: primaryColor }}
                  ></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <svg
                    className="w-12 h-12 mb-2 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p>No messages yet</p>
                  <p className="text-sm">Start the conversation</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg ${
                        msg.isCurrentUser ? "ml-6" : "mr-6"
                      }`}
                    >
                      {!msg.isCurrentUser && (
                        <div className="text-xs font-medium text-gray-500 mb-1 ml-1">
                          {msg.sender}
                        </div>
                      )}
                      <div
                        className={`relative rounded-2xl p-3 shadow-sm ${
                          msg.isCurrentUser
                            ? "rounded-br-none text-white"
                            : "rounded-bl-none bg-white text-gray-800 border border-gray-100"
                        }`}
                        style={
                          msg.isCurrentUser
                            ? { backgroundColor: primaryColor }
                            : {}
                        }
                      >
                        <div className="break-words">{msg.text}</div>
                        <div
                          className={`text-xs mt-1 flex ${
                            msg.isCurrentUser ? "justify-end" : "justify-start"
                          } ${
                            msg.isCurrentUser
                              ? "text-blue-100"
                              : "text-gray-400"
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200 shadow-sm">
            <div className="max-w-4xl mx-auto flex items-center">
              <input
                ref={messageRef}
                type="text"
                placeholder={
                  !isConnected
                    ? "Connecting... (messages disabled)"
                    : "Type your message..."
                }
                className={`flex-1 p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isConnected ? "bg-gray-100" : ""
                }`}
                style={{ backgroundColor: primaryColorLight }}
                onKeyPress={handleKeyPress}
                disabled={!isConnected || isLoading}
              />
              <button
                onClick={sendMessage}
                className="px-5 py-3 text-white rounded-r-xl hover:opacity-90 focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                style={{ backgroundColor: primaryColor }}
                disabled={
                  !isConnected || isLoading || !messageRef.current?.value.trim()
                }
              >
                Send
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
          <div className="text-center p-8 max-w-md">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Select a Course to Start Chatting
            </h2>
            <p className="text-gray-600">
              Choose one of your courses from the dropdown to begin messaging
              with students.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
