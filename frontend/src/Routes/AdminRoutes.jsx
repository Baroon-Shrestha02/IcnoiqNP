// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Components/Context/useAuth";

export default function AdminRoutes({ children }) {
  const { admin, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Checking access...</div>;

  // 🚫 If not logged in → redirect to "/"
  if (!admin) return <Navigate to="/" replace />;

  // ✅ If admin is logged in → allow access
  return children;
}
