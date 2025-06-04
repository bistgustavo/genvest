import React from "react";
import { Link } from "react-router-dom";
import InsightsSection from "../InsightsSection.jsx";

const Home = () => {
  return (
    <main className="pt-[133px]">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
            Personalized Investment Strategies for Your Financial Goals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Genvest offers tailored financial planning and investment advisory
            to help individuals and families achieve long-term prosperity.
          </p>
          <Link
            to="/contact#consultation-form"
            className="inline-block bg-teal-800 text-white px-8 py-4 rounded-md font-bold hover:bg-teal-900 transform hover:-translate-y-1 transition-all"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-8">
            Your Partner in Financial Growth
          </h2>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-700">
              Welcome to Genvest. We believe in{" "}
              <strong>Turning Ambition into Impact</strong>. Our firm was
              founded on the principle that expert financial guidance should not
              only grow your wealth but also empower you to achieve what truly
              matters. We partner with you to understand your unique aspirations
              and craft personalized strategies designed for meaningful,
              real-world results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-teal-800 mb-4">
                Personalized Approach
              </h3>
              <p className="text-gray-600">
                Custom strategies tailored to your individual goals, risk
                tolerance, and life circumstances.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-teal-800 mb-4">
                Education & Transparency
              </h3>
              <p className="text-gray-600">
                We ensure you understand your investments and the 'why' behind
                our recommendations, fostering clarity and confidence.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-teal-800 mb-4">
                Proactive Communication & Expert Advice
              </h3>
              <p className="text-gray-600">
                Benefit from regular updates, clear market insights, and easy
                access to our experienced advisors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-12">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-4">
                  Portfolio Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Strategic and disciplined management of your investment
                  portfolio to optimize returns and manage risk according to
                  your objectives.
                </p>
                <Link
                  to="/services#portfolio-management"
                  className="text-teal-700 hover:text-teal-900 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-4">
                  Financial Planning
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive planning for your future, including retirement,
                  education savings, wealth transfer, and other major life
                  goals.
                </p>
                <Link
                  to="/services#financial-planning"
                  className="text-teal-700 hover:text-teal-900 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-4">
                  Investment Advisory
                </h3>
                <p className="text-gray-600 mb-4">
                  Ongoing, personalized advice to guide your investment
                  decisions and help you navigate complex financial markets
                  effectively.
                </p>
                <Link
                  to="/services#investment-advisory"
                  className="text-teal-700 hover:text-teal-900 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InsightsSection />

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-8">
            Client-Centric Approach
          </h2>
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-center italic text-gray-700 text-lg">
              "Genvest helped us navigate a complex financial landscape with
              clarity and personalized attention. Their commitment to
              understanding our goals made all the difference."
              <footer className="mt-4 text-gray-600 font-medium">
                - A Valued Client
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Turn Your Ambition into Impact?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let Genvest be your trusted partner in achieving your financial
            aspirations. Contact us today for a personalized consultation.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-teal-900 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transform hover:-translate-y-1 transition-all"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
