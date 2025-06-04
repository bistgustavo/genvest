import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <main className="pt-[80px]">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4 text-center">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
            Comprehensive financial solutions tailored to your unique needs and
            goals.
          </p>
        </div>
      </section>

      {/* Service Philosophy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">
              Our Approach
            </h2>
            <p className="text-gray-700 mb-8">
              At Genvest, we believe in providing personalized financial
              solutions that align with your goals and values. Our comprehensive
              approach combines expert analysis, innovative strategies, and
              continuous support to help you achieve lasting financial success.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {/* Portfolio Management */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-teal-800 text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Portfolio Management
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Strategic Asset Allocation
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Risk Management
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Performance Monitoring
                    </li>
                  </ul>
                </div>
                <div className="md:w-2/3 p-8">
                  <p className="text-gray-700 mb-6">
                    Our portfolio management service provides comprehensive
                    investment solutions tailored to your risk tolerance and
                    financial goals. We employ sophisticated strategies to
                    optimize returns while managing risk through diversification
                    and active monitoring.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Financial Planning */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-teal-800 text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Financial Planning
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Retirement Planning
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Education Funding
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Estate Planning
                    </li>
                  </ul>
                </div>
                <div className="md:w-2/3 p-8">
                  <p className="text-gray-700 mb-6">
                    Our comprehensive financial planning services help you
                    create a roadmap for your financial future. We consider all
                    aspects of your financial life to develop strategies that
                    align with your long-term goals and provide security for you
                    and your family.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Investment Advisory */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-teal-800 text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Investment Advisory
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Market Analysis
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Investment Strategy
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Regular Consultation
                    </li>
                  </ul>
                </div>
                <div className="md:w-2/3 p-8">
                  <p className="text-gray-700 mb-6">
                    Our investment advisory services provide you with expert
                    guidance and personalized recommendations based on thorough
                    market analysis and your investment objectives. We help you
                    make informed decisions and stay on track with your
                    investment goals.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-900 mb-12 text-center">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">
                Initial Consultation
              </h3>
              <p className="text-gray-600">
                Understanding your goals and current financial situation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">
                Strategy Development
              </h3>
              <p className="text-gray-600">
                Creating a customized plan aligned with your objectives
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">
                Implementation
              </h3>
              <p className="text-gray-600">
                Executing the strategy with precision and care
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">
                Monitoring & Adjustment
              </h3>
              <p className="text-gray-600">
                Regular review and optimization of your portfolio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help you achieve your financial goals.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-teal-900 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transform hover:-translate-y-1 transition-all"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
