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
import { useContext, useEffect } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";

const HomePage = () => {
  const { data } = useContext(DataContext);

  useEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, []);
    
  return (
    <motion.main className="home" {...anim(PageAnim)}>
      <HeroHome />
      {data?.about?.isVisible && <AboutHome />}
      {data?.products?.isVisible && <ProductsHome />}
      {data?.privilages?.isVisible && <Privilages />}
      {data?.operations?.isVisible && <Operations />}
      {data?.quote?.isVisible && <QuoteHome />}
      {data?.news?.isVisible && <NewsHome />}
      {data?.reviews?.isVisible && <ReviewsHome />}
    </motion.main>
  );
};

export default HomePage;
