import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Edit3 } from "lucide-react";

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
    localStorage.getItem("username") || sessionId
  );
  const [sessionSaved, setSessionSaved] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempUsername, setTempUsername] = useState("");
  const [nameError, setNameError] = useState("");
  const chatEndRef = useRef(null);
  const nameInputRef = useRef(null);

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

  const handleNameUpdate = () => {
    setTempUsername(username);
    setNameError("");
    setShowNameModal(true);
  };

  const handleNameSubmit = async () => {
    const trimmedName = tempUsername.trim();

    // Validation
    if (!trimmedName) {
      setNameError("Name cannot be empty");
      return;
    }

    if (trimmedName.length < 2) {
      setNameError("Name must be at least 2 characters long");
      return;
    }

    if (trimmedName.length > 30) {
      setNameError("Name must be less than 30 characters");
      return;
    }

    // Check for inappropriate characters
    const validNameRegex = /^[a-zA-Z0-9\s\-_.]+$/;
    if (!validNameRegex.test(trimmedName)) {
      setNameError(
        "Name can only contain letters, numbers, spaces, hyphens, underscores, and dots"
      );
      return;
    }

    try {
      setUsername(trimmedName);
      localStorage.setItem("username", trimmedName);
      await saveUsername(trimmedName);
      setShowNameModal(false);
      setNameError("");

      // Show a brief success message in chat
      const successMsg = {
        sender: "system",
        message: `✨ Your name has been updated to "${trimmedName}"!`,
        timestamp: Date.now(),
        isSystem: true,
      };
      setMessages((prev) => [...prev, successMsg]);
    } catch (error) {
      setNameError("Failed to save name. Please try again.");
    }
  };

  const handleNameCancel = () => {
    setShowNameModal(false);
    setTempUsername("");
    setNameError("");
  };

  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNameSubmit();
    }
    if (e.key === "Escape") {
      handleNameCancel();
    }
  };

  // Focus input when modal opens
  useEffect(() => {
    if (showNameModal && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 100);
    }
  }, [showNameModal]);

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
      if (msg.sessionId === sessionId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!sessionSaved) {
      await saveUsername(username || sessionId);
    }

    const msgData = {
      sessionId,
      senderId: username || sessionId,
      receiverId: "admin",
      text: input,
      username: username || sessionId,
    };

    socket.emit("send_message", msgData);
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
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce group-hover:animate-none ">
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

          {/* Chat container - Modal on mobile, floating on desktop */}
          <div className="fixed inset-4 sm:bottom-6 sm:right-6 sm:top-auto sm:left-auto sm:w-96 sm:h-[500px] w-auto h-auto bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 backdrop-blur-sm">
            {/* Header */}
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-base sm:text-lg">
                    Live Support
                  </h2>
                  <button
                    onClick={handleNameUpdate}
                    className="flex items-center space-x-1 text-[10px] sm:text-[11px] text-white/80 hover:text-white transition-colors duration-200 group"
                  >
                    <User size={10} className="sm:w-3 sm:h-3" />
                    <span className="underline">
                      {username && username !== sessionId
                        ? username
                        : "Set Your Name"}
                    </span>
                    <Edit3
                      size={8}
                      className="sm:w-2.5 sm:h-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
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
                              : msg.isSystem
                              ? "justify-center"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`relative max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm shadow-md ${
                              msg.sender === "user"
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-3 sm:ml-4"
                                : msg.isSystem
                                ? "bg-green-50 text-green-700 border border-green-200 text-center max-w-full"
                                : "bg-gray-100 text-gray-800 mr-3 sm:mr-4 border border-gray-200"
                            }`}
                          >
                            {msg.message || msg.text}
                            {!msg.isSystem && (
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
                            )}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 bg-gray-50/50 p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3 bg-white rounded-full border border-gray-200 shadow-sm">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 rounded-full text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none mr-1"
                >
                  <Send size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Press Enter to send
              </p>
            </div>
          </div>
        </>
      )}

      {/* Name Update Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Update Your Name</h3>
                    <p className="text-sm text-white/80">
                      How would you like to be addressed?
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNameCancel}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={tempUsername}
                    onChange={(e) => {
                      setTempUsername(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    onKeyPress={handleNameKeyPress}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors duration-200 ${
                      nameError
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                    placeholder="Enter your name..."
                    maxLength={30}
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm mt-2 animate-in slide-in-from-left-2">
                      {nameError}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs mt-2">
                    This is how you'll appear in the chat. {tempUsername.length}
                    /30 characters
                  </p>
                </div>

                {/* Preview */}
                {tempUsername.trim() && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-2xl max-w-xs">
                        <div className="text-sm">
                          Hello! This is how my messages will appear.
                        </div>
                        <div className="text-xs text-white/80 mt-1">
                          {tempUsername.trim()} • Just now
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleNameCancel}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNameSubmit}
                  disabled={!tempUsername.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  Save Name
                </button>
              </div>
            </div>

            {/* Tip */}
            <div className="bg-blue-50 border-t border-blue-100 px-6 py-3 rounded-b-2xl">
              <p className="text-xs text-blue-600 text-center">
                💡 Tip: Press Enter to save or Escape to cancel
              </p>
            </div>
          </div>
        </div>
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
        @keyframes animate-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: animate-in 0.3s ease-out forwards; }
      `}</style>
    </>
  );
}
