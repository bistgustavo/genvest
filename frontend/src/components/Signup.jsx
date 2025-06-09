import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import axios from "axios";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:3000/api/v2", // Make sure this matches your backend port
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for CORS with credentials
});

const Signup = () => {
  const { navigate } = useAppContext();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    photo: null,
    phoneNumber: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Create preview URL for the image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPhotoPreview(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form
    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms and Conditions");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (!formData.username) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      // Create FormData object to send multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("username", formData.username.trim());
      formDataToSend.append("password", formData.password);
      if (formData.phoneNumber) {
        formDataToSend.append("phoneNumber", formData.phoneNumber.trim());
      }

      // Append profile image if exists
      if (formData.photo) {
        formDataToSend.append("profileImage", formData.photo);
      }

      // Log what we're sending for debugging
      console.log("Sending registration data:", {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        hasPhoto: !!formData.photo,
      });

      // Make API call to register endpoint
      const response = await api.post("/users/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      // Log the response for debugging
      console.log("Registration Response:", {
        status: response.status,
        data: response.data,
      });

      // Check if the response contains data and status is successful
      if (response.status === 201 && response.data) {
        // Show success message in console
        console.log("Registration Success Message:", response.data.message);

        navigate("/login", {
          state: {
            message:
              response.data.message ||
              "Registration successful! Please login with your credentials.",
          },
        });
      }
    } catch (err) {
      console.error("Registration error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message,
      });

      // Handle specific error cases from the backend
      if (err.response?.status === 409) {
        setError("User with email or username already exists");
      } else if (err.response?.data?.message) {
        // Use the error message from the backend if available
        setError(err.response.data.message);
      } else if (err.message === "Network Error") {
        setError(
          "Unable to connect to the server. Please check your connection and try again."
        );
      } else {
        // Fallback error message
        setError("An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gray-50 mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-[#0D4E4A] mb-8">
            Create Your Account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-[#0D4E4A] mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#0D4E4A] mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A]"
                placeholder="johndoe"
              />
            </div>

            <div className="flex flex-col items-center space-y-4">
              <label className="block text-sm font-medium text-[#0D4E4A]">
                Profile Photo
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-[#0D4E4A]/20">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="h-12 w-12 text-[#0D4E4A]/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="photo"
                    className="cursor-pointer py-2 px-3 border border-[#0D4E4A] rounded-md shadow-sm text-sm font-medium text-[#0D4E4A] bg-white hover:bg-[#0D4E4A] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D4E4A]"
                  >
                    Change Photo
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                        setFormData((prev) => ({ ...prev, photo: null }));
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A]"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-[#0D4E4A] mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A]"
                placeholder="+1234567890"
              />
              <p className="mt-1 text-sm text-[#0D4E4A]/70">
                Optional. Include country code (e.g., +1 for USA)
              </p>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A]"
                placeholder="••••••••"
              />
              <p className="mt-1 text-sm text-[#0D4E4A]/70">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#0D4E4A] mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A]"
                placeholder="••••••••"
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#0D4E4A] focus:ring-[#0D4E4A] border-gray-300 rounded"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 block text-sm text-[#0D4E4A]"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-[#0D4E4A] hover:text-[#CB9C30]"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.agreeToTerms}
              className={`w-full bg-[#0D4E4A] text-white py-2 px-4 rounded-lg transition-colors font-semibold
                ${
                  loading || !formData.agreeToTerms
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#CB9C30]"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#0D4E4A]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#0D4E4A] hover:text-[#CB9C30] font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
