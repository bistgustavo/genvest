import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to handle password reset
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gray-50 mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-[#0D4E4A] mb-8">
            Reset Your Password
          </h2>

          {!isSubmitted ? (
            <>
              <p className="text-[#0D4E4A]/70 text-center mb-6">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A]"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0D4E4A] text-white py-2 px-4 rounded-lg hover:bg-[#CB9C30] transition-colors font-semibold"
                >
                  Send Reset Instructions
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-[#0D4E4A] hover:text-[#CB9C30] text-sm"
                >
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6 text-[#0D4E4A]">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0D4E4A] mb-4">
                Check Your Email
              </h3>
              <p className="text-[#0D4E4A]/70 mb-6">
                We've sent password reset instructions to:
                <br />
                <span className="font-medium">{email}</span>
              </p>
              <Link
                to="/login"
                className="text-[#0D4E4A] hover:text-[#CB9C30] font-medium"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
