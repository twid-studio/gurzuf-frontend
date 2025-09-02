"use client";
import React, { useEffect } from "react";

import "./ProductPage.scss";
import HeroAnimWrapper from "./HeroAnimWrapper/HeroAnimWrapper";
import Gallery from "./Gallery/Gallery";
import KeyBenefits from "./KeyBenefits/KeyBenefits";
import Characteristics from "./Characteristics/Characteristics";
import Equipment from "./Equipment/Equipment";
import { motion } from "framer-motion";
import { anim, PageAnim } from "@/lib/helpers/anim";

export default function ProductPage() {

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);

  return (
    <motion.main className="product-page" {...anim(PageAnim)}>
      <HeroAnimWrapper />
      <Gallery />
      <KeyBenefits />
      <Characteristics />
      {/* <Equipment /> */}
    </motion.main>
  );
}
