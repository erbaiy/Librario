// NavBar.jsx
import React, { useState } from 'react';
import { Book, Search, User, Menu, X, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logout from '../Auth/Logout';

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Basic links that are always shown
    const links = [
        { name: 'Accueil', path: '/' },
        { name: 'Catalogue', path: '/catalogue' }
    ];

    // Add protected links only if user is authenticated
    const allLinks = user 
        ? [...links, { name: 'Emprunts', path: '/emprunts' }, { name: 'Réservations', path: '/reservations' }]
        : links;

    const handleLoginClick = () => {
        navigate('/login');
        setIsOpen(false);
    };

    return (
        <nav className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Desktop Menu */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <Book className="h-8 w-8 text-white" />
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {allLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                                            location.pathname === link.path
                                                ? 'bg-gray-800 text-white'
                                                : 'hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            aria-label="Search"
                        >
                            <Search className="h-6 w-6 text-white" />
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="p-1 rounded-full hover:bg-gray-700">
                                    <User className="h-6 w-6 text-white" />
                                </Link>
                                <Logout />
                            </div>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
                            >
                                <LogIn className="h-5 w-5" />
                                <span>Se connecter</span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {allLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {user ? (
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5">
                                    <User className="h-10 w-10 text-white" />
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">{user.name}</div>
                                        <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2">
                                    <Logout />
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="px-2">
                                    <button
                                        onClick={handleLoginClick}
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
                                    >
                                        <LogIn className="h-5 w-5" />
                                        <span>Se connecter</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
