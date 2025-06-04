import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { motion } from "framer-motion";

const Card = ({ stakeHolder }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col items-center py-8 text-sm bg-white/80 backdrop-blur-sm border border-teal-900/20 w-full sm:w-64 rounded-lg shadow-md cursor-pointer hover:border-teal-900 hover:bg-gradient-to-b hover:from-teal-800 hover:to-teal-900 transition duration-300 ease-in-out"
    >
      <motion.img
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-24 rounded-full shadow-md ring-2 ring-teal-900/20 group-hover:ring-white/30"
        src={stakeHolder.image}
        alt="userImage2"
      />
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-teal-900 group-hover:text-white text-xl font-bold mt-4"
      >
        {stakeHolder.name}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-teal-900 group-hover:text-white/90 font-medium"
      >
        {stakeHolder.role}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-slate-600 group-hover:text-white/80 w-4/5 mt-4 text-sm leading-relaxed"
      >
        {stakeHolder.description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center space-x-6 mt-6 text-teal-900 group-hover:text-white"
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Link to={stakeHolder.linkedin} className="hover:text-white/90">
            <IoLogoLinkedin size={22} />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Link to={stakeHolder.instagram} className="hover:text-white/90">
            <FaInstagram size={22} />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Link to={stakeHolder.twitter} className="hover:text-white/90">
            <FaTwitter size={22} />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
