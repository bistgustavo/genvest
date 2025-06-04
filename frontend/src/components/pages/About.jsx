import React from "react";
import { motion } from "framer-motion";
import {
  PageTransition,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../animations/AnimationWrapper";
import { Link } from "react-router-dom";
import { teamMembers } from "../../assets/assest.js";
import Card from "../Card.jsx";

const About = () => {
  return (
    <PageTransition>
      <main className="pt-[80px]">
        {/* Hero Section */}
        <section className="relative py-20 bg-slate-900">
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                About Genvest
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-300"
              >
                A legacy of excellence in investment management and financial
                innovation
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Our Mission
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    At Genvest, our mission is to empower investors with
                    innovative financial solutions and expert guidance. We are
                    committed to delivering superior investment outcomes while
                    maintaining the highest standards of integrity and client
                    service.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 text-teal-600">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-600">
                        Data-driven investment strategies
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 text-teal-600">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-600">
                        Client-centric approach
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 text-teal-600">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-600">
                        Sustainable long-term growth
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Our Vision
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    We envision a future where every investor has access to
                    sophisticated financial tools and personalized guidance. Our
                    goal is to be the leading platform that bridges the gap
                    between traditional investment management and cutting-edge
                    financial technology.
                  </p>
                  <div className="bg-teal-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-teal-900 mb-3">
                      Core Values
                    </h3>
                    <ul className="space-y-2 text-teal-800">
                      <li>• Innovation in Financial Solutions</li>
                      <li>• Transparency and Trust</li>
                      <li>• Excellence in Service</li>
                      <li>• Continuous Improvement</li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Leadership Team
              </h2>
              <p className="text-gray-600">
                Meet the experienced professionals leading Genvest's innovation
                in investment management.
              </p>
            </div>
            <StaggerContainer>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <StaggerItem key={index}>
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                      />
                      <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                        {member.name}
                      </h3>
                      <p className="text-teal-600 text-center mb-4">
                        {member.position}
                      </p>
                      <p className="text-gray-600 text-center">
                        {member.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Client-Centricity",
                  description:
                    "Your ambitions are our blueprint. We place your unique goals and circumstances at the center of every strategy we develop.",
                },
                {
                  title: "Integrity",
                  description:
                    "We operate with unwavering honesty, ethical conduct, and transparency in all our interactions and decisions.",
                },
                {
                  title: "Expertise",
                  description:
                    "We are committed to continuous learning and applying our deep market knowledge for your benefit.",
                },
                {
                  title: "Transparency",
                  description:
                    "We believe in clear, open communication, ensuring you are always informed and confident in your financial journey.",
                },
                {
                  title: "Long-Term Partnership",
                  description:
                    "We aim to build enduring relationships, guiding you through every stage of your financial life with dedication.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              The People Behind Genvest
            </h2>
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
              Our strength lies in our collective expertise and shared
              commitment to our clients' success. Meet the dedicated individuals
              who are passionate about turning your ambition into impact.
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 sm:grid-cols-2">
              {teamMembers.map((member, index) => (
                <Card key={index} stakeHolder={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Commitment to You
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700">
                Partnering with Genvest means choosing a firm that is deeply
                invested in your success. We commit to providing you with
                personalized attention, unparalleled clarity, and strategic
                advice tailored to your unique vision of impact. Your ambitions
                guide us, your trust empowers us, and your success is our
                ultimate reward.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Discuss Your Ambitions
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Connect with our team today to learn how Genvest can help you turn
              your financial aspirations into tangible impact.
            </p>
            <Link
              onClick={() => scrollTo(0, 0)}
              to="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default About;
