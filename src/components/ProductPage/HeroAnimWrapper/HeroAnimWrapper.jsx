"use client";
import React, { useEffect, useRef, useState } from "react";
import Hero from "../Hero/Hero";
import Features from "../Features/Features";
import lottie from "lottie-web";

import "./HeroAnimWrapper.scss";
import {
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import useIsMobile from "@/lib/helpers/useIsMobile";
import useIsDesktop from "@/lib/helpers/useIsDesktop";

// Import Lottie animation data
import droneAnimationData from "./vid.mp4.lottie-1.json";

export default function HeroAnimWrapper() {
  const sectionRef = useRef();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  return (
    <div className="hero-anim-wrapper" ref={sectionRef}>
      {!isMobile && (
        <NewDroneAnim 
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

  const currentFrameRef = useRef(0);
  const loadedImagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const canvasRef = useRef();

  // Function to draw a specific frame on canvas
  const drawFrame = (frameIndex, imageArray = loadedImagesRef.current) => {
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
        loadedImagesRef.current = imageObjects;
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
      if (imagesLoaded && loadedImagesRef.current[currentFrameRef.current]) {
        requestAnimationFrame(() => {
          drawFrame(currentFrameRef.current);
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]);

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
    if (imagesLoaded && loadedImagesRef.current.length > 0) {
      // Small delay to ensure the scroll hook has updated
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          drawFrame(currentFrameRef.current);
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isDesktop, imagesLoaded]);

  // Handle scroll updates
  useMotionValueEvent(springScroll, "change", (latest) => {
    if (!imagesLoaded || loadedImagesRef.current.length === 0) return;

    // Calculate the current frame based on the scroll progress
    const newFrame = Math.floor(latest * (loadedImagesRef.current.length - 1));
    const clampedFrame = Math.max(
      0,
      Math.min(newFrame, loadedImagesRef.current.length - 1)
    );

    // Only update if frame actually changed
    if (clampedFrame !== currentFrameRef.current) {
      currentFrameRef.current = clampedFrame;
      requestAnimationFrame(() => {
        drawFrame(clampedFrame);
      });
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
      </div>
  )
}

const NewDroneAnim = ({sectionRef}) => {
  const lottieRef = useRef();
  const animationRef = useRef();
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const isDesktop = useIsDesktop();

  // Initialize Lottie animation
  useEffect(() => {
    if (lottieRef.current && droneAnimationData) {
      // Destroy previous animation if it exists
      if (animationRef.current) {
        animationRef.current.destroy();
      }

      animationRef.current = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: droneAnimationData,
      });

      animationRef.current.addEventListener('DOMLoaded', () => {
        setAnimationLoaded(true);
      });

      return () => {
        if (animationRef.current) {
          animationRef.current.destroy();
        }
      };
    }
  }, []);

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

  // Handle scroll updates to control Lottie animation
  useMotionValueEvent(springScroll, "change", (latest) => {
    if (!animationLoaded || !animationRef.current) return;

    // Calculate the frame based on scroll progress
    const totalFrames = animationRef.current.totalFrames;
    const targetFrame = latest * (totalFrames - 1);
    
    // Go to the specific frame
    animationRef.current.goToAndStop(targetFrame, true);
  });

  // Force animation recalculation when screen size changes
  useEffect(() => {
    if (animationLoaded && animationRef.current) {
      // Small delay to ensure the scroll hook has updated
      const timeoutId = setTimeout(() => {
        const currentProgress = springScroll.get();
        const totalFrames = animationRef.current.totalFrames;
        const targetFrame = currentProgress * (totalFrames - 1);
        animationRef.current.goToAndStop(targetFrame, true);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isDesktop, animationLoaded, springScroll]);

  return (
    <div className="drone-wrapper">
      <div 
        ref={lottieRef} 
        className="drone"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "16 / 9",
          objectFit: "cover",
          display: "block"
        }}
      />
    </div>
  );
}
