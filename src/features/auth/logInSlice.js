import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk for logging in a user
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://billxpressapp.onrender.com/api/v1/auth/login",
        formData
      );
      console.log("Login Response:", response.data);

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Network error. Please try again." });
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: localStorage.getItem("token") || "",
    user: {
      id: "",
      name: "",
      username: "",
    },
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = "";
      state.user = { id: "", name: "", username: "" };
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          id: action.payload.user.id,
          name: action.payload.user.name,
          username: action.payload.user.username,
        };
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed. Please try again.";
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
