import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/context";
import { signOut } from 'aws-amplify/auth';

function Logout() {
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        
        try {
            // Show loading state if needed
            // setIsLoading(true);

            // Sign out from Cognito
            await signOut({
                global: true
            });

            // Clear all auth-related data
            const cleanup = () => {
                // Clear local storage
                localStorage.clear();

                // Clear any auth cookies if they exist
                document.cookie.split(";").forEach((cookie) => {
                    document.cookie = cookie
                        .replace(/^ +/, "")
                        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
                });

                // Update auth context
                setAuthState({ 
                    isAuthenticated: false,
                    user: null,
                    tokens: null
                });
            };

            cleanup();

            // Navigate to login page
            navigate("/login");

        } catch (error) {
            console.error('Logout error:', error);
            
            // Handle specific error cases
            if (error.name === 'NetworkError') {
                // Handle offline scenario
                cleanup(); // Still clear local data
                navigate("/login");
            } else {
                // Show error message to user
                alert('Failed to logout. Please try again.');
            }
        }
    }

    return (
        <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600
             transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
            Log out
        </button>
    );
}

export default Logout;
