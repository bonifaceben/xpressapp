import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const isRegistered = useSelector((state) => state.auth.isRegistered);
    const storedRegistration = localStorage.getItem("isRegistered") === "true";

    if (!isRegistered && !storedRegistration) {
        return <Navigate to="/register" />;
    }

    return children;
};

export default ProtectedRoute;
