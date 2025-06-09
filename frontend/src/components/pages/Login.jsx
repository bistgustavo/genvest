import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "../animations/AnimationWrapper";
import { assets } from "../../assets/assest";
import { useAppContext } from "../../context/AppContext";

const Login = () => {
  
  const location = useLocation();
  const { login, isAuthenticated , navigate } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.redirectTo || "/";
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { success, error: loginError } = await login(
        formData.email,
        formData.password
      );

      if (success) {
        // If there's a redirect path in location state, use it
        const redirectTo = location.state?.redirectTo || "/";
        navigate(redirectTo);
      } else {
        setError(loginError || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex justify-center mb-6">
                <Link to="/">
                  <img
                    src={assets.logo}
                    alt="Genvest Logo"
                    className="h-16 w-auto"
                  />
                </Link>
              </div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0D4E4A] mb-2">
                  Welcome Back
                </h1>
                <p className="text-[#0D4E4A]/70">
                  Sign in to access your investment dashboard
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6"
                >
                  {error}
                </motion.div>
              )}

              {location.state?.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 text-blue-600 px-4 py-3 rounded-lg mb-6"
                >
                  {location.state.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#0D4E4A] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A] transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#0D4E4A] mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A] transition-colors"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#0D4E4A] focus:ring-[#0D4E4A] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-[#0D4E4A]"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-[#0D4E4A] hover:text-[#CB9C30]"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0D4E4A] hover:bg-[#CB9C30] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D4E4A] transition-colors ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[#0D4E4A]">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-[#0D4E4A] hover:text-[#CB9C30]"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Login;
