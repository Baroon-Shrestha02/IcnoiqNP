import React, { useState, useRef, useEffect } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate dynamic bot response
    setTimeout(() => {
      const botReplies = [
        "Sure! Tell me more about it. 😊",
        "I'm here to help! 🙌",
        "Can you explain further?",
        "Interesting! Let's talk about it. 🤔",
        "Thanks for reaching out! ❤️",
      ];
      const randomReply =
        botReplies[Math.floor(Math.random() * botReplies.length)];
      const botMessage = { text: randomReply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 cursor-pointer group"
        >
          <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-4 py-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition duration-500">
            Need Help? 👋
          </div>
          <div className="mt-2 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce">
            <FaCommentDots size={26} color="white" />
          </div>
        </div>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 max-w-[90%] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3">
            <div className="flex items-center space-x-2">
              <FaCommentDots size={20} />
              <h2 className="font-bold text-lg">Live Chat</h2>
            </div>
            <FaTimes
              className="cursor-pointer hover:scale-125 transition-transform"
              onClick={toggleChat}
              size={20}
            />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 text-sm shadow-md max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex border-t border-gray-300 bg-white">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 focus:outline-none text-gray-700 placeholder-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
