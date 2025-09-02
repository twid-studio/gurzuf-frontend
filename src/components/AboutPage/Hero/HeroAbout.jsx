"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext, useRef } from "react";

import "./HeroAbout.scss";
import { Content } from "@/utils/Content/Content";
import { useScroll, useTransform } from "framer-motion";

export default function HeroAbout() {
  const { data } = useContext(DataContext);
  const sectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    layoutEffect: true,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero__content container">
        <p className="title super-text">{data?.hero?.title}</p>
        <p className="text">{data?.hero?.text}</p>
      </div>

      <div className="hero__background-wrapper">
        {data?.hero?.background && (
          <Content
            className="hero__background"
            url={data?.hero?.background}
            alt="Hero background"
            style={{ y }}
            lazy={false}
          />
        )}
      </div>
    </section>
  );
}
