"use client";
import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { anim, OperationsAnim } from "@/lib/helpers/anim";
import clsx from "clsx";

export default function OperationLinkItem({ 
  item, 
  index, 
  isActive, 
  onClick, 
  videoProgress = 0 
}) {
  const progressMotionValue = useMotionValue(0);
  const smoothProgress = useSpring(progressMotionValue, {
    stiffness: 1000,
    damping: 400
  });
  const lineProgress = useTransform(
    smoothProgress,
    [0, 0.95],
    ["0%", "100%"]
  );

  // Update progress when video progresses
  useEffect(() => {
    if (isActive) {
      progressMotionValue.set(videoProgress);
    } else {
      // Instantly reset when not active
      progressMotionValue.jump(0);
    }
  }, [videoProgress, isActive, progressMotionValue]);

  return (
    <div
      className={clsx("links-item", {
        "links-item--active": isActive,
      })}
      onClick={() => onClick(index)}
    >
      <div className="top">
        <div className="top__arrow">
          <svg
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z" />
          </svg>
        </div>
        <h2>{item?.text}</h2>
      </div>
      {item?.characteristics && (
        <div className="characteristics">
          {item.characteristics.map((char, charIndex) => (
            <div
              className={`characteristics-item characteristics-item--${char.color} `}
              key={charIndex}
            >
              {char.text}
            </div>
          ))}
        </div>
      )}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            className="timeline"
            {...anim(OperationsAnim.timeline)}
          >
            <motion.span
              className="line"
              style={{
                width: lineProgress,
              }}
            ></motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
