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
      className="group flex flex-col items-center py-8 text-sm bg-white backdrop-blur-sm border border-[#0D4E4A]/20 w-full sm:w-64 rounded-lg shadow-md cursor-pointer hover:border-[#0D4E4A] hover:bg-gradient-to-b hover:from-[#0D4E4A] hover:to-[#0D4E4A] transition duration-300 ease-in-out"
    >
      <motion.img
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-24 rounded-full shadow-md ring-2 ring-[#0D4E4A]/20 group-hover:ring-[#CB9C30]"
        src={stakeHolder.image}
        alt={`${stakeHolder.name}'s profile`}
      />
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[#0D4E4A] group-hover:text-[#CB9C30] text-xl font-bold mt-4 text-center px-4 min-h-[3rem] flex items-center justify-center"
      >
        {stakeHolder.name}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[#0D4E4A] group-hover:text-white font-medium text-center px-2"
      >
        {stakeHolder.role}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-black/70 group-hover:text-white/80 w-4/5 mt-4 text-sm leading-relaxed"
      >
        {stakeHolder.description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center space-x-6 mt-6 text-[#0D4E4A] group-hover:text-[#CB9C30]"
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Link to={stakeHolder.linkedin} className="hover:text-white">
            <IoLogoLinkedin size={22} />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Link to={stakeHolder.instagram} className="hover:text-white">
            <FaInstagram size={22} />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Link to={stakeHolder.twitter} className="hover:text-white">
            <FaTwitter size={22} />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
