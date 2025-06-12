import { StaggerItem } from "./animations/AnimationWrapper.jsx"; // Adjust import path as needed
import { AiFillStar } from "react-icons/ai";
import { useState, useRef } from "react";

const PostCard = ({ post, index, handleRating, userDetails }) => {
  const [showRatingStars, setShowRatingStars] = useState(false);
  const hideTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShowRatingStars(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowRatingStars(false);
    }, 300); // 300ms delay
  };

  return (
    <StaggerItem key={index}>
      {/* Removed 'overflow-hidden' from here */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          {/* Author Info */}
          <div className="flex items-center mb-4">
            <img
              src={
                post?.user?.profileImage?.url || userDetails?.profileImage?.url
              }
              alt={post?.user?.fullname || userDetails?.fullname}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">
                {post?.user?.fullname || userDetails?.fullname}
              </h3>
              <p className="text-sm text-gray-500">
                {post.title} • {post.createdAt.split("T")[0]}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">{post.title}</h2>
          <p className="text-gray-600 mb-6">{post.description}</p>

          {/* Post Image */}
          {post?.imageUrl && (
            <div className="mb-6">
              <img
                src={post?.imageUrl}
                alt={post.title}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          )}

          {/* Rating Section */}
          <div
            className="relative pt-4 border-t"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors ${
                showRatingStars ? "text-yellow-500" : ""
              }`}
            >
              <AiFillStar className="text-yellow-500" />
              <span>Rating: {post.ratingCount}</span>
            </button>

            {showRatingStars && (
              <div className="absolute left-0 bottom-full mb-1 z-10 bg-white shadow-lg p-2 rounded-lg flex gap-1 flex-wrap w-max">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleRating(post._id, i + 1); // Pass scriptId and rating value
                      setShowRatingStars(false);
                      clearTimeout(hideTimeoutRef.current);
                    }}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                    title={`Rate ${i + 1}`}
                  >
                    <AiFillStar size={20} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </StaggerItem>
  );
};

export default PostCard;
