"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext, useRef, useState } from "react";
import "./TextAbout.scss";
import Image from "next/image";
import { Button } from "@/utils/Button/Button";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";
export default function TextAbout() {
  const { data: allData } = useContext(DataContext);
  const { about: data } = allData;

  return (
    <section className="text-about">
      <div className="title bold">
        <span>{data?.text1.part1}</span>
        <div>
          <TextLink data={data?.text1.link} />
          <span>{data?.text1.part2}</span>
        </div>
      </div>
      <div className="title bold" dangerouslySetInnerHTML={{ __html: data?.text2 }}/>
      <div className="title bold" dangerouslySetInnerHTML={{ __html: data?.text3 }}/>
    </section>
  );
}

const TextLink = ({ data }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const linkRef = useRef(null);
  const timeoutRef = useRef(null);

  const positionX = useMotionValue(0);
  const springConfig = { damping: 800, stiffness: 1500 };

  const plane = useSpring(positionX, springConfig);

  // Detect touch device
  React.useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
  }, []);

  const handleMouseMove = (e) => {
    // Only handle mouse move on non-touch devices
    if (!isTouchDevice) {
      const { left, width } = linkRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 10; // -100% to 100%
      positionX.set(x);
    }
  };

  const handleClick = () => {
    // Only handle click on touch devices
    if (isTouchDevice) {
      setIsActive(true);
    }
  };

  const handleClosePopup = () => {
    setIsActive(false);
  };

  const handlerPopupActive = () => {
    // Only handle mouse events on non-touch devices
    if (!isTouchDevice) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsActive(true);
    }
  };

  const handlerPopupInactive = () => {
    // Only handle mouse events on non-touch devices
    if (!isTouchDevice) {
      // Set a timeout before deactivating
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
        timeoutRef.current = null;
      }, 300);
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="text-link"
      onMouseMove={handleMouseMove}
      onMouseEnter={handlerPopupActive}
      onMouseLeave={handlerPopupInactive}
    >
      <div
        ref={linkRef}
        className={clsx("text-link-content", {
          "text-link-content--active": isActive,
        })}
        onClick={handleClick}
      >
        <p>{data?.title}</p>
        <Image
          src={data?.image}
          alt={data?.title}
          width={30}
          height={20}
          className="text-link-image"
        />
      </div>

      <motion.div
        style={{ x: isTouchDevice ? 0 : plane }}
        className={clsx("text-popup", {
          "text-popup--active": isActive,
        })}
      >
        {isTouchDevice && (
          <svg
            className="text-popup__close-button"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClosePopup}
          >
            <rect width="44" height="44" fill="white" />
            <path
              d="M29.0713 16.3438L23.4141 22L29.0713 27.6572L27.6572 29.0713L22 23.4141L16.3428 29.0713L14.9287 27.6572L20.585 22L14.9287 16.3438L16.3428 14.9287L22 20.5859L27.6572 14.9287L29.0713 16.3438Z"
              fill="black"
            />
          </svg>
        )}

        <Image
          src={data?.image}
          alt={data?.title}
          width={324}
          height={180}
          className="text-popup__image"
        />
        <div className="text-popup__text">
          <h3>{data?.title}</h3>
          <p className="small-text">{data?.text}</p>
        </div>

        {data?.button && data?.button.active && (
        <Button text={data?.button.text} url={data?.button.link} fullWidth />
        )}
      </motion.div>
    </div>
  );
};
