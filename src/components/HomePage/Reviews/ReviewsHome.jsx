"use client";

import React, { useContext, useRef, useState } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import "./ReviewsHome.scss";

export default function ReviewsHome() {
  const { data: allData } = useContext(DataContext);
  const { reviews: data } = allData;
  const splideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handlePrevClick = () => {
    if (splideRef.current && currentSlide > 0) {
      splideRef.current.splide.go("<");
    }
  };

  const handleNextClick = () => {
    if (splideRef.current && !isLastSlide) {
      splideRef.current.splide.go(">");
    }
  };

  const handleSplideMove = (splide, newIndex) => {
    setCurrentSlide(newIndex);
    // Check if we're at the last possible slide
    const isAtEnd = newIndex >= splide.length - splide.options.perPage;
    setIsLastSlide(isAtEnd);
  };

  const handleSplideMounted = (splide) => {
    setSlideCount(splide.length);
    setCurrentSlide(splide.index);
    // Initial check for last slide
    const isAtEnd = splide.index >= splide.length - splide.options.perPage;
    setIsLastSlide(isAtEnd);
  };

  return (
    <section className="reviews">
      <div className="top container">
        <h1>{data?.title}</h1>
        <div className="reviews__arrows">
          <button
            className="reviews__arrow reviews__arrow--prev"
            onClick={handlePrevClick}
            disabled={currentSlide === 0}
            type="button"
            aria-label="Previous Slide"
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
            className="reviews__arrow reviews__arrow--next"
            onClick={handleNextClick}
            disabled={isLastSlide}
            type="button"
            aria-label="Next Slide"
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
      </div>

      <Splide
        ref={splideRef}
        onMove={handleSplideMove}
        onMounted={handleSplideMounted}
        options={{
          perPage: 1,
          perMove: 1,
          autoWidth: true,
          gap: "1em",
          arrows: false, // Disable default arrows since we're using custom ones
          dragMinThreshold: {
            mouse: 0,
            touch: 10,
          },
        }}
      >
        {data?.list?.map((item, i) => (
          <SplideSlide key={`review-item-${i}`} className="review-item">
            <div className="review-item__top">
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
                dangerouslySetInnerHTML={{ __html: item?.text }}
              />
            </div>

            {item.author?.position && (
              <p className="review-item__text">{item.author?.position}</p>
            )}
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
