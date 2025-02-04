import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk for registering a user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://billxpressapp.onrender.com/api/v1/register",
        formData
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Network error. Please try again." });
    }
  }
);

// AsyncThunk for verifying the token
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://billxpressapp.onrender.com/api/v1/auth/verify-email",
        { token }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Network error. Please try again." });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    formData: {
      name: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    token: "",
    isTokenVerified: false,
    isRegistered: false,
    loading: false,
    error: null,
  },
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    resetForm: (state) => {
      state.formData = {
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      };
      state.error = null;
      state.isRegistered = false;
    },
    resetAuthState: (state) => {
      state.token = "";
      state.isTokenVerified = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.errors || { message: action.payload.message };
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.loading = false;
        state.isTokenVerified = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Token verification failed.";
      });
  },
});

export const { setFormField, resetForm, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
