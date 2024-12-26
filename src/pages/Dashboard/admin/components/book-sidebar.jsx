import React, { useState } from 'react';
import { FaBook, FaUsers, FaRedo, FaChartBar, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const menuItems = [
        { name: 'Dashboard', icon: <FaChartBar /> },
        { name: 'Books', icon: <FaBook /> },
        { name: 'Borrowers', icon: <FaUsers /> },
        { name: 'Returns', icon: <FaRedo /> },
        { name: 'Reports', icon: <FaChartBar /> },
        { name: 'Profile', icon: <FaUserCircle /> },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-300 flex flex-col p-4">
            <h2 className="flex items-center gap-3 text-lg font-bold mb-5">
                <span role="img" aria-label="logo"></span> Librario
            </h2>

            <div className="mb-4">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href="#"
                        onClick={() => setActiveItem(item.name)}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                            activeItem === item.name ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span> {item.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
