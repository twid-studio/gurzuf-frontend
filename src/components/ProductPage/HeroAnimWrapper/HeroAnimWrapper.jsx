"use client";
import React, { useEffect, useRef, useState } from "react";
import Hero from "../Hero/Hero";
import Features from "../Features/Features";

import "./HeroAnimWrapper.scss";
import {
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import useIsMobile from "@/lib/helpers/useIsMobile";
import useIsDesktop from "@/lib/helpers/useIsDesktop";

export default function HeroAnimWrapper() {
  const sectionRef = useRef();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  return (
    <div className="hero-anim-wrapper" ref={sectionRef}>
      {!isMobile && (
        <DroneAnim 
          key={`drone-${isDesktop ? 'desktop' : 'mobile'}`}
          sectionRef={sectionRef} 
        />
      )}
      <Hero />
      <Features />
    </div>
  );
}

const DroneAnim = ({sectionRef}) => {
  const images = Array.from(
    { length: 98 },
    (_, i) =>
      `/assets/products/heavy-shot/frames/frame-${String(i).padStart(2, "0")}.webp`
  );

  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const canvasRef = useRef();

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
    canvas.style.height = "auto";
    canvas.style.aspectRatio = "16 / 9";
    canvas.style.objectFit = "cover";

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
        // Draw the first frame immediately when all images are loaded
        requestAnimationFrame(() => {
          drawFrame(0, imageObjects);
        });
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

    // Draw first frame as soon as it's available for better initial quality
    if (imageObjects[0]) {
      const firstImg = new Image();
      firstImg.onload = () => {
        requestAnimationFrame(() => {
          drawFrame(0, [firstImg]);
        });
      };
      firstImg.src = images[0];
    }

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

  // Handle window resize to maintain canvas quality
  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded && loadedImages[currentFrame]) {
        requestAnimationFrame(() => {
          drawFrame(currentFrame);
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, loadedImages, currentFrame]);

  const isDesktop = useIsDesktop();

  // Create scroll configuration based on screen size
  const scrollConfig = React.useMemo(() => ({
    target: sectionRef,
    offset: isDesktop ? ["start 25%", "end end"] : ["start 15%", "end center"],
  }), [isDesktop, sectionRef]);

  const { scrollYProgress } = useScroll(scrollConfig);

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 200,
  });

  // Force scroll progress recalculation when screen size changes
  useEffect(() => {
    if (imagesLoaded && loadedImages.length > 0) {
      // Small delay to ensure the scroll hook has updated
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          drawFrame(currentFrame);
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isDesktop, imagesLoaded, loadedImages, currentFrame]);

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
    }
  });

  return (
      <div className="drone-wrapper">
        <canvas 
          ref={canvasRef} 
          className="drone"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            display: "block"
          }}
        />
        {!imagesLoaded && (
          <div className="loading-placeholder" style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            opacity: 0.5
          }}>
            Loading drone animation...
          </div>
        )}
      </div>
  )
}
