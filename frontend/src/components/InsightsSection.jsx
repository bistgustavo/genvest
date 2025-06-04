import React from "react";
import { Link } from "react-router-dom";

const InsightsSection = () => {
  const insights = [
    {
      id: 1,
      title: "Understanding Market Volatility in 2025",
      excerpt: "A brief look at current market trends and how to navigate them...",
      date: "May 10, 2025",
      link: "/insights/market-volatility",
    },
    {
      id: 2,
      title: "Key Strategies for Effective Retirement Planning",
      excerpt: "Essential tips to ensure your retirement savings are on track for your future...",
      date: "May 01, 2025",
      link: "/insights/retirement-planning",
    },
    {
      id: 3,
      title: "The Power of Diversification",
      excerpt: "Exploring how a diversified portfolio can enhance your investment strategy...",
      date: "April 25, 2025",
      link: "/insights/diversification",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Latest Insights & News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <article
              key={insight.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {insight.title}
                </h3>
                <p className="text-gray-600 mb-4">{insight.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Published: {insight.date}
                  </span>
                  <Link
                    to={insight.link}
                    className="text-teal-600 font-medium hover:text-teal-700"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/insights"
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors"
          >
            Explore All Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;