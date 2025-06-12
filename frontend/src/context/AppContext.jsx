import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
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

  // for image upload
  const apiFile = axios.create({
    baseURL: "http://localhost:3000/api/v2",
    timeout: 10000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
  const [scripts, setScripts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userScripts, setUserScripts] = useState([]);

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
  const login = async (email, password, options = {}) => {
    try {
      setIsLoading(true);
      console.log("Attempting login with email:", email);

      const response = await api.post(
        "/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: options.withCredentials ?? true,
        }
      );

      console.log("Login response:", response.data);

      // 1. First verify the response structure
      if (!response.data?.data) {
        throw new Error("Invalid response structure from server");
      }

      // 2. Check for user data first
      if (!response.data.data.user) {
        throw new Error("No user data received");
      }

      // 3. Then check for access token
      const accessToken = response.data.data.accessToken;
      if (!accessToken) {
        throw new Error("No access token received");
      }

      // 4. Update state and set cookie
      setUser(response.data.data.user);
      setIsAuthenticated(true);
      setIsLoggedIn(true);

      Cookies.set("accessToken", accessToken, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: 1, // 1 day
      });

      localStorage.setItem("accessToken", accessToken);

      toast.success("Successfully logged in!");
      return { success: true, user: response.data.data.user };
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      // Clear any existing invalid token
      Cookies.remove("accessToken");

      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

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

  // Get all scripts
  const getScripts = async () => {
    try {
      const response = await api.get("/scripts/get-all-scripts");

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to fetch scripts");
      }

      // Assuming scripts are directly in response.data.data
      const scriptsData = response.data.data || [];

      setScripts(scriptsData);
      return { success: true, data: scriptsData };
    } catch (error) {
      console.error("Error fetching scripts:", error);
      const message =
        error.response?.data?.message || "Failed to fetch scripts";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Get users scripts
  const getUserScripts = async () => {
    try {
      const response = await api.get("/scripts/get-my-scripts");

      if (!isAuthenticated) {
        throw new Error("User not authenticated");
      }

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to fetch user scripts"
        );
      }

      setUserScripts(response.data.data);
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("Error fetching user scripts:", error);
      const message =
        error.response?.data?.message || "Failed to fetch user scripts";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Create a new script
  const createScript = async (formData, token) => {
    try {
      const response = await apiFile.post("scripts/create-script", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Script created successfully!");
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("Error creating script:", error);
      const message =
        error.response?.data?.message || "Failed to create script";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // add or update rating
  const addOrUpdateRating = async (scriptId, rating, userId) => {
    try {
      // Validate inputs
      if (!scriptId || !rating || !userId) {
        throw new Error("Script ID, rating, and user ID are required");
      }

      if (rating < 1 || rating > 10) {
        throw new Error("Rating must be between 1 and 10");
      }

      // Assuming `api` is your axios instance or similar for making HTTP requests
      const response = await api.post(
        `/ratings/add-rating`,
        { scriptId, rating, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Rating operation failed");
      }

      toast.success(response.data.message || "Rating updated successfully!");
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Rating Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update rating. Please try again.";

      // Specific handling for unauthorized errors
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        // Optional: Trigger logout function here if available in context
        // logout();
      } else {
        toast.error(errorMessage);
      }

      return {
        success: false,
        error: errorMessage,
        status: error.response?.status,
      };
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
    getScripts,
    scripts,
    getUserScripts,
    userScripts,
    createScript,
    apiFile,
    addOrUpdateRating,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
