import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userProfileSelector } from "../store/atoms/profle";
import axios from "axios";

function ChatPage() {
  const [ws, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const messageRef = useRef();
  const chatContainerRef = useRef();
  const { courseId } = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userProfileSelector);
  const [isLoading, setIsLoading] = useState(true);

  // Theme colors
  const primaryColor = "rgb(33, 146, 185)";
  const primaryColorLight = "rgba(33, 146, 185, 0.1)";
  const primaryColorDark = "rgb(25, 115, 145)";

  // Format date to display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch previous messages when component mounts
  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8085/messages/${courseId}`
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
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreviousMessages();
  }, [courseId, userInfo.userName]);

  // WebSocket connection
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const webSocket = new WebSocket("ws://localhost:8086");

        webSocket.onopen = () => {
          console.log("WebSocket connection established.");
          setIsConnected(true);
          webSocket.send(
            JSON.stringify({
              type: "join",
              roomcode: courseId,
              userName: userInfo.userName,
            })
          );
        };

        webSocket.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            console.log("Received message:", data);

            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: data.message,
                sender: data.username,
                isCurrentUser: data.username === userInfo.userName,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                fullDate: new Date().toISOString(),
              },
            ]);
          } catch (error) {
            console.error("Error parsing message:", error);
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: e.data,
                sender: "system",
                isCurrentUser: false,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                fullDate: new Date().toISOString(),
              },
            ]);
          }
        };

        webSocket.onerror = (error) => {
          console.error("WebSocket error:", error);
          setIsConnected(false);
        };

        webSocket.onclose = () => {
          console.log("WebSocket connection closed.");
          setIsConnected(false);
        };

        setWebSocket(webSocket);

        return () => {
          webSocket.close();
        };
      } catch (error) {
        console.log(error);
        setIsConnected(false);
      }
    } else {
      location.href = "/";
    }
  }, [courseId, userInfo.userName]);

  function sendMessage() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const msg = messageRef.current.value.trim();
      if (msg) {
        ws.send(
          JSON.stringify({
            type: "message",
            message: msg,
            roomcode: courseId,
            userName: userInfo.userName,
          })
        );

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: msg,
            sender: userInfo.userName,
            isCurrentUser: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            fullDate: new Date().toISOString(),
          },
        ]);
        messageRef.current.value = "";
      }
    } else {
      console.error("WebSocket is not open.");
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 mt-16">
      {/* Header */}
      <div
        className="p-4 shadow-sm border-b border-gray-200"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">
              Course Chat: {courseId}
            </h1>
            <div className="text-sm text-blue-100 mt-1">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${isConnected ? "bg-green-300" : "bg-red-300"}`}
              ></span>
              {isConnected ? "Live connection" : "Disconnected"}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-white bg-blue-400 px-3 py-1 rounded-full">
              {userInfo.userName}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white"
        style={{ scrollBehavior: "smooth" }}
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
                className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg ${msg.isCurrentUser ? "ml-6" : "mr-6"}`}
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
                      msg.isCurrentUser ? { backgroundColor: primaryColor } : {}
                    }
                  >
                    <div className="break-words">{msg.text}</div>
                    <div
                      className={`text-xs mt-1 flex ${msg.isCurrentUser ? "justify-end" : "justify-start"} ${msg.isCurrentUser ? "text-blue-100" : "text-gray-400"}`}
                    >
                      {msg.timestamp}
                    </div>
                    {msg.isCurrentUser ? (
                      <div className="absolute right-0 bottom-0 w-3 h-3 -mr-1 overflow-hidden">
                        <div
                          className="h-full"
                          style={{ backgroundColor: primaryColor }}
                        ></div>
                      </div>
                    ) : (
                      <div className="absolute left-0 bottom-0 w-3 h-3 -ml-1 overflow-hidden">
                        <div className="h-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center">
          <input
            ref={messageRef}
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:border-transparent"
            style={{
              backgroundColor: primaryColorLight,
              focusRingColor: primaryColor,
            }}
            onKeyPress={handleKeyPress}
            disabled={!isConnected || isLoading}
          />
          <button
            onClick={sendMessage}
            className="px-5 py-3 text-white rounded-r-xl hover:opacity-90 focus:outline-none focus:ring-2 transition-all"
            style={{ backgroundColor: primaryColor }}
            disabled={!isConnected || isLoading}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
