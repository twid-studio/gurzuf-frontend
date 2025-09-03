"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";
import OperationLinkItem from "./OperationLinkItem";

import "./Operations.scss";
import clsx from "clsx";
import { motion } from "framer-motion";
import { OperationsAnim } from "@/lib/helpers/anim";
import { useInView } from "react-intersection-observer";
import { sectionScrollAnim } from "@/lib/helpers/sectionScrollAnim";

export default function Operations() {
  const { data: allData } = useContext(DataContext);
  const { operations: data } = allData;
  
  // Return early if operations data is not available
  if (!data || !data.list || data.list.length === 0) {
    return null;
  }

  const [activeItem, setActiveItem] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const videoRefs = useRef([]);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.3,
  });

  const sectionScrollRef = useRef();
  const margin = sectionScrollAnim(sectionScrollRef);


  useEffect(() => {
    const currentVideo = videoRefs.current[activeItem];
    if (currentVideo) {
      if (inView) {
        currentVideo
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(console.error);
      } else {
        currentVideo.pause();
        setIsPlaying(false);
      }
    }
  }, [inView, activeItem]);

  useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach((video, index) => {
      if (video && index !== activeItem) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Play active video if in view
    const currentVideo = videoRefs.current[activeItem];
    if (currentVideo && inView) {
      currentVideo.currentTime = 0;
      setCurrentTime(0);
      setVideoProgress(0);

      currentVideo
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(console.error);
    }
  }, [activeItem, inView]);

  const handleTimeUpdate = (videoElement, index) => {
    if (index === activeItem) {
      const current = videoElement.currentTime;
      const total = videoElement.duration;

      setCurrentTime(current);
      setDuration(total);

      if (total > 0) {
        const progress = current / total;
        setVideoProgress(progress);

        // Auto-advance to next item when video ends
        if (progress >= 0.98) {
          // Slightly before end to ensure smooth transition
          const nextIndex = (activeItem + 1) % (data?.list?.length || 1);
          setActiveItem(nextIndex);
        }
      }
    }
  };

  const handleVideoLoad = (videoElement) => {
    if (videoElement.readyState >= 1) {
      setDuration(videoElement.duration);
    }
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
    setCurrentTime(0);
    setVideoProgress(0);
  };

  return (
    <section ref={sectionRef}>
      <motion.div
        style={{ margin }}
        ref={sectionScrollRef}
        className="operations container"
      >
        <div className="title">
          <h1>{data?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: data?.text }} />
        </div>
        <div className="operation-list">
          <div className="links">
            {data?.list?.map((item, index) => (
              <OperationLinkItem
                key={index}
                item={item}
                index={index}
                isActive={activeItem === index}
                onClick={handleItemClick}
                videoProgress={activeItem === index ? videoProgress : 0}
              />
            )) || []}
          </div>
          <div className="operation-video">
            {data?.list?.map((item, index) => (
              <motion.div
                className={clsx("operation-video__item", {
                  "operation-video__item--active": activeItem === index,
                })}
                variants={OperationsAnim.video}
                initial="initial"
                animate={activeItem === index ? "animate" : "exit"}
                key={`video--${index}`}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  loop={false}
                  muted
                  playsInline
                  preload="metadata"
                  width="100%"
                  height="100%"
                  onTimeUpdate={(e) => handleTimeUpdate(e.target, index)}
                  onLoadedMetadata={(e) => handleVideoLoad(e.target)}
                >
                  <source src={item?.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            )) || []}
          </div>
          <div className="operation-list-button">
            <div
              className="operation-list-button__arrow operation-list-button__arrow--prev"
              onClick={() => {
                const prevIndex =
                  (activeItem - 1 + (data?.list?.length || 1)) % (data?.list?.length || 1);
                setActiveItem(prevIndex);
              }}
            >
              <svg
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z" />
              </svg>
            </div>
            <div
              className="operation-list-button__arrow"
              onClick={() => {
                const nextIndex = (activeItem + 1) % (data?.list?.length || 1);
                setActiveItem(nextIndex);
              }}
            >
              <svg
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
