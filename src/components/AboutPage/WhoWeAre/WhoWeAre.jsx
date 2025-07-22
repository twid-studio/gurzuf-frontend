"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext, useRef } from "react";

import "./WhoWeAre.scss";
import { sectionScrollAnim } from "@/lib/helpers/sectionScrollAnim";
import { motion } from "framer-motion";

export default function WhoWeAre() {
  const { data: allData } = useContext(DataContext);
  const { whoWeAre: data } = allData;

  const sectionRef = useRef();

  const margin = sectionScrollAnim(sectionRef);

  return (
    <motion.section style={{ margin }} className="who-we-are container" ref={sectionRef}>
      <h1>{data?.title}</h1>
      <div className="who-we-are__list">
        {data?.list?.map((item, index) => (
          <div className="item" key={index}>
            <p>{item}</p>
            <h2>0{index + 1}</h2>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
