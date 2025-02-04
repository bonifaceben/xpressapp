import React, { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newError = {};

    if (!formData.name.trim()) {
      newError.name = "This field is required.";
    }

    if (!formData.username.trim()) {
      newError.username = "This field is required.";
    }

    if (!formData.email) {
      newError.email = "This field is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newError.password = "This field is required.";
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters.";
    }

    if (!formData.phoneNumber) {
      newError.phoneNumber = "This field is required.";
    } else if (formData.phoneNumber.length < 11) {
      newError.phoneNumber = "Ensure this value has at least 11 characters.";
    }

    if (!formData.confirmPassword) {
      newError.confirmPassword = "This field is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newError.confirmPassword = "Passwords do not match.";
    }

    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});
    setLoading(true);

    try {
      const response = await axios.post(
        "https://billxpressapp.onrender.com/api/v1/auth/register",
        formData
      );
      console.log("API Response:", response.data);

      
      toast.success("Registration successful! Please check your email to verify your account.");

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/verify-token");
      }, 3000);
    } catch (error) {
      console.error("Error details:", error);
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          const backendErrors = {};
          Object.entries(error.response.data.errors).forEach(([field, message]) => {
            backendErrors[field] = message;
          });
          setError(backendErrors);
          toast.error("Please correct the errors in the form.");
        } else if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else if (error.message) {
        toast.error(`Network Error: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred. Please check your network connection.");
      }
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-5">
      <div className="fromwrap">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              className="form-control"
              placeholder="Full name"
              onChange={handleChange}
            />
            {error.name && <p style={{ color: "red" }}>{error.name}</p>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="username"
              value={formData.username}
              className="form-control"
              placeholder="User name"
              onChange={handleChange}
            />
            {error.username && <p style={{ color: "red" }}>{error.username}</p>}
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
            />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              className="form-control"
              placeholder="Phone"
              onChange={handleChange}
            />
            {error.phoneNumber && <p style={{ color: "red" }}>{error.phoneNumber}</p>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
            />
            {error.password && <p style={{ color: "red" }}>{error.password}</p>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              className="form-control"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            {error.confirmPassword && (
              <p style={{ color: "red" }}>{error.confirmPassword}</p>
            )}
          </div>

          <div className="d-grid">
            <button type="submit" className="submitbt" disabled={loading}>
              {loading ? <BeatLoader color="#fff" size={10} /> : "Sign Up"}
            </button>
          </div>

          <p className="forgot-password text-center">
            Already registered? <a href="/Login">Sign in</a>
          </p>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Register;
