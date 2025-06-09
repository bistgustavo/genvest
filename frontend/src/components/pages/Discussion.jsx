import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PageTransition,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../animations/AnimationWrapper";
import { FaImage } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useAppContext } from "../../context/AppContext";
// Define categories and posts outside the component
const categories = [{ id: "all", name: "All Posts" }];

const initialPosts = [
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
    category: "tech",
    rating: 189,
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
    rating: 312,
  },
];

const Discussion = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const { user, isLoggedIn, navigate } = useAppContext();

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          message: "Please log in to create a post",
          redirectTo: "/discussion",
        },
      });
      return;
    }
    // Handle post submission logic here
    console.log("New post:", newPost);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
      setSelectedFileName(file.name);
    } else {
      setNewPost({ ...newPost, image: null });
      setSelectedFileName("");
    }
  };

  const handleRating = (postIndex) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = {
      ...updatedPosts[postIndex],
      rating: updatedPosts[postIndex].rating + 1,
    };
    setPosts(updatedPosts);
  };

  return (
    <PageTransition>
      <main className="pt-[80px]">
        {/* Hero Section */}
        <section className="relative py-16 bg-[#E0E7E7]">
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
              >
                Investment Discussions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                Join the conversation about market trends and investment
                strategies
              </motion.p>
            </div>
          </div>
        </section>

        {/* Discussion Board */}
        <section className="py-12 bg-[#E0E7E7]">
          <div className="container mx-auto px-4">
            {/* Create Post Section */}
            {isLoggedIn ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="p-6">
                  <form onSubmit={handlePostSubmit}>
                    <div className="flex items-center mb-4">
                      <img
                        src={user.profileImage.url}
                        alt="Your avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-800">
                          {user.fullname}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Share your thoughts
                        </p>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Post Title"
                      className="w-full mb-4 p-3 border rounded-lg"
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                    />
                    <textarea
                      placeholder="What's on your mind?"
                      className="w-full mb-4 p-3 border rounded-lg min-h-[120px]"
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                    />
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-teal-600">
                          <FaImage />
                          <span>Add Photo</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageSelect}
                          />
                        </label>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        >
                          Post
                        </button>
                      </div>
                      {selectedFileName && (
                        <div className="text-sm text-teal-600">
                          Selected photo: {selectedFileName}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                onClick={() =>
                  navigate("/login", {
                    state: {
                      message: "Please log in to create a post",
                      redirectTo: "/discussion",
                    },
                  })
                }
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center mx-auto mt-4 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login to Post
              </button>
            )}

            {/* Categories */}
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    activeCategory === category.id
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Discussion Posts */}
            <StaggerContainer>
              <div className="space-y-8">
                {posts && posts.length > 0 ? (
                  posts
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
                                <h3 className="font-semibold text-gray-800">
                                  {post.author.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {post.author.title} • {post.date}
                                </p>
                              </div>
                            </div>

                            {/* Post Content */}
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
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

                            {/* Rating Button */}
                            <div className="flex items-center pt-4 border-t">
                              <button
                                className="flex items-center gap-2 text-gray-500 hover:text-yellow-500"
                                onClick={() => handleRating(index)}
                              >
                                <AiFillStar className="text-yellow-500" />
                                <span>Rating: {post.rating}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    ))
                ) : (
                  <div className="text-center text-gray-500">
                    No posts available in this category
                  </div>
                )}
              </div>
            </StaggerContainer>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Discussion;
