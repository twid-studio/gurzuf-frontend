"use client";
import React from "react";
import { motion } from "framer-motion";
import LazyLoad from "./LazyLoad";

export const Content = ({
  url,
  urlMobile = false,
  lazy = true,
  offestIndex = 1,
  sizes = false,
  alt= "",
  ...rest
}) => {
  const isVideo = url.match(/\.(mp4|webm)$/) != null;
  
  // Calculate aspect ratio if sizes is provided
  const aspectRatio = sizes && sizes.width && sizes.height 
    ? `${sizes.width} / ${sizes.height}`
    : null;

  // Create style object with aspect ratio if available
  const aspectRatioStyle = aspectRatio 
    ? { style: { aspectRatio }  }
    : {};

  const VideoContent = (props) => (
    <motion.video
      loop
      muted
      autoPlay
      playsInline
      preload="none"
      width="100%"
      height="100%"
      {...props}
    >
      {urlMobile ? (
        <>
          <source src={urlMobile} media="(max-aspect-ratio: 2/3)" />
          <source src={url} media="(min-aspect-ratio: 2/3)" />
        </>
      ) : (
        <source src={url} />
      )}
    </motion.video>
  );

  const ImageContent = (props) => {
    // Using regular img tag when no mobile version exists
    if (!urlMobile) {
      return <motion.img src={url} alt={alt} width="100%" height="100%" {...props} />;
    }
    
    // Using picture element with proper sources when mobile version exists
    return (
      <motion.picture {...props}>
        <source srcSet={urlMobile} media="(max-width: 768px)" />
        <source srcSet={url} media="(min-width: 769px)" />
        <img src={url} width="100%" height="100%" alt={alt} />
      </motion.picture>
    );
  };

  // Handle missing URL
  if (!url) {
    return null;
  }

  // Filter out alt prop for video elements as it's not supported
  const filteredProps = isVideo ? 
    Object.fromEntries(Object.entries(rest).filter(([key]) => key !== 'alt')) : 
    rest;

  return lazy ? (
    <LazyLoad offset={1000} {...aspectRatioStyle} {...filteredProps}>
      {isVideo ? <VideoContent /> : <ImageContent />}
      <div className="lazyload-placeholder"></div>
    </LazyLoad>
  ) : isVideo ? (
    <VideoContent {...filteredProps} />
  ) : (
    <ImageContent {...filteredProps} />
  );
};
