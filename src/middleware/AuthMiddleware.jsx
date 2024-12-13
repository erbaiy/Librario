import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/context";

const AuthMiddleware = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (!authState.isAuthenticated) {
            console.log("User is not authenticated");
            navigate("/login", { state: { from: location.pathname } });
        }
    }, [authState.isAuthenticated, navigate, location]);

    return authState.isAuthenticated ? children : null;
};

export default AuthMiddleware;