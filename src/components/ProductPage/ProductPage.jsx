"use client";
import React, { useEffect } from "react";

import "./ProductPage.scss";
import HeroAnimWrapper from "./HeroAnimWrapper/HeroAnimWrapper";
import Gallery from "./Gallery/Gallery";
import KeyBenefits from "./KeyBenefits/KeyBenefits";
import Characteristics from "./Characteristics/Characteristics";
import Equipment from "./Equipment/Equipment";

export default function ProductPage() {

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);

  return (
    <main className="product-page">
      <HeroAnimWrapper />
      <Gallery />
      <KeyBenefits />
      <Characteristics />
      <Equipment />
    </main>
  );
}
