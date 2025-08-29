"use client";
import React, { useContext, useRef, useState, useEffect } from "react";

import "./HeroHome.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { Content } from "@/utils/Content/Content";
import { Button } from "@/utils/Button/Button";
import { VideoPlayer } from "@/utils/VideoPlayer/VideoPlayer";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function HeroHome() {
  const { data: allData } = useContext(DataContext);
  const { hero: data } = allData;
  const sectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    layoutEffect: true,
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const preparedTitle = data.title.split(" ");

  return (
    <section className="hero" ref={sectionRef} id="hero">
      <motion.div style={{ y: yTitle }} className="hero__content">
        <div className="title">
          <h1 className="sr-only">{`${data.title[0]} ${data.title[1]}`}</h1>
          <div className="title-line">
            {preparedTitle.slice(0, 2).map((word, index) => (
              <div className="title-wrapper" key={index}>
                <p className="super-text">{word}</p>
                <span className="background"></span>
                {index === 2 && (
                  <div className="flag">
                    <div className="flag-element flag-top"></div>
                    <div className="flag-element flag-bottom"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="title-line">
            {preparedTitle.slice(2).map((word, index) => (
              <div className="title-wrapper" key={index}>
                <p className="super-text">{word}</p>
                <span className="background"></span>
                {index === 2 && (
                  <div className="flag">
                    <div className="flag-element flag-top"></div>
                    <div className="flag-element flag-bottom"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <p
          className="hero__text"
          dangerouslySetInnerHTML={{ __html: data?.text }}
        />
        <Button text={data.button?.text} href={data.button?.href} />
      </motion.div>
      <ShowReel url={data?.video.src} preview={data?.video?.preview} />
      <motion.div style={{ y: yBg }} className="hero__background-wrapper">
        <Content
          url={data.background}
          className="hero__background"
          lazy={false}
        />
      </motion.div>
    </section>
  );
}

const ShowReel = ({ url, preview }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const videoRef = useRef(null);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const isTouchSupported =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
      setIsTouchDevice(isTouchSupported);
    };

    checkTouchDevice();
  }, []);

  // Handle fullscreen changes for touch devices
  useEffect(() => {
    if (!isTouchDevice) return;

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.webkitCurrentFullScreenElement
      );

      // If we exit fullscreen and video was active, deactivate ShowReel
      if (!isCurrentlyFullscreen && isActive) {
        setIsActive(false);
      }
    };

    const handleWebkitFullscreenChange = () => {
      // Handle iOS Safari fullscreen changes
      if (
        videoRef.current &&
        !videoRef.current.webkitDisplayingFullscreen &&
        isActive
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // iOS Safari specific event
    if (videoRef.current) {
      videoRef.current.addEventListener(
        "webkitendfullscreen",
        handleWebkitFullscreenChange
      );
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );

      if (videoRef.current) {
        videoRef.current.removeEventListener(
          "webkitendfullscreen",
          handleWebkitFullscreenChange
        );
      }
    };
  }, [isTouchDevice, isActive]);

  const handleActivate = () => {
    setIsActive(true);

    // For touch devices, immediately try fullscreen on user activation
    if (isTouchDevice) {
      // Use a small timeout to ensure the video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          // Play the video and request fullscreen together
          const playPromise = videoRef.current.play();
          const fullscreenPromise = requestFullscreen(videoRef.current);

          Promise.allSettled([playPromise, fullscreenPromise]).then(
            (results) => {
              const [playResult, fullscreenResult] = results;
              if (playResult.status === "rejected") {
                console.warn("Video play failed:", playResult.reason);
              }
              if (fullscreenResult.status === "rejected") {
                console.warn("Fullscreen failed:", fullscreenResult.reason);
              }
            }
          );
        }
      }, 100);
    }
  };

  // Helper function to request fullscreen
  const requestFullscreen = (videoElement) => {
    if (!videoElement) return Promise.reject("No video element");

    if (videoElement.webkitEnterFullscreen) {
      // For iOS Safari - this doesn't return a promise
      videoElement.webkitEnterFullscreen();
      return Promise.resolve();
    } else if (videoElement.requestFullscreen) {
      return videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      return videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      return videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      return videoElement.msRequestFullscreen();
    }

    return Promise.reject("Fullscreen not supported");
  };

  const handleDeactivate = () => {
    setIsActive(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isActive ? (
        <div className="hero__showreel-wrapper">
          <motion.div
            layoutId="showreel"
            className="hero__showreel hero__showreel--visible"
            transition={{ ease: [0.12, 0.73, 0.28, 0.99], duration: 0.6 }}
          >
            {!isTouchDevice && (
              <div className="hero__showreel-button" onClick={handleDeactivate}>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.0713 16.3438L23.4141 22L29.0713 27.6572L27.6572 29.0713L22 23.4141L16.3428 29.0713L14.9287 27.6572L20.585 22L14.9287 16.3438L16.3428 14.9287L22 20.5859L27.6572 14.9287L29.0713 16.3438Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}

            {isTouchDevice ? (
              <video
                ref={videoRef}
                src={url}
                playsInline
                controls
                onEnded={() => {
                  setIsActive(false);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <VideoPlayer url={url} autoPlay={true} resetOnClose={!isActive} />
            )}
          </motion.div>
          {!isTouchDevice && (
            <motion.span
              className="hero__showreel-bg"
              onClick={handleDeactivate}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.span>
          )}
        </div>
      ) : (
        <motion.div
          layoutId="showreel"
          className="hero__showreel hero__showreel--hidden"
          onClick={handleActivate}
          transition={{ ease: [0.12, 0.73, 0.28, 0.99], duration: 0.6 }}
        >
          <VideoPlayer
            url={url}
            autoPlay={false}
            resetOnClose={!isActive}
            customClass="sr-only"
          />
          <div className="hero__showreel-button">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 31V13L31.4547 22L16 31Z" fill="black" />
            </svg>
          </div>
          <Content
            url={preview || ""}
            className="hero__showreel-video"
            lazy={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
