import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { verifyToken } from "../features/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyToken = () => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isTokenVerified } = useSelector((state) => state.auth);

  useEffect(() => {
    const isRegistered = localStorage.getItem("isRegistered") === "true";
    const isVerified = localStorage.getItem("isVerified") === "true";

    if (!isRegistered) {
      toast.error("You must register first.");
      navigate("/register");
    } else if (isVerified) {
      toast.info("Token already verified.");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please enter the token.");
      return;
    }
    dispatch(verifyToken(token));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isTokenVerified) {
      toast.success("Token verified successfully!");
      localStorage.setItem("isVerified", "true");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [isTokenVerified, navigate]);

  return (
    <div className="verify-token-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2>Verify Your Token</h2>
        <div className="form-group">
          <label htmlFor="token">Enter the 6-digit Token</label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            maxLength={6}
            placeholder="123456"
            className="form-control"
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading} className="verify-token-btn">
          {loading ? "Verifying..." : "Verify Token"}
        </button>
      </form>
    </div>
  );
};

export default VerifyToken;
