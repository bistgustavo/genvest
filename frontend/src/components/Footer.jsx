import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assest";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#15152f] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <img
              src={assets.logo}
              alt="Genvest Ventures Logo"
              className="h-16 w-auto mb-4"
            />
            <p className="text-lg font-semibold mb-2 text-[#CB9C30]">
              जेनभेष्ट भेन्चर्स प्रा.लि
            </p>
            <p className="text-gray-200">
              Turning Ambition into Impact. Your trusted partner in financial
              growth and stability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#CB9C30] text-lg font-bold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-[#CB9C30] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#CB9C30] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#CB9C30] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/market-data"
                  className="hover:text-[#CB9C30] transition-colors"
                >
                  Market Data
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="hover:text-[#CB9C30] transition-colors"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#CB9C30] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-[#CB9C30] transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#CB9C30] text-lg font-bold mb-6">
              Contact Us
            </h3>
            <p className="mb-4">Kathmandu, Nepal</p>
            <p className="mb-2">
              Email:{" "}
              <a
                href="mailto:info@genvest.com.np"
                className="hover:text-[#CB9C30] transition-colors"
              >
                info@genvest.com.np
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+97712345678"
                className="hover:text-[#CB9C30] transition-colors"
              >
                +977-1-2345678
              </a>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-[#CB9C30] text-center">
          <p className="mb-4">
            &copy; {currentYear} Genvest Ventures Pvt. Ltd. All rights reserved.
          </p>
          <div className="space-x-4">
            <Link
              to="/privacy-policy"
              className="hover:text-[#CB9C30] transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-[#CB9C30]">|</span>
            <Link
              to="/terms-of-use"
              className="hover:text-[#CB9C30] transition-colors"
            >
              Terms of Use
            </Link>
            <span className="text-[#CB9C30]">|</span>
            <Link
              to="/disclosures"
              className="hover:text-[#CB9C30] transition-colors"
            >
              Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
