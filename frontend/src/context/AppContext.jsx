import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

export const AppContexProvider = ({ children }) => {
  const api = axios.create({
    baseURL: "http://localhost:3000/api/v2",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Add response interceptor for handling token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is not 401 or request already retried, reject
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Call the refresh token endpoint
        const response = await api.post("/users/refresh");

        if (response.data?.data?.user) {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        setUser(null);
        setIsAuthenticated(false);
        setIsLoggedIn(false);
        navigate("/login");
        return Promise.reject(refreshError);
      }
    }
  );

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.post("/users/refresh");
        if (response.data?.data?.user) {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        setIsAuthenticated(false);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      console.log("Attempting login with email:", email);
      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.data?.user) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        setIsLoggedIn(true);
        toast.success("Successfully logged in!");
        return { success: true };
      } else {
        console.error("No user data in response:", response.data);
        throw new Error("No user data received");
      }
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      setUser(null);
      setIsAuthenticated(false);
      setIsLoggedIn(false);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
      setIsAuthenticated(false);
      setIsLoggedIn(false);
      toast.success("Successfully logged out!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await api.post("/users/register", userData);
      toast.success("Registration successful! Please log in.");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const value = {
    api,
    navigate,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
