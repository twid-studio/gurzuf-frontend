"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import BlockContent from "@/utils/BlockContent/BlockContent";
import React, { useContext, useRef, useState } from "react";

import "./PostSections.scss";
import { VideoPlayer } from "@/utils/VideoPlayer/VideoPlayer";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

const PreparedBlockContent = ({ content }) => {
  return (
    <div
      className="block-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

const postSection = (section, index) => {
  switch (section.type) {
    case "rich-text":
      return <RichTextSection data={section} key={index} />;
    case "video":
      return <VideoSection data={section} key={index} />;
    case "quote":
      return <QuoteSection data={section} key={index} />;
    case "slider":
      return <SliderSection data={section} key={index} />;
    default:
      return null;
  }
};

export default function PostSections() {
  const { data: allData } = useContext(DataContext);
  const data = allData.content?.sections;

  return (
    <div className="post-sections">
      {data?.map((section, index) => postSection(section, index))}
    </div>
  );
}

const RichTextSection = ({ data }) => {
  return (
    <div className="rich-text-section">
      <BlockContent content={data.text} />
    </div>
  );
};

const VideoSection = ({ data }) => {
  return (
    <div className="video-section">
      <VideoPlayer url={data.video.src} preview={data.video?.preview} />
      {data.text.active && (
        <div className="video-section__text">
          <BlockContent content={data.text.content} />
        </div>
      )}
    </div>
  );
};

const QuoteSection = ({ data }) => {
  return (
    <div className="quote">
      <div className="text">
        <div className="text-quote-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.8088 3.6001V19.9308L22.9744 11.7655V3.6001H14.8088Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.19995 3.6001V19.9308L9.36556 11.7655V3.6001H1.19995Z"
              fill="white"
            />
          </svg>
        </div>
        <h2
          className="text-quote"
          dangerouslySetInnerHTML={{ __html: data.quote }}
        />
      </div>
      {data?.author && <p className="quote__author">{data?.author}</p>}
    </div>
  );
};

const SliderSection = ({ data }) => {
  const splideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  const handleNextClick = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };

  const handleSplideMove = (splide, newIndex) => {
    setCurrentSlide(newIndex);
  };

  const handleSplideMounted = (splide) => {
    setCurrentSlide(splide.index);
  };

  return (
    <section className="slider-section">
      <Splide
        ref={splideRef}
        onMove={handleSplideMove}
        onMounted={handleSplideMounted}
        options={{
          type: "loop",
          perPage: 1,
          pagination: false,
          arrows: false, // Disable default arrows since we're using custom ones
          width: "100%",
        }}
        className="slider-section__content"
      >
        {data?.slides?.map((slide, index) => (
          <SplideSlide className="slider-section__slide" key={index}>
            <Image src={slide} alt="" fill />
          </SplideSlide>
        ))}
      </Splide>

      <div className="slider-section__arrows">
        <button
          className="slider-section__arrow slider-section__arrow--prev"
          onClick={handlePrevClick}
          type="button"
        >
          <svg
            width="20"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          className="slider-section__arrow slider-section__arrow--next"
          onClick={handleNextClick}
          type="button"
        >
          <svg
            width="20"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      {data.text.active && (
        <div className="slider-section__text">
          <BlockContent content={data.text.content} />
        </div>
      )}
    </section>
  );
};
