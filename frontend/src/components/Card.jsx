import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";

const Card = ({ stakeHolder }) => {
  return (
    <div className="group flex flex-col items-center py-8 text-sm bg-white/80 backdrop-blur-sm border border-teal-900/20 w-full sm:w-64 rounded-lg shadow-sm cursor-pointer hover:border-teal-900 hover:bg-gradient-to-b hover:from-teal-800 hover:to-teal-900 transition duration-300 ease-in-out">
      <img
        className="w-24 rounded-full shadow-md ring-2 ring-teal-900/20 group-hover:ring-white/30"
        src={stakeHolder.image}
        alt="userImage2"
      />
      <h2 className="text-teal-900 group-hover:text-white text-xl font-bold mt-4">
        {stakeHolder.name}
      </h2>
      <p className="text-teal-900 group-hover:text-white/90 font-medium">
        {stakeHolder.role}
      </p>
      <p className="text-center text-slate-600 group-hover:text-white/80 w-4/5 mt-4 text-sm leading-relaxed">
        {stakeHolder.description}
      </p>
      <div className="flex items-center space-x-6 mt-6 text-teal-900 group-hover:text-white">
        <Link
          to={stakeHolder.linkedin}
          className="hover:scale-110 transition-transform hover:text-white/90"
        >
          <IoLogoLinkedin size={22} />
        </Link>
        <Link
          to={stakeHolder.instagram}
          className="hover:scale-110 transition-transform hover:text-white/90"
        >
          <FaInstagram size={22} />
        </Link>
        <Link
          to={stakeHolder.twitter}
          className="hover:scale-110 transition-transform hover:text-white/90"
        >
          <FaTwitter size={22} />
        </Link>
      </div>
    </div>
  );
};

export default Card;
