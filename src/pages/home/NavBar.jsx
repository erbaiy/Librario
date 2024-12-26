import React, { useState } from 'react';
import { Book, Search, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logout from '../Auth/Logout';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Emprunts', path: '/emprunts' },
    { name: 'Réservations', path: '/reservations' },
  ];

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Book className="h-8 w-8 text-white" />
            </Link>
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link) => (
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
          {/* Actions */}
          <div className="hidden md:flex items-center">
  {/* Search Button */}
  <button
    className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
    aria-label="Search"
  >
    <Search className="h-6 w-6 text-white" />
  </button>

  {/* User Profile Button */}
  <div className="ml-3 relative">
    <button
      className="p-1 bg-black rounded-full flex items-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      aria-label="User Profile"
    >
      <User className="h-6 w-6 text-white" />
    </button>
  </div>

  {/* Logout Button */}
  <div className="ml-3 relative">
    <Logout />
  </div>
</div>
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <User className="h-10 w-10 text-white rounded-full" />
              <div className="ml-3">
                <div className="text-base font-medium">Nom d'utilisateur</div>
                <div className="text-sm font-medium text-gray-400">utilisateur@example.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                Votre Profil
              </Link>
              <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                Paramètres
              </Link>
              <Link to="/logout" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                Se déconnecter
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
