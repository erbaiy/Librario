import React from 'react';
import Sidebar from './components/book-sidebar'; // Sidebar component

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">{children}</div>
        </div>
    );
};

export default Layout;
