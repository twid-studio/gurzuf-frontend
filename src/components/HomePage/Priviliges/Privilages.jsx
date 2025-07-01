"use client";
import React, { useContext, useRef } from "react";
import "./Privilages.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Privilages() {
  const { data: allData } = useContext(DataContext);
  const { privilages: data } = allData;
  const sectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: true,
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.97, 1, 1, 0.97]
  );

  return (
    <motion.section
      className="privilages container"
      style={{ scale }}
      ref={sectionRef}
    >
      <h1>{data?.title}</h1>
      <div className="list">
        {data?.list?.map((item, i) => (
          <div className="item" key={`privilage-item-${i}`}>
            <div className="item__content">
              <h2 className="couter">0{i + 1}</h2>
              <h2>{item.title}</h2>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: item.text }}
              className="item__text"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
