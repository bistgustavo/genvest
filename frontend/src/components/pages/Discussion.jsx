import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {assets} from '../../assets/assest.js';

const DiscussionPost = ({ avatar, username, content, likes }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={`${username} Avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <span className="font-semibold text-gray-900">{username}</span>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isLiked
              ? 'bg-blue-100 text-teal-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <i className={`fas fa-thumbs-up mr-2 ${isLiked ? 'text-blue-600' : ''}`}></i>
          {isLiked ? 'Liked!' : 'Rate'}
        </button>
      </div>
    </div>
  );
};

const Discussion = () => {
  const discussionPosts = [
    {
      id: 1,
      avatar: assets.logo,
      username: 'Genvest User 1',
      content: 'This is an example discussion post. You can write about market trends, investment strategies, or ask for advice here!',
      likes: 0,
    },
    {
      id: 2,
      avatar: 'https://via.placeholder.com/45/ff6600/ffffff?text=U2',
      username: 'Genvest User 2',
      content: 'Looking for insights on long-term retirement planning. Any tips or resources from the community would be greatly appreciated!',
      likes: 0,
    },
    {
      id: 3,
      avatar: 'https://via.placeholder.com/45/28a745/ffffff?text=U3',
      username: 'Genvest User 3',
      content: 'What are your thoughts on the recent changes in the stock market? Is it a good time to consider diversifying portfolios?',
      likes: 0,
    },
    {
      id: 4,
      avatar: 'https://via.placeholder.com/45/cccccc/666666?text=U4',
      username: 'Genvest User 4',
      content: 'Empty discussion post. Ready for your thoughts!',
      likes: 0,
    },
  ];

  return (
    <main className="min-h-screen pt-20 pb-16">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Community Discussions
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Share your thoughts, ask questions, and engage with the Genvest community on various financial topics.
          </p>

          <div className="max-w-4xl mx-auto">
            {discussionPosts.map((post) => (
              <DiscussionPost key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Discussion;