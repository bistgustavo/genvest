import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { assets } from "../assets/assest";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { navigate, user, isAuthenticated, logout, isLoggedIn } =
    useAppContext();

  // Debug logging
  useEffect(() => {
    console.log("Navbar Auth State:", { isAuthenticated, isLoggedIn, user });
  }, [isAuthenticated, isLoggedIn, user]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/insights", label: "Insights" },
    // { path: "/market-data", label: "Market Data" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/discussion", label: "Discussion" },
    { path: "/contact", label: "Contact" },
  ];

  const isActivePath = (path) => {
    const currentPath = window.location.pathname;
    if (path === "/" && currentPath !== "/") {
      return false;
    }
    return currentPath.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    setShowProfileMenu(false);
  };

  const scroll = () => {
    scrollTo(0, 0);
  };

  return (
    <nav className="fixed w-full bg-white shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link onClick={scroll} to="/" className="flex items-center">
            <img src={assets.logo} alt="Genvest Logo" className="h-10 w-auto" />
            <span className="ml-2 text-2xl font-bold text-[#0D4E4A]">
              Genvest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={scroll}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActivePath(link.path)
                    ? "text-[#CB9C30]"
                    : "text-black hover:text-[#0D4E4A]"
                }`}
              >
                {link.label}
                {isActivePath(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CB9C30]"
                    initial={false}
                  />
                )}
              </Link>
            ))}

            {/* Auth Button or Profile */}
            <div className="relative">
              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2"
                  >
                    <img
                      className="w-8 h-8 rounded-full border-2 border-[#CB9C30] bg-[#0D4E4A] text-white flex items-center justify-center text-sm font-medium"
                      src={user.profileImage.url}
                      alt=""
                    />
                    <span className="text-sm font-medium text-[#0D4E4A]">
                      {user.fullname || "User"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-[#CB9C30] transition-transform ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-[#0D4E4A] rounded-lg shadow-lg py-2"
                      >
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center px-4 py-2 text-sm text-white hover:bg-black hover:text-[#CB9C30]"
                        >
                          <FaUser className="w-4 h-4 mr-3" />
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-[#CB9C30] hover:bg-black"
                        >
                          <FaSignOutAlt className="w-4 h-4 mr-3" />
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  onClick={scroll}
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-[#CB9C30] text-sm font-medium rounded-lg text-[#CB9C30] hover:bg-[#0D4E4A] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CB9C30] transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#0D4E4A] hover:text-[#CB9C30] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#CB9C30]/20"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    setIsOpen(false);
                    scroll();
                  }}
                  className={`block py-2 text-base font-medium ${
                    isActivePath(link.path)
                      ? "text-[#CB9C30]"
                      : "text-black hover:text-[#0D4E4A]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Button or Profile */}
              {isLoggedIn && user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-base font-medium text-[#0D4E4A] hover:text-[#CB9C30]"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-base font-medium text-red-600 hover:text-red-800"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => {
                    setIsOpen(false);
                    scroll();
                  }}
                  className="block py-2 text-base font-medium text-[#CB9C30] hover:text-[#0D4E4A]"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
