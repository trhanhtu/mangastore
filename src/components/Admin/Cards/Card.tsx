import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { motion } from "framer-motion";
import { FaUserPlus, FaShoppingCart, FaBook } from 'react-icons/fa';
import AnalysisApi from "../../../apis/AnalysisApi";

const Cards = () => {
  const [totalMangas, setTotalMangas] = useState<string>("0");
  const [totalUsers, setTotalUsers] = useState<string>("0");
  const [totalGenres, setTotalGenres] = useState<string>("0");


  // Fetch the total manga count on component mount
  useEffect(() => {
    const fetchTotalManga = async () => {
      try {
        const response = await AnalysisApi.getTotalManga(); // Assuming getTotalManga returns Base<number>
        setTotalMangas(response.data.toString()); // Set manga count as a string
      } catch (error) {
        console.error("Failed to fetch total manga count:", error);
      }
    };

    fetchTotalManga();
  }, []);

  useEffect(() => {
    const fetchTotalUser = async () => {
      try {
        const response = await AnalysisApi.getTotalUser(); // Assuming getTotalManga returns Base<number>
        setTotalUsers(response.data.toString()); // Set manga count as a string
      } catch (error) {
        console.error("Failed to fetch total manga count:", error);
      }
    };

    fetchTotalUser();
  }, []);
  useEffect(() => {
    const fetchTotalGenre = async () => {
      try {
        const response = await AnalysisApi.getTotalGenre(); // Assuming getTotalManga returns Base<number>
        setTotalGenres(response.data.toString()); // Set manga count as a string
      } catch (error) {
        console.error("Failed to fetch total manga count:", error);
      }
    };

    fetchTotalGenre();
  }, []);

  // Define cart items with updated manga count
  const cartItems = [
    { id: 1, title: "Total Users", value: totalUsers, icon: <FaUserPlus /> },
    { id: 2, title: "Total Mangas", value: totalMangas, icon: <FaBook /> },
    { id: 3, title: "Total Genres", value: totalGenres, icon: <FaBook /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="translate-all flex flex-wrap gap-3 p-4 duration-300 sm:px-7"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {cartItems.map((item, index) => (
        <CardItem item={item} key={index} variants={itemVariants} />
      ))}
    </motion.div>
  );
};

export default Cards;
