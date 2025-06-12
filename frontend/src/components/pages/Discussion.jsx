import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PageTransition,
  ScrollReveal, // Not used but kept if needed elsewhere
  StaggerContainer,
  StaggerItem,
} from "../animations/AnimationWrapper";
import { FaImage } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai"; // Not directly used here, but in PostCard
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import PostCard from "../PostCard.jsx";
// import Cookies from "js-cookie"; // Not used, removed

const categories = [
  { id: "all", name: "All Posts" },
  { id: "my-posts", name: "My Posts" },
];

const Discussion = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    imageUrl: null,
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const {
    user,
    isLoggedIn,
    navigate,
    getScripts,
    scripts, // This will be the source of truth from AppContext
    getUserScripts,
    userScripts, // This will be the source of truth from AppContext
    createScript,
    addOrUpdateRating,
    isLoading,
    setIsLoading,
  } = useAppContext();

  // Local states to manage posts for optimistic UI updates
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  // Sync all scripts from AppContext to local state
  useEffect(() => {
    const fetchAndSetScripts = async () => {
      await getScripts(); // Fetch the latest scripts
    };
    fetchAndSetScripts();
  }, []); // Run once on component mount

  useEffect(() => {
    if (scripts) {
      setAllPosts(scripts); // Update local state when scripts from AppContext change
    }
  }, [scripts]);

  // Sync user's scripts from AppContext to local state
  useEffect(() => {
    if (isLoggedIn) {
      const fetchAndSetUserScripts = async () => {
        await getUserScripts(); // Fetch the latest user scripts
      };
      fetchAndSetUserScripts();
    }
  }, [isLoggedIn]); // Re-fetch if login status changes

  useEffect(() => {
    if (userScripts) {
      setMyPosts(userScripts); // Update local state when userScripts from AppContext change
    }
  }, [userScripts]);

  // Handling post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          message: "Please log in to create a post",
          redirectTo: "/discussion",
        },
      });
      return;
    }

    if (!newPost.title.trim() || !newPost.description.trim()) {
      toast.error("Title and description cannot be empty.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("description", newPost.description);
      if (newPost.imageUrl instanceof File) {
        formData.append("image", newPost.imageUrl);
      }

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      const { success, error } = await createScript(formData, accessToken);

      if (success) {
        setNewPost({ title: "", description: "", imageUrl: null });
        setSelectedFileName(""); // Clear selected file name
        await getScripts(); // Refresh all posts
        if (isLoggedIn) {
          await getUserScripts(); // Refresh user-specific posts
        }
        toast.success("Post created successfully!");
      } else {
        toast.error(error);
      }
    } catch (error) {
      console.error("Post submission error:", error);
      toast.error(error.message || "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  // Handling image upload
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, imageUrl: file });
      setSelectedFileName(file.name);
    } else {
      setNewPost({ ...newPost, imageUrl: null });
      setSelectedFileName("");
    }
  };

  // --- Handling Rating ---
  const handleRating = async (scriptId, ratingValue, postIndex) => {
    if (!isLoggedIn || !user?._id) {
      toast.error("Please log in to rate posts");
      navigate("/login", {
        state: { redirectTo: window.location.pathname },
      });
      return;
    }

    const userId = user._id; // Get user ID from the global user object

    if (!scriptId || ratingValue === undefined || !userId) {
      console.error("Invalid rating parameters:", {
        scriptId,
        ratingValue,
        userId,
      });
      toast.error("Invalid rating data provided.");
      return;
    }

    // Determine which list of posts to update (allPosts or myPosts)
    const currentPosts = activeCategory === "all" ? allPosts : myPosts;
    const setPostsFunction =
      activeCategory === "all" ? setAllPosts : setMyPosts;

    // Find the original post to get its current ratingCount
    const postToUpdate = currentPosts[postIndex];

    if (!postToUpdate) {
      console.error(
        "Post not found for optimistic update at index:",
        postIndex
      );
      toast.error("Could not find post to update.");
      return;
    }

    // Optimistic UI update
    setPostsFunction((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        ratingCount: updatedPosts[postIndex].ratingCount + 1, // Increment ratingCount
      };
      return updatedPosts;
    });

    try {
      const { success, error } = await addOrUpdateRating(
        scriptId,
        ratingValue,
        userId
      );

      if (!success) {
        // Revert optimistic update if API call fails
        setPostsFunction((prevPosts) => {
          const revertedPosts = [...prevPosts];
          revertedPosts[postIndex] = {
            ...revertedPosts[postIndex],
            ratingCount: revertedPosts[postIndex].ratingCount - 1, // Decrement ratingCount
          };
          return revertedPosts;
        });
        toast.error(error || "Failed to update rating.");
      } else {
        // On success, refresh the data to get the actual updated rating count from the backend
        // (This also ensures other users' ratings are reflected)
        await getScripts();
        if (isLoggedIn) {
          await getUserScripts();
        }
        toast.success("Rating updated successfully!");
      }
    } catch (error) {
      console.error("Rating Handler Error:", error);
      toast.error("An unexpected error occurred while processing your rating");

      // Revert optimistic update on unexpected errors
      setPostsFunction((prevPosts) => {
        const revertedPosts = [...prevPosts];
        revertedPosts[postIndex] = {
          ...revertedPosts[postIndex],
          ratingCount: revertedPosts[postIndex].ratingCount - 1, // Decrement ratingCount
        };
        return revertedPosts;
      });
    }
  };

  const displayedPosts = activeCategory === "all" ? allPosts : myPosts;

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
                        src={user?.profileImage?.url}
                        alt="Your avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-800">
                          {user?.fullname} {/* Use optional chaining */}
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
                      value={newPost.description}
                      onChange={(e) =>
                        setNewPost({ ...newPost, description: e.target.value })
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
                          {isLoading ? (
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            "Post"
                          )}
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
                type="button" // Changed to type="button"
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
              <button
                key="all"
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2 rounded-lg font-medium ${
                  activeCategory === "all"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                All Posts
              </button>

              {isLoggedIn && (
                <button
                  key="my-posts"
                  onClick={() => setActiveCategory("my-posts")}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    activeCategory === "my-posts"
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  My Posts
                </button>
              )}
            </div>

            {/* Discussion Posts */}
            <StaggerContainer>
              {displayedPosts && displayedPosts.length > 0 ? (
                <div className="space-y-8">
                  {displayedPosts.map((script, index) => (
                    <PostCard
                      key={script._id} // Use unique ID for key
                      post={script}
                      index={index}
                      handleRating={(scriptId, ratingValue) =>
                        handleRating(scriptId, ratingValue, index)
                      }
                      userDetails={user} // Pass user details for display if post.user is not available
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No posts available in this category.
                </div>
              )}
            </StaggerContainer>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Discussion;
