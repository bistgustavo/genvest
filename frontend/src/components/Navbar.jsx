import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {assets} from '../assets/assest.js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <header className={`fixed top-0 w-full bg-white border-b border-gray-200 shadow-sm z-50 transition-transform duration-400 ${isHeaderHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="container mx-auto px-4 py-1 max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Genvest Ventures Pvt. Ltd. Logo"
                className="h-20 w-auto"
              />
            </Link>
          </div>

          <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <ul onClick={() => setIsMenuOpen(false)} className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li><Link to="/" className="block px-3 py-2 text-gray-700 hover:text-teal-800 hover:bg-teal-50 rounded-md font-medium">Home</Link></li>
              <li><Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-teal-800 hover:bg-teal-50 rounded-md font-medium">About Us</Link></li>
              <li><Link to="/services" className="block px-3 py-2 text-gray-700 hover:text-teal-800 hover:bg-teal-50 rounded-md font-medium">Services</Link></li>
              <li><Link to="/market-data" className="block px-3 py-2 text-gray-700 hover:text-teal-800 hover:bg-teal-50 rounded-md font-medium">Market Data</Link></li>
              <li><Link to="/insights" className="block px-3 py-2 text-gray-700 hover:text-teal-800 hover:bg-teal-50 rounded-md font-medium">Insights</Link></li>
              <li><Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-teal-800 hover:bg-teal-50 rounded-md font-medium">Contact Us</Link></li>
              <li><Link to="/discussion" className="block px-3 py-2 text-gray-700 hover:text-teal-800 hover:bg-teal-50 rounded-md font-medium">Discussion</Link></li>
            </ul>
          </nav>

          <div className="flex items-center ml-4">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="w-10 h-10 rounded-full border-2 border-blue-600 overflow-hidden"
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;