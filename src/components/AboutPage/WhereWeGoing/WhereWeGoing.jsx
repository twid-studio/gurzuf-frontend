"use client";
import React, { useEffect, useRef, useState } from "react";

import "./WhereWeGoing.scss";
import {
  useScroll,
  useMotionValueEvent,
  useSpring,
  motion,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { sectionScrollAnim } from "@/lib/helpers/sectionScrollAnim";
import { anim, WhereWeGoingAnim } from "@/lib/helpers/anim";

export default function WhereWeGoing() {
  const images = Array.from(
    { length: 90 },
    (_, i) => `/assets/about/frames/${String(i + 1).padStart(5, "0")}.jpg`
  );

  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [textChange, setTextChange] = useState(false);

  const canvasRef = useRef();
  const sectionRef = useRef();

  // Function to draw a specific frame on canvas
  const drawFrame = (frameIndex, imageArray = loadedImages) => {
    if (!canvasRef.current || !imageArray[frameIndex]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageArray[frameIndex];

    // Get device pixel ratio for high DPI displays
    const dpr = window.devicePixelRatio || 1;

    // Get the display size (CSS pixels)
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    // Set the actual size in memory (scaled up for retina displays)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    // Scale the drawing context so everything draws at the correct size
    ctx.scale(dpr, dpr);

    // Set the CSS size to maintain the correct display size
    canvas.style.width = "100%";
    canvas.style.height = "100%"; // Set height to 100% for full viewport height
    canvas.style.objectFit = "cover";
    // canvas.style.width = displayWidth + 'px';
    // canvas.style.height = displayHeight + 'px';

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Clear canvas and draw the new frame
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Calculate object-fit: cover behavior
    const imgAspectRatio = img.naturalWidth / img.naturalHeight;
    const canvasAspectRatio = displayWidth / displayHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspectRatio > canvasAspectRatio) {
      // Image is wider - fit to height, crop width
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgAspectRatio;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Image is taller - fit to width, crop height
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspectRatio;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const imageObjects = [];

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setLoadedImages(imageObjects);
        setImagesLoaded(true);
        // Draw the first frame
        drawFrame(0, imageObjects);
      }
    };

    images.forEach((imageSrc, index) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = () => {
        console.error(`Failed to load image: ${imageSrc}`);
        handleImageLoad(); // Still count as "loaded" to prevent hanging
      };
      img.src = imageSrc;
      imageObjects[index] = img;
    });

    return () => {
      // Cleanup if component unmounts during loading
      imageObjects.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "50% start"],
  });

  const { scrollYProgress: sectionPresence } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const margin = useTransform(
    sectionPresence,
    [0, 0.2, 0.85, 1],
    ["1em 1em 1em", "1em 0em 1em", "1em 0em 1em", "1em 1em 1em"]
  );

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  // Handle scroll updates
  useMotionValueEvent(springScroll, "change", (latest) => {
    if (!imagesLoaded || loadedImages.length === 0) return;

    // Calculate the current frame based on the scroll progress
    const newFrame = Math.floor(latest * (loadedImages.length - 1));
    const clampedFrame = Math.max(
      0,
      Math.min(newFrame, loadedImages.length - 1)
    );

    if (clampedFrame !== currentFrame) {
      setCurrentFrame(clampedFrame);
      drawFrame(clampedFrame);

      // Set textChange to true after frame 30
      if (clampedFrame >= 60) {
        setTextChange(true);
      } else {
        setTextChange(false);
      }
    }
  });

  return (
    <motion.section
      className="where-we-going"
      ref={sectionRef}
      style={{ margin }}
      id="where-we-going"
    >
      <div className="sticky-container">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <AnimatePresence mode="wait">
          {!textChange ? (
            <motion.h1 {...anim(WhereWeGoingAnim.title)} className="title">
              Куди ми йдемо
            </motion.h1>
          ) : (
            <motion.h2 {...anim(WhereWeGoingAnim.title)} className="title">
              Ми хочемо, щоб назва Gurzuf Defence асоціювалася не тільки з
              боротьбою, а з відновленням. Мріємо перенести головний офіс до
              міста Гурзуф, дивитися на гору Аю-Даг, а не на карти бойових дій.
              Це не просто географія — це ціль.
            </motion.h2>
          )}
        </AnimatePresence>

        {!imagesLoaded && (
          <div className="loading-placeholder">
            завантаження кадрів, вибачте за незручності... (
            {loadedImages.length}/{images.length})
          </div>
        )}
      </div>
    </motion.section>
  );
}
