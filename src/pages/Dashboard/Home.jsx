import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import Logout from "../Auth/Logout";

function Home() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAuthUser() {
            try {
                // Get the current authenticated user
                const currentUser = await getCurrentUser();
                
                // Get additional user attributes
                const userAttributes = await fetchUserAttributes();
                
                setUser({
                    id: currentUser.userId,
                    username: currentUser.username,
                    email: userAttributes.email,
                    name: userAttributes.name || userAttributes.given_name || currentUser.username,
                });
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Failed to load user information');
            } finally {
                setLoading(false);
            }
        }

        fetchAuthUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user found</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Welcome {user.name} to Dashboard
            </h1>
            <div className="mt-4">
                <Logout />
            </div>
        </div>
    );
}

export default Home;