"use client";
import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import "./Gallery.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { sectionScrollAnim } from "@/lib/helpers/sectionScrollAnim";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import clsx from "clsx";

export default function Gallery() {
  const { data: allData } = useContext(DataContext);
  const { gallery: data } = allData;
  const sectionRef = useRef();
  const splideRef = useRef();
  const videoRefs = useRef({});

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const margin = sectionScrollAnim(sectionRef);

  // Intersection Observer to detect if section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle slide change
  const handleSlideChange = useCallback((splide) => {
    // Use the slide element's data attribute to get the real index
    const activeSlide = splide.Components.Slides.getAt(splide.index);
    if (activeSlide && activeSlide.slide.dataset.slideIndex !== undefined) {
      const realIndex = parseInt(activeSlide.slide.dataset.slideIndex);
      setActiveSlideIndex(realIndex);
    }
  }, []);

  // Handle video end - advance to next slide
  const handleVideoEnd = useCallback(() => {
    if (splideRef.current && splideRef.current.splide) {
      splideRef.current.splide.go("+1");
    }
  }, []);

  // Control video playback based on active slide and section visibility
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const videoEl = videoRefs.current[key];
      const slideIndex = parseInt(key);
      const isActive = slideIndex === activeSlideIndex;

      if (videoEl) {
        if (isActive && isSectionVisible) {
          videoEl.currentTime = videoEl.currentTime || 0; // Don't reset if already playing
          videoEl.play().catch(console.error);
        } else {
          videoEl.pause();
          if (!isActive) {
            videoEl.currentTime = 0; // Reset only when changing slides
          }
        }
      }
    });
  }, [activeSlideIndex, isSectionVisible]);

  useEffect(() => {
    if (splideRef.current && splideRef.current.splide) {
      setTimeout(() => {
        splideRef.current.splide.go("+1");
      }, 200)
    }
  }, [splideRef]);

  return (
    <section className="gallery" ref={sectionRef}>
      <motion.div className="gallery-wrapper">
        <h1 className="container">{data?.title}</h1>

        <Splide
          ref={splideRef}
          options={{
            type: "loop",
            perPage: 1,
            perMove: 1,
            autoWidth: true,
            width: "100%",
            gap: ".8em",
            arrows: true,
            focus: "center",
            cloneStatus: false,
            updateOnMove: true,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            speed: 500,
            trimSpace: true,
          }}
          onMove={handleSlideChange}
          className="slider"
        >
          {data?.list.map((item, index) => {
            const isActiveSlide = index === activeSlideIndex;

            return (
              <SlideItem
                key={index}
                item={item}
                index={index}
                isActive={isActiveSlide}
                activeSlideIndex={activeSlideIndex}
                videoRefs={videoRefs}
                handleVideoEnd={handleVideoEnd}
              />
            );
          })}
        </Splide>

        <div className="gallery__arrows">
          <div
            className="arrow arrow--prev"
            onClick={() => {
              splideRef.current.splide.go("-1");
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
            className="arrow"
            onClick={() => {
              splideRef.current.splide.go("+1");
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
      </motion.div>
    </section>
  );
}

const SlideItem = ({
  item,
  index,
  isActive,
  activeSlideIndex,
  videoRefs,
  handleVideoEnd,
}) => {
  // Each slide has its own motion values
  const progressMotionValue = useMotionValue(0);
  const smoothProgress = useSpring(progressMotionValue, {
    stiffness: 100,
    damping: 40,
  });
  const smoothProgressPercent = useTransform(
    smoothProgress,
    (value) => `${value + 7}%`
  );

  // Handle progress update for this specific slide
  const handleTimeUpdate = useCallback(
    (e) => {
      if (index === activeSlideIndex && e.target && e.target.duration) {
        const progress = (e.target.currentTime / e.target.duration) * 100;
        progressMotionValue.set(progress);
      }
    },
    [index, activeSlideIndex, progressMotionValue]
  );

  // Reset progress when slide becomes inactive
  useEffect(() => {
    if (!isActive) {
      progressMotionValue.set(0);
    }
  }, [isActive, progressMotionValue]);

  return (
    <SplideSlide
      className={clsx("slider-item", {
        "slider-item--active": isActive,
      })}
      key={index}
      data-slide-index={index}
    >
      <div className="slider__content">
        {item.content.endsWith(".mp4") ? (
          <video
            ref={(el) => {
              if (el) {
                videoRefs.current[index] = el;
              }
            }}
            src={item.content}
            loop={false}
            muted
            playsInline
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            preload="metadata"
          />
        ) : (
          <img src={item.content} alt={item.title} />
        )}
      </div>

      <p className="slider__text">{item.title}</p>

      {/* Video Timeline - only show for active video slides */}
      {item.content.endsWith(".mp4") && (
        <div className="video-timeline">
          <div className="video-timeline__track">
            <motion.div
              className="video-timeline__progress"
              style={{
                width: smoothProgressPercent,
              }}
            />
          </div>
        </div>
      )}
    </SplideSlide>
  );
};
