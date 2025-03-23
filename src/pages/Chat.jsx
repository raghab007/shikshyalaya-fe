import  { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function ChatPage() {
  const [ws, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const messageRef = useRef();
  const chatContainerRef = useRef();
  const {courseId} = useParams()
  
  console.log("Course id")
  console.log(courseId)
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
    try {
      const webSocket = new WebSocket("ws://localhost:8086");

      webSocket.onopen = () => {
        console.log("WebSocket connection established.");
        setIsConnected(true);
        webSocket.send(JSON.stringify({ type: "join", roomcode: courseId}));
      };

      webSocket.onmessage = (e) => {
        console.log(e.data);
        setMessages((prevMessages) => [...prevMessages, { text: e.data, sender: "server" }]);
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
    }}else{
      location.href = "/"
    }
  }, []);

  function sendMessage() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const msg = messageRef.current.value.trim();
      if (msg) {
        ws.send(JSON.stringify({ type: "message", message: msg, roomcode: courseId}));
        setMessages((prevMessages) => [...prevMessages, { text: msg, seder: "user" }]);
        messageRef.current.value = "";
      }
    } else {
      console.error("WebSocket is not open.");
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <div className="text-sm flex items-center mt-1">
          <span className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-red-500'}`}></span>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md break-words ${
                  msg.sender === "user" 
                    ? "bg-blue-500 text-white rounded-br-none" 
                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t shadow-inner">
        <div className="flex items-center">
          <input
            ref={messageRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;