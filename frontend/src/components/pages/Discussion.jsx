import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PageTransition,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../animations/AnimationWrapper";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const Discussion = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <PageTransition>
      <main className="pt-[80px]">
        {/* Hero Section */}
        <section className="relative py-16 bg-slate-900">
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Investment Discussions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-300"
              >
                Join the conversation about market trends and investment
                strategies
              </motion.p>
            </div>
          </div>
        </section>

        {/* Discussion Board */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    activeCategory === category.id
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Discussion Posts */}
            <StaggerContainer>
              <div className="space-y-8">
                {posts
                  .filter(
                    (post) =>
                      activeCategory === "all" ||
                      post.category === activeCategory
                  )
                  .map((post, index) => (
                    <StaggerItem key={index}>
                      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                          {/* Author Info */}
                          <div className="flex items-center mb-4">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="ml-4">
                              <h3 className="font-semibold text-slate-900">
                                {post.author.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {post.author.title} • {post.date}
                              </p>
                            </div>
                          </div>

                          {/* Post Content */}
                          <h2 className="text-xl font-bold text-slate-900 mb-4">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 mb-6">{post.content}</p>

                          {/* Post Image */}
                          {post.image && (
                            <div className="mb-6">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-[300px] object-cover rounded-lg"
                              />
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Interaction Buttons */}
                          <div className="flex items-center gap-6 pt-4 border-t">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-teal-600">
                              <FaHeart />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-teal-600">
                              <FaComment />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-teal-600">
                              <FaShare />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
              </div>
            </StaggerContainer>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

const categories = [
  { id: "all", name: "All Posts" },
];

const posts = [
  {
    title: "Global Market Outlook 2024",
    content:
      "An in-depth analysis of global market trends and predictions for the upcoming year. We explore key sectors and potential investment opportunities.",
    author: {
      name: "Sarah Chen",
      title: "Chief Investment Officer",
      avatar: "/assets/team/sarah-chen.jpg",
    },
    date: "Oct 15, 2023",
    image: "/assets/posts/market-outlook.jpg",
    category: "market-analysis",
    tags: ["Market Analysis", "Global Markets", "2024 Outlook"],
    likes: 245,
    comments: 58,
  },
  {
    title: "Emerging Tech Stocks to Watch",
    content:
      "Discover promising technology companies that are positioned for significant growth in the coming months. Analysis of market potential and risks.",
    author: {
      name: "Michael Rodriguez",
      title: "Senior Market Analyst",
      avatar: "/assets/team/michael-rodriguez.jpg",
    },
    date: "Oct 14, 2023",
    image: "/assets/posts/tech-stocks.jpg",
    category: "investment-strategies",
    tags: ["Tech Stocks", "Growth Investing", "Analysis"],
    likes: 189,
    comments: 42,
  },
  {
    title: "Cryptocurrency Market Update",
    content:
      "Latest developments in the cryptocurrency market, including regulatory changes and technical analysis of major cryptocurrencies.",
    author: {
      name: "David Park",
      title: "Crypto Analyst",
      avatar: "/assets/team/david-park.jpg",
    },
    date: "Oct 13, 2023",
    image: "/assets/posts/crypto-market.jpg",
    category: "crypto",
    tags: ["Cryptocurrency", "Bitcoin", "Market Update"],
    likes: 312,
    comments: 87,
  },
];

export default Discussion;
