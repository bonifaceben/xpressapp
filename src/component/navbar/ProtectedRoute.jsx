import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, type }) => {
  const { isRegistered, isTokenVerified } = useSelector((state) => state.auth);
  const storedRegistration = localStorage.getItem("isRegistered") === "true";
  const storedVerification = localStorage.getItem("isVerified") === "true";

  if (type === "token") {
    if (!isRegistered && !storedRegistration) {
      return <Navigate to="/register" replace />;
    }
    if (isTokenVerified || storedVerification) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  if (!isTokenVerified && !storedVerification) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
