import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import NotFound from "./componemt/navbar/NotFound";
import VerifyToken from "./pages/VerifyToken";
import ProtectedRoute from "./componemt/navbar/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/verify-token"
          element={
            <ProtectedRoute type="token">
              <VerifyToken />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
