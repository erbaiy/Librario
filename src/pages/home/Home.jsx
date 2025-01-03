// Home.jsx
import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import Navbar from './NavBar';
import BookCard from './BookCard';
import ArabicBooksBackground from './ArabicBooksBackground';
import BlogPreview from './BlogPreview';
import { LogOut } from 'lucide-react';
import Logout from '../Auth/Logout';

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        try {
            const currentUser = await getCurrentUser();
            const userAttributes = await fetchUserAttributes();
            const session = await Auth.currentSession();
            const accessToken = session.getAccessToken().getJwtToken();
    
            // Store the token in localStorage
            localStorage.setItem('accessToken', accessToken);

            console.log('User attributes:', userAttributes);
    
            setUser({
                id: currentUser.userId,
                username: currentUser.username,
                email: userAttributes.email,
                name: userAttributes.name || userAttributes.given_name || currentUser.username,
            });
        } catch (err) {
            // User is not authenticated
            setUser(null);
            // Clear token from localStorage when user is not authenticated
            localStorage.removeItem('accessToken');
        }
    }
    

    return (
        <>   
        <Logout/>       
            <Navbar user={user} />     
            <ArabicBooksBackground/>
            <BlogPreview/>
            <BookCard/>
        </>
    );
}

export default Home;
