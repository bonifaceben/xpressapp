import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/logInSlice";  // Import loginUser
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth); // Extract isAuthenticated

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));  // Dispatch login action
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User authenticated, redirecting to dashboard");
      navigate("/dashboard");  // Redirect to Dashboard if authenticated
    }
  }, [isAuthenticated, navigate]); // Run this effect when isAuthenticated changes

  return (
    <div className="container px-5">
      <div className="fromwrap">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="submitbt" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <p className="forgot-password text-right">
            Don't have an account yet? <a href="/Register">Sign up</a>
          </p>
          <p className="forgot-password text-center">
            <a href="/Login">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;