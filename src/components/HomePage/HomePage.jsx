import { Content } from "@/utils/Content/Content";

import "./HomePage.scss";
import HeroHome from "./Hero/HeroHome";
import AboutHome from "./About/AboutHome";
import ProductsHome from "./Products/ProductsHome";
import Privilages from "./Priviliges/Privilages";
import Operations from "./Operations/Operations";
import QuoteHome from "./Quote/QuoteHome";
import NewsHome from "./News/NewsHome";
import ReviewsHome from "./Reviews/ReviewsHome";

const HomePage = () => {
  return (
    <main className="home">
      <HeroHome />
      <AboutHome />
      <ProductsHome />
      <Privilages />
      <Operations />
      <QuoteHome />
      <NewsHome />
      <ReviewsHome />
    </main>
  );
};

export default HomePage;
