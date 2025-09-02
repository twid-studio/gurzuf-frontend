"use client";
import React, { useContext, useRef, useState } from "react";

import "./NewWhereWeGoing.scss";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { anim, WhereWeGoingAnim } from "@/lib/helpers/anim";
import clsx from "clsx";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function NewWhereWeGoing() {
  const { data: allData } = useContext(DataContext);
  const { whereWeGoing: data } = allData;

  const [textChange, setTextChange] = useState(false);
  const sectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const spring = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 200,
  });

  const margin = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    ["1em 1em 1em", "1em 0em 1em", "1em 0em 1em", "1em 1em 1em"]
  );

  const scale = useTransform(spring, [0.1, 0.5], [1, 1.2]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.5) {
      setTextChange(true);
    } else {
      setTextChange(false);
    }
  });

  return (
    <motion.section
      className="where-we-going"
      style={{ margin }}
      ref={sectionRef}
      id="where-we-going"
    >
      <div className="sticky-container">
        <div className="background-wrapper">
          <motion.div
            className={clsx("background", {
              "background--active": textChange,
            })}
            style={{ scale }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!textChange ? (
            <motion.h1 {...anim(WhereWeGoingAnim.title)} className="title">
                {data?.title}
            </motion.h1>
          ) : (
            <motion.h2 {...anim(WhereWeGoingAnim.title)} className="title">
                {data?.text}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
