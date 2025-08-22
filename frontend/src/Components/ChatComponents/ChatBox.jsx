import React, { useEffect, useState } from "react";
import {
  Send,
  User,
  MessageCircle,
  Search,
  ArrowLeft,
  Menu,
  Clock,
  CheckCheck,
} from "lucide-react";
import axios from "axios";
import { socket } from "../../../socket";
import api from "../Utils/api";

export default function ChatBox() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [allMessages, setAllMessages] = useState({});
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesEndRef = React.useRef(null);

  // Initial fetch of sessions and messages
  useEffect(() => {
    api
      .get("/usernames", { withCredentials: true })
      .then(async (res) => {
        const updatedSessions = res.data;
        setSessions(updatedSessions);
        const messagesPromises = updatedSessions.map((s) =>
          api.get(`/session/${s.sessionId}`).then((res2) => ({
            sessionId: s.sessionId,
            messages: res2.data,
          }))
        );
        const allMsgs = await Promise.all(messagesPromises);
        const messagesMap = allMsgs.reduce((acc, { sessionId, messages }) => {
          acc[sessionId] = messages;
          return acc;
        }, {});
        setAllMessages(messagesMap);
      })
      .catch((err) =>
        console.error("Failed to fetch usernames or messages", err)
      );
  }, []);

  // Socket listener for real-time updates
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleReceiveMessage = (msg) => {
      const { sessionId } = msg;

      // Normalize the structure
      const normalized = {
        sessionId,
        sender: msg.sender || (msg.senderId === "admin" ? "admin" : "user"),
        message: msg.message || msg.text,
        timestamp: msg.timestamp || Date.now(),
      };

      setAllMessages((prev) => {
        const currentMessages = prev[sessionId] || [];
        const updatedMessages = [...currentMessages, normalized];
        return { ...prev, [sessionId]: updatedMessages };
      });

      // Update sessions list if new session
      setSessions((prev) => {
        const existing = prev.find((s) => s.sessionId === sessionId);
        if (!existing) {
          return [{ sessionId, username: sessionId }, ...prev];
        }
        return prev; // No need to reorder if already exists
      });

      // Scroll to bottom if this is the selected session
      if (sessionId === selectedSession && messagesEndRef.current) {
        setTimeout(() => {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    // Cleanup on unmount
    return () => {
      socket.off("receive_message", handleReceiveMessage);
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [selectedSession]); // Dependency on selectedSession to re-run when it changes

  // Auto scroll effect
  useEffect(() => {
    if (selectedSession && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [selectedSession, allMessages[selectedSession]]);

  const sendMessage = () => {
    if (!text.trim() || !selectedSession) return;

    const msg = {
      sessionId: selectedSession,
      senderId: "admin",
      receiverId: selectedSession,
      text,
    };

    socket.emit("send_message", msg);

    setAllMessages((prev) => ({
      ...prev,
      [selectedSession]: [
        ...(prev[selectedSession] || []),
        { ...msg, sender: "admin", message: text, timestamp: Date.now() },
      ],
    }));

    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const getLastMessage = (sessionId) => {
    const messages = allMessages[sessionId] || [];
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

  const getLastMessageTime = (sessionId) => {
    const lastMessage = getLastMessage(sessionId);
    return lastMessage?.timestamp || 0;
  };

  const filteredSessions = [...sessions]
    .filter((s) => s.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aTime = getLastMessageTime(a.sessionId);
      const bTime = getLastMessageTime(b.sessionId);
      return bTime - aTime; // sort descending: newest first
    });

  const hasUnreadMessages = (sessionId) => {
    const messages = allMessages[sessionId] || [];
    const lastMessage = messages[messages.length - 1];
    return lastMessage && lastMessage.sender === "user";
  };

  const getUsername = (sessionId) => {
    const session = sessions.find((s) => s.sessionId === sessionId);
    return session?.username && session.username !== sessionId
      ? session.username
      : sessionId;
  };

  const handleSessionSelect = (sessionId) => {
    setSelectedSession(sessionId);
    setIsMobileSidebarOpen(false); // Close mobile sidebar when session is selected
  };

  const handleBackToSessions = () => {
    setSelectedSession(null);
    setIsMobileSidebarOpen(true);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const now = new Date();
    const msgTime = new Date(timestamp);
    const diffInHours = (now - msgTime) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return msgTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return msgTime.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const SessionListItem = ({
    sessionId,
    username,
    isActive = false,
    isMobile = false,
  }) => {
    const lastMessage = getLastMessage(sessionId);
    const hasUnread = hasUnreadMessages(sessionId);

    return (
      <div
        onClick={() => handleSessionSelect(sessionId)}
        className={`relative p-4 cursor-pointer transition-all duration-200 hover:bg-slate-50 border-b border-slate-100 ${
          isActive ? "bg-blue-50 border-r-4 border-r-blue-500" : ""
        } ${isMobile ? "active:bg-slate-100" : ""}`}
      >
        <div className="flex items-start gap-3">
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                hasUnread
                  ? "bg-gradient-to-br from-emerald-100 to-emerald-200"
                  : "bg-gradient-to-br from-slate-100 to-slate-200"
              }`}
            >
              <User
                className={`w-6 h-6 ${
                  hasUnread ? "text-emerald-600" : "text-slate-600"
                }`}
              />
            </div>
            {hasUnread && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3
                className={`text-sm font-semibold truncate ${
                  isActive ? "text-blue-900" : "text-slate-900"
                } ${hasUnread ? "text-slate-900" : ""}`}
              >
                {username}
              </h3>

              {lastMessage?.timestamp && (
                <span className="text-xs text-slate-400 ml-2 flex-shrink-0">
                  {formatTime(lastMessage.timestamp)}
                </span>
              )}
            </div>

            {lastMessage && (
              <div className="flex items-center gap-1">
                {lastMessage.sender === "admin" && (
                  <CheckCheck className="w-3 h-3 text-blue-500 flex-shrink-0" />
                )}
                <p
                  className={`text-xs truncate ${
                    hasUnread ? "text-slate-700 font-medium" : "text-slate-500"
                  }`}
                >
                  {lastMessage.sender === "admin" ? "" : ""}
                  {lastMessage.message || lastMessage.text}
                </p>
              </div>
            )}

            {!lastMessage && (
              <p className="text-xs text-slate-400 italic">No messages yet</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[80vh] bg-gradient-to-br from-slate-50 to-slate-100 mt-12 rounded-4xl overflow-hidden">
      <div className="hidden md:flex w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200 flex-col shadow-xl h-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            Admin Chat
          </h1>
          <p className="text-blue-100 text-sm mt-1">Manage conversations</p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 transition-all"
            />
          </div>
        </div>

        {/* Session List */}
        <div className="flex-1 overflow-y-auto bg-white min-h-0">
          {filteredSessions.length > 0 ? (
            filteredSessions.map(({ sessionId, username }, index) => (
              <SessionListItem
                key={index}
                sessionId={sessionId}
                username={username}
                isActive={selectedSession === sessionId}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative bg-white w-full max-w-sm flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
              <h1 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                Admin Chat
              </h1>
              <p className="text-blue-100 text-sm mt-1">Manage conversations</p>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                />
              </div>
            </div>

            {/* Session List */}
            <div className="flex-1 overflow-y-auto">
              {filteredSessions.length > 0 ? (
                filteredSessions.map(({ sessionId, username }, index) => (
                  <SessionListItem
                    key={index}
                    sessionId={sessionId}
                    username={username}
                    isMobile={true}
                  />
                ))
              ) : (
                <div className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No conversations found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedSession ? (
          <>
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-sm p-4 border-b border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                {/* Mobile Back Button */}
                <button
                  onClick={handleBackToSessions}
                  className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>

                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-slate-900">
                    {getUsername(selectedSession)}
                  </h2>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-emerald-600">Online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white min-h-0">
              {(allMessages[selectedSession] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === "admin"
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                        : "bg-white text-slate-900 border border-slate-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <Clock
                        className={`w-3 h-3 ${
                          msg.sender === "admin"
                            ? "text-blue-200"
                            : "text-slate-400"
                        }`}
                      />
                      <p
                        className={`text-xs ${
                          msg.sender === "admin"
                            ? "text-blue-200"
                            : "text-slate-500"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white/90 backdrop-blur-sm p-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={!text.trim()}
                  className={`p-3 rounded-full transition-all shadow-lg ${
                    text.trim()
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:scale-105"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="text-center max-w-md mx-auto p-8">
              {/* Mobile: Show menu button when no session selected */}
              <div className="md:hidden mb-8">
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Welcome to Admin Chat
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {window.innerWidth < 768
                  ? "Tap the menu button above to view and manage your conversations with users."
                  : "Select a conversation from the sidebar to start chatting with users. All conversations are sorted by the most recent activity."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
