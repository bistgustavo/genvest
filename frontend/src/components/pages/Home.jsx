import React from "react";
import { Link } from "react-router-dom";
import InsightsSection from "../InsightsSection.jsx";
import { motion } from "framer-motion";
import {
  PageTransition,
  FadeIn,
  SlideUp,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../animations/AnimationWrapper";
import { assets } from "../../assets/assest";
import { useAppContext } from "../../context/AppContext.jsx";

const Home = () => {
  const { navigate } = useAppContext();
  return (
    <PageTransition>
      <main className="pt-[80px]">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0D4E4A] via-[#0D4E4A]/80 to-[#0D4E4A]">
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
          <FadeIn>
            <div className="container mx-auto px-4 py-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white space-y-8">
                  <SlideUp delay={0.2}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      Strategic Investment Solutions for{" "}
                      <span className="text-[#CB9C30]">Sustainable Growth</span>
                    </h1>
                  </SlideUp>
                  <SlideUp delay={0.3}>
                    <p className="text-lg md:text-xl text-gray-300">
                      Empowering investors with data-driven strategies and
                      comprehensive market analysis for informed
                      decision-making.
                    </p>
                  </SlideUp>
                  <SlideUp delay={0.4}>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => navigate("/insights")}
                        className="px-8 py-3 bg-[#CB9C30] text-white rounded-lg hover:bg-[#CB9C30]/80 transition-all font-medium cursor-pointer"
                      >
                        View Insights
                      </button>
                    </div>
                  </SlideUp>
                </div>
                <div className="hidden md:block">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    src={assets.investment}
                    alt="Investment Analysis"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Key Metrics Section */}
        <section className="py-16 bg-white">
          <ScrollReveal>
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-[#0D4E4A]">$2.5B+</h3>
                  <p className="text-black mt-2">Assets Under Management</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-[#0D4E4A]">15+</h3>
                  <p className="text-black mt-2">Years of Excellence</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-[#0D4E4A]">5000+</h3>
                  <p className="text-black mt-2">Satisfied Clients</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-[#0D4E4A]">98%</h3>
                  <p className="text-black mt-2">Client Retention</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D4E4A] mb-4">
                Comprehensive Investment Solutions
              </h2>
              <p className="text-black">
                Our expertise spans across multiple domains to provide you with
                holistic financial solutions.
              </p>
            </div>
            <StaggerContainer>
              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <StaggerItem key={index}>
                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-[#0D4E4A]/10 rounded-lg flex items-center justify-center mb-6">
                        <service.icon className="w-6 h-6 text-[#0D4E4A]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#0D4E4A] mb-4">
                        {service.title}
                      </h3>
                      <p className="text-black mb-6">{service.description}</p>
                      <Link
                        to={service.link}
                        className="text-[#CB9C30] font-medium hover:text-[#CB9C30]/80 flex items-center"
                      >
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        <InsightsSection />

        {/* CTA Section */}
        <section className="py-20 bg-[#0D4E4A]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D4E4A] mb-6">
                Ready to Elevate Your Investment Strategy?
              </h2>
              <p className="text-xl text-black mb-8">
                Join thousands of successful investors who trust Genvest for
                their financial future.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

const services = [
  {
    title: "Portfolio Management",
    description:
      "Expert management of diversified investment portfolios tailored to your risk profile and objectives.",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
    link: "/services/portfolio-management",
  },
  {
    title: "Market Analysis",
    description:
      "In-depth market research and analysis to identify optimal investment opportunities.",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    link: "/services/market-analysis",
  },
  {
    title: "Wealth Planning",
    description:
      "Comprehensive wealth management strategies for long-term financial security.",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    link: "/services/wealth-planning",
  },
];

export default Home;
