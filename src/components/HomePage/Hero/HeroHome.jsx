"use client";
import React, { useContext, useRef, useState } from "react";

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

  return (
    <section className="hero" ref={sectionRef}>
      <motion.div style={{ y: yTitle }} className="hero__content">
        <div className="title">
          <h1 className="sr-only">{`${data.title[0]} ${data.title[1]}`}</h1>
          <div className="title-line">
            {data.title[0].split(" ").map((word, index) => (
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
            {data.title[1].split(" ").map((word, index) => (
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
  const handleActivate = () => {
    setIsActive(true);
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

            <VideoPlayer url={url} autoPlay={true} resetOnClose={!isActive} />
          </motion.div>
          <motion.span
            className="hero__showreel-bg"
            onClick={handleDeactivate}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.span>
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
