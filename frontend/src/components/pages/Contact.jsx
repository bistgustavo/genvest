import React, { useState } from "react";

// Add this constant at the top of your file
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbz7JR-ykM5TSEjp5TDM5JEyLSbtoihAD5ZMIcttmhqwR6KPTuHbo-MJ9Ah69GpG3OXEag/exec";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      // Create form data
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append("timestamp", new Date().toISOString());

      // Convert form data to query string
      const queryString = new URLSearchParams(formDataToSend).toString();
      const urlWithParams = `${GOOGLE_SHEETS_URL}?${queryString}`;

      // Make the request
      const response = await fetch(urlWithParams, {
        method: "GET",
        mode: "no-cors",
      });

      // Since we're using no-cors, we won't get a readable response
      // So we'll assume success if we get here
      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Show success message for 3 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, submitted: false }));
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        submitting: false,
        submitted: false,
        error: "Failed to submit the form. Please try again later.",
      });
    }
  };

  return (
    <main className="pt-[80px]">
      {/* Hero Section */}
      <section className="py-16 bg-[#0D4E4A]/5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D4E4A] mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto text-center">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#0D4E4A] mb-6">
                Send us a Message
              </h2>

              {status.submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-md">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                  {status.error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-[#0D4E4A] rounded-md shadow-sm focus:ring-[#CB9C30] focus:border-[#CB9C30]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border-[#0D4E4A] rounded-md shadow-sm focus:ring-[#CB9C30] focus:border-[#CB9C30]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-black"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border-[#0D4E4A] rounded-md shadow-sm focus:ring-[#CB9C30] focus:border-[#CB9C30]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-black"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full border-[#0D4E4A] rounded-md shadow-sm focus:ring-[#CB9C30] focus:border-[#CB9C30]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-black"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full border-[#0D4E4A] rounded-md shadow-sm focus:ring-[#CB9C30] focus:border-[#CB9C30]"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className={`w-full bg-[#0D4E4A] text-white py-2 px-4 rounded-md hover:bg-[#0D4E4A]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CB9C30] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                  >
                    {status.submitting ? (
                      <>
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
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-[#0D4E4A] mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#CB9C30]">
                      Address
                    </h3>
                    <p className="text-black">
                      123 Investment Avenue
                      <br />
                      Financial District
                      <br />
                      New York, NY 10004
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CB9C30]">
                      Phone
                    </h3>
                    <p className="text-black">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CB9C30]">
                      Email
                    </h3>
                    <p className="text-black">contact@genvest.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CB9C30]">
                      Business Hours
                    </h3>
                    <p className="text-black">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                      <br />
                      Saturday & Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.071825760737!2d85.32396027506908!3d27.71724528279067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190d5e82841d%3A0xe42c49c42316c0d!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1684249382167!5m2!1sen!2sus"
              className="w-full h-96 rounded-lg"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Genvest Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
