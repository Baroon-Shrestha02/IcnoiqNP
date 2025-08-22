import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"; // ← import
import api from "../Utils/api";
import { useAuth } from "../Context/useAuth";

export default function AdminLogin() {
  const { admin, login, logout } = useAuth(); // use global auth state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // ← initialize
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post(
        "/login",
        { username, password },
        { withCredentials: true }
      );

      const data = response.data;
      if (response.status === 200 && data.token) {
        login({ username, role: "admin" }); // Call context login
        sessionStorage.setItem("adminToken", data.token); // Optional: token storage
        setIsModalOpen(false); // ✅ closes modal
        setUsername("");
        setPassword("");
        setError("");
        navigate("/chat"); // ✅ navigates to "/chat"
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          "Unable to connect to server. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("adminToken");
  };

  const openModal = () => {
    if (!admin) {
      setIsModalOpen(true);
      setError("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setUsername("");
    setPassword("");
  };

  // ✅ If admin is logged in
  if (admin?.role === "admin") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Logged in as Admin
          </h1>
          <p className="text-gray-600 mb-6">Welcome to the admin dashboard!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // ✅ If NOT logged in
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Login as Admin
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Admin Login</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading || !username || !password}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>Enter your admin credentials to login</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
