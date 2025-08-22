import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User } from "lucide-react";

import { socket } from "../../../socket";
import api from "../Utils/api";

const sessionId = localStorage.getItem("sessionId") || Date.now().toString();
localStorage.setItem("sessionId", sessionId);

export default function Chat2() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [sessionSaved, setSessionSaved] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(!username);
  const [tempUsername, setTempUsername] = useState("");
  const chatEndRef = useRef(null);

  const saveUsername = async (newName) => {
    try {
      await api.post("/save-session", {
        sessionId,
        username: newName,
      });
      console.log("Username saved.");
      setSessionSaved(true);
    } catch (err) {
      console.error("Error saving username:", err);
    }
  };

  const handleUsernameSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!tempUsername.trim()) return;

    setUsername(tempUsername);
    localStorage.setItem("username", tempUsername);
    await saveUsername(tempUsername);
    setShowUsernameForm(false);
    setTempUsername("");
  };

  const handleNameUpdate = () => {
    setShowUsernameForm(true);
    setTempUsername(username || "");
  };

  useEffect(() => {
    api
      .get(`/session/${sessionId}`)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Message load error", err);
        setLoading(false);
      });

    socket.on("receive_message", (msg) => {
      // ✅ Only add if not from this user
      if (msg.sessionId === sessionId && msg.sender !== "user") {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [isOpen, messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!sessionSaved) {
      await saveUsername(username || sessionId);
    }

    const msgData = {
      sessionId,
      sender: "user", // ✅ mark it clearly
      senderId: username || sessionId,
      receiverId: "admin",
      text: input,
      username: username || sessionId,
      timestamp: Date.now(),
    };

    // Send to socket
    socket.emit("send_message", msgData);

    // Add locally so it shows instantly
    setMessages((prev) => [...prev, msgData]);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {!isOpen && (
        <div
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 cursor-pointer group"
        >
          <div className="absolute -top-12 right-0 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap transform translate-y-2 group-hover:translate-y-0 hidden sm:block">
            Need Help? 👋
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800"></div>
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce">
            <MessageCircle size={24} className="text-white sm:w-7 sm:h-7" />
          </div>
        </div>
      )}

      {isOpen && (
        <>
          {/* Modal backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={toggleChat}
          ></div>

          {/* Chat container */}
          <div className="fixed bottom-4 inset-x-4 sm:bottom-6 sm:right-6 sm:inset-x-auto sm:w-96 sm:h-[500px] h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 backdrop-blur-sm">
            {/* Header */}
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-base sm:text-lg">
                    Iconiq Live Support
                  </h2>
                  {username && !showUsernameForm && (
                    <button
                      onClick={handleNameUpdate}
                      className="text-[10px] sm:text-[11px] underline text-white/80 hover:text-white text-left flex items-center gap-1"
                    >
                      <User size={10} className="sm:w-3 sm:h-3" />
                      {username}
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="space-y-3 sm:space-y-4 min-h-full">
                  {loading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-6 sm:py-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MessageCircle
                          size={20}
                          className="text-blue-500 sm:w-6 sm:h-6"
                        />
                      </div>
                      <p className="text-gray-500 text-sm">
                        Start a conversation!
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        We typically reply in a few minutes
                      </p>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            msg.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`relative max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm shadow-md ${
                              msg.sender === "user"
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-3 sm:ml-4"
                                : "bg-gray-100 text-gray-800 mr-3 sm:mr-4 border border-gray-200"
                            }`}
                          >
                            {msg.message || msg.text}
                            <div
                              className={`text-xs mt-1 opacity-70 ${
                                msg.sender === "user"
                                  ? "text-white/80"
                                  : "text-gray-500"
                              }`}
                            >
                              {new Date(
                                msg.timestamp || Date.now()
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Username Form OR Input */}
            {showUsernameForm ? (
              <div className="border-t border-gray-200 bg-blue-50/50 p-3 sm:p-4">
                <form
                  onSubmit={handleUsernameSubmit}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 
                               focus:border-transparent text-sm"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    maxLength={30}
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!tempUsername.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                               text-white rounded-lg hover:shadow-lg transition-all 
                               duration-200 disabled:opacity-50 text-sm font-medium"
                  >
                    {username ? "Update" : "Set"}
                  </button>
                </form>
                <p className="text-xs text-blue-500 text-center mt-2">
                  Press Enter or click "{username ? "Update" : "Set"}" to
                  continue
                </p>
              </div>
            ) : (
              <div className="border-t border-gray-200 bg-gray-50/50 p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3 bg-white rounded-full border border-gray-200 shadow-sm">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent focus:outline-none 
                               text-gray-700 placeholder-gray-400 rounded-full text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 
                               text-white rounded-full hover:shadow-lg transition-all 
                               duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
                               disabled:hover:shadow-none mr-1"
                  >
                    <Send size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Press Enter to send
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Scrollbar Styling */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: rgb(209, 213, 219);
          border-radius: 2px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgb(156, 163, 175);
        }
      `}</style>
    </>
  );
}
