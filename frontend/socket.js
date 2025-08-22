import { io } from "socket.io-client";

const sessionId = localStorage.getItem("sessionId") || Date.now().toString();
localStorage.setItem("sessionId", sessionId);

export const socket = io("http://localhost:3000", {
  query: { sessionId },
  withCredentials: true,
});
