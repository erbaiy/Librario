import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/context";

const GuestMiddleware = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (authState.isAuthenticated) {
            console.log("User is already authenticated");
            // const from = location.state?.from || "/";
            // navigate(from, { replace: true });
        }
    }, [authState.isAuthenticated, navigate, location]);

    return !authState.isAuthenticated ? children : null;
};

export default GuestMiddleware;