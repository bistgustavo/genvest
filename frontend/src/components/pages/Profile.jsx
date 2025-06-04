import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCamera, FaKey } from "react-icons/fa";
import { PageTransition } from "../animations/AnimationWrapper";
import { useAppContext } from "../../context/AppContext";

const Profile = () => {
  const { user } = useAppContext();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Mock user data - replace with actual user data from your context/API
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Investor",
    joinDate: "January 2024",
    profileImage: "/assets/avatar.jpg",
    phoneNumber: "+1 (555) 123-4567",
    location: "New York, USA",
    investmentPreference: "Growth",
    riskTolerance: "Moderate",
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      // Here you would make an API call to change the password
      // For demo purposes, we'll just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsPasswordModalOpen(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      // Show success message
    } catch (err) {
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
            >
              <div className="relative h-48 bg-gradient-to-r from-teal-500 to-teal-600">
                <div className="absolute -bottom-16 left-8">
                  <div className="relative">
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white"
                    />
                    <button className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full text-white hover:bg-teal-700 transition-colors">
                      <FaCamera size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-20 pb-6 px-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {`${userData.firstName} ${userData.lastName}`}
                    </h1>
                    <p className="text-gray-600">{userData.role}</p>
                  </div>
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <FaKey />
                    Change Password
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Phone Number
                    </label>
                    <p className="text-gray-900">{userData.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="text-gray-900">{userData.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Member Since
                    </label>
                    <p className="text-gray-900">{userData.joinDate}</p>
                  </div>
                </div>
              </motion.div>

              {/* Investment Profile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Investment Profile
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">
                      Investment Preference
                    </label>
                    <p className="text-gray-900">
                      {userData.investmentPreference}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Risk Tolerance
                    </label>
                    <p className="text-gray-900">{userData.riskTolerance}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {isPasswordModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Change Password
              </h2>
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </PageTransition>
  );
};

export default Profile;
