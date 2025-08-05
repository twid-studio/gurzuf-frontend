"use client"
import HeroHome from "./Hero/HeroHome";
import AboutHome from "./About/AboutHome";
import ProductsHome from "./Products/ProductsHome";
import Privilages from "./Priviliges/Privilages";
import Operations from "./Operations/Operations";
import QuoteHome from "./Quote/QuoteHome";
import NewsHome from "./News/NewsHome";
import ReviewsHome from "./Reviews/ReviewsHome";
import { motion } from "framer-motion";
import { anim, PageAnim } from "@/lib/helpers/anim";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, []);
    
  return (
    <motion.main className="home" {...anim(PageAnim)}>
      <HeroHome />
      <AboutHome />
      <ProductsHome />
      <Privilages />
      {/* <Operations /> */}
      <QuoteHome />
      <NewsHome />
      <ReviewsHome />
    </motion.main>
  );
};

export default HomePage;
