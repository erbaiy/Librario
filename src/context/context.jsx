import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')) ,
    });

    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    );
};
