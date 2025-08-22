import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getmessages", { withCredentials: true })
      .then((res) => {
        setMessages(res.data);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">All Messages (Admin)</h2>
      <div className="space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="p-2 bg-white border rounded shadow">
            <div>
              <b>{msg.sender}</b> (Session: {msg.sessionId})
            </div>
            <div>{msg.message}</div>
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
