import React from "react";
import { Link } from "react-router-dom";
import { teamMembers } from "../../assets/assest.js";
import Card from "../Card.jsx";

const About = () => {
  return (
    <main className="min-h-screen mt-10">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            About Genvest: Turning Your Ambition into Lasting Impact
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Discover the philosophy, people, and principles that drive our
            commitment to your financial success.
          </p>
        </div>
      </section>

      {/* Founding Principle Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our Founding Principle: Turning Ambition into Impact
          </h2>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-gray-700">
              At Genvest, "Turning Ambition into Impact" is more than just a
              tagline; it's the bedrock of our existence. We were founded on the
              conviction that financial services should extend beyond mere
              numbers, translating personal and professional aspirations into
              tangible, real-world outcomes. This principle guides every
              strategy we craft, every piece of advice we offer, and every
              relationship we build, ensuring that your goals are the driving
              force behind your financial journey.
            </p>
            <p className="text-gray-700">
              We believe in empowering you with clarity and purpose,
              transforming your financial potential into a legacy of achievement
              and meaningful contribution.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Forged from Vision
              </h3>
              <p className="text-gray-700">
                Genvest was born from a collective vision to redefine the
                investment landscape in Nepal. We saw a need for a financial
                partner that combines deep market expertise with a truly
                personalized approach, one that listens intently to individual
                ambitions before charting a course.
              </p>
              <p className="text-gray-700">
                Our founders brought together diverse experiences in finance,
                strategy, and client relations, united by the common goal of
                creating an investment firm that prioritizes long-term value and
                genuine client partnership over fleeting trends.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Growth Through Trust
              </h3>
              <p className="text-gray-700">
                From our initial consultations to managing diverse portfolios,
                our growth has been fueled by the trust our clients place in us.
                We understood early on that transparency, education, and
                consistent communication are key to building lasting
                relationships. This commitment to "Turning Ambition into Impact"
                has not only shaped our services but has also become the measure
                of our success, reflected in the achievements of those we serve.
              </p>
              <p className="text-gray-700">
                Today, Genvest stands as a testament to the power of principled
                investing and dedicated advisory, continuously evolving to meet
                the dynamic needs of our clients and the market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 text-center">
                To empower our clients to achieve their most significant life
                and financial goals by providing personalized, transparent, and
                expert investment management and financial planning, truly
                turning their ambition into tangible impact.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 text-center">
                To be the most trusted and respected partner for individuals and
                families in Nepal seeking to transform their financial ambitions
                into a legacy of prosperity, security, and purpose.
              </p>
            </div>
          </div>
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
            Our strength lies in our collective expertise and shared commitment
            to our clients' success. Meet the dedicated individuals who are
            passionate about turning your ambition into impact.
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
              personalized attention, unparalleled clarity, and strategic advice
              tailored to your unique vision of impact. Your ambitions guide us,
              your trust empowers us, and your success is our ultimate reward.
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
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
