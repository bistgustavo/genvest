import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "../animations/AnimationWrapper";
import { IoIosArrowDown } from "react-icons/io";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is GenVest?",
      answer:
        "GenVest is a modern investment platform designed to help the next generation of investors make informed financial decisions. We provide educational resources, market insights, and a community-driven platform for discussing investment opportunities.",
    },
    {
      question: "How do I get started with investing?",
      answer:
        "To start investing, first educate yourself about different investment options and risk management. Create a budget, set financial goals, and consider starting with a diversified portfolio. We recommend beginning with our educational resources and connecting with our community for guidance.",
    },
    {
      question: "What investment options are available?",
      answer:
        "We offer various investment options including stocks, bonds, ETFs (Exchange-Traded Funds), mutual funds, and cryptocurrency investments. Each option has different risk levels and potential returns, suitable for different investment strategies.",
    },
    {
      question: "How can I manage investment risks?",
      answer:
        "Risk management involves diversification, regular portfolio review, and staying informed about market trends. We recommend diversifying across different asset classes, setting clear investment goals, and never investing more than you can afford to lose.",
    },
    {
      question: "What are the fees associated with investing?",
      answer:
        "Investment fees can include trading commissions, management fees, and platform fees. We believe in transparency and provide detailed fee structures for all our services. Always review the fee schedule before making investment decisions.",
    },
    {
      question: "How do I create an investment strategy?",
      answer:
        "Creating an investment strategy involves assessing your financial goals, risk tolerance, and investment timeline. Consider factors like your age, income, and financial obligations. Our platform provides tools and resources to help you develop a personalized strategy.",
    },
    {
      question: "What tax implications should I consider?",
      answer:
        "Investment income may be subject to capital gains tax, dividend tax, or other taxes depending on your location and investment type. We recommend consulting with a tax professional for personalized advice on tax implications.",
    },
    {
      question: "How can I stay updated with market trends?",
      answer:
        "Stay informed through our platform's market analysis, news updates, and community discussions. We provide regular market insights, expert analysis, and educational content to help you make informed investment decisions.",
    },
  ];

  return (
    <PageTransition>
      <main className="pt-[80px]">
        {/* Hero Section */}
        <section className="relative py-16 bg-[#0D4E4A]/5">
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-[#0D4E4A]"
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-black"
              >
                Find answers to common questions about investing and our
                platform
              </motion.p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-[#0D4E4A]/5 rounded-lg shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#0D4E4A]/10"
                    >
                      <h3 className="text-lg font-semibold text-[#0D4E4A]">
                        {item.question}
                      </h3>
                      <IoIosArrowDown
                        className={`transform transition-transform duration-200 text-xl text-[#CB9C30] ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 py-4 bg-white"
                      >
                        <p className="text-black">{item.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default FAQ;
