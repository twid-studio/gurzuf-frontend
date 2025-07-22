"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext, useRef } from "react";

import "./ImportantToUs.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { sectionScrollAnim } from "@/lib/helpers/sectionScrollAnim";

export default function ImportantToUs() {
  const { data: allData } = useContext(DataContext);
  const { importantToUs: data } = allData;

  const sectionRef = useRef();
  const margin = sectionScrollAnim(sectionRef);

  return (
    <motion.section
      ref={sectionRef}
      className="important-to-us container"
      style={{ margin }}
    >
      <h1>{data?.title}</h1>
      <div className="important-to-us__list">
        {data?.list?.map((item, index) => (
          <div className="item" key={index}>
            <Image
              src={item.icon}
              alt={""}
              width={32}
              height={32}
              className="icon"
            />
            <h2>{item.text}</h2>
          </div>
        ))}
      </div>
      {data?.text && <p className="important-to-us__text">{data?.text}</p>}
    </motion.section>
  );
}
