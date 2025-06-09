import React, { useState } from "react";
import { Link } from "react-router-dom";

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample categories and articles - replace with actual data
  const categories = [
    "All",
    "Market Analysis",
    "Investment Strategy",
    "Financial Planning",
    "Economy",
  ];

  const articles = [
    {
      id: 1,
      title: "Understanding Market Volatility in 2025",
      category: "Market Analysis",
      excerpt:
        "A comprehensive look at current market trends and how to navigate them effectively in the current economic climate...",
      author: "John Smith",
      date: "May 10, 2025",
      readTime: "5 min read",
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: 2,
      title: "Key Strategies for Effective Retirement Planning",
      category: "Financial Planning",
      excerpt:
        "Essential tips and strategies to ensure your retirement savings are on track for a comfortable future...",
      author: "Sarah Johnson",
      date: "May 01, 2025",
      readTime: "7 min read",
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: 3,
      title: "The Power of Diversification",
      category: "Investment Strategy",
      excerpt:
        "Exploring how a well-diversified portfolio can enhance your investment strategy and reduce risk...",
      author: "Michael Brown",
      date: "April 25, 2025",
      readTime: "6 min read",
      image: "https://via.placeholder.com/600x400",
    },
  ];

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <main className="pt-[80px]">
      {/* Hero Section */}
      <section className="py-16 bg-[#0D4E4A]/5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D4E4A] mb-4 text-center">
            Market Insights & Analysis
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto text-center">
            Stay informed with our latest market insights, investment
            strategies, and financial planning tips.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#0D4E4A] text-white"
                    : "bg-[#0D4E4A]/5 text-black hover:bg-[#0D4E4A]/10"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="https://via.placeholder.com/800x600"
                  alt="Featured Article"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <span className="text-[#CB9C30] font-medium">Featured</span>
                <h2 className="text-2xl font-bold text-[#0D4E4A] mt-2 mb-4">
                  The Future of Investment: Trends to Watch in 2025
                </h2>
                <p className="text-black mb-6">
                  An in-depth analysis of emerging investment trends and
                  opportunities in the evolving financial landscape...
                </p>
                <div className="flex items-center text-sm text-black mb-6">
                  <span>By Robert Wilson</span>
                  <span className="mx-2">•</span>
                  <span>May 15, 2025</span>
                  <span className="mx-2">•</span>
                  <span>10 min read</span>
                </div>
                <Link
                  to="/insights/future-of-investment"
                  className="inline-block bg-[#0D4E4A] text-white px-6 py-2 rounded-md hover:bg-[#0D4E4A]/80 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-[#CB9C30] font-medium">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#0D4E4A] mt-2 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-black mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-sm text-black mb-4">
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <Link
                    to={`/insights/${article.id}`}
                    className="text-[#CB9C30] font-medium hover:text-[#CB9C30]/80"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Insights;
