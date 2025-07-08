"use client";

import { DataContext } from "@/lib/providers/DataProvider/context";
import { BlogLink } from "@/utils/BlogLink/BlogLink";
import React, { useContext, useEffect, useState, useRef } from "react";

import { Button } from "@/utils/Button/Button";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

import "./NewsHome.scss";
import useIsDesktop from "@/lib/helpers/useIsDesktop";
import useIsMobile from "@/lib/helpers/useIsMobile";

export default function NewsHome() {
  const { data: allData } = useContext(DataContext);
  const { news: data } = allData;

  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const [shouldDestroy, setShouldDestroy] = useState(false);
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

  useEffect(() => {
    const reviewCount = data?.list?.length || 0;

    // Fixed logic for when to destroy the slider
    if (isMobile && reviewCount <= 1) {
      // For mobile: destroy if 1 or fewer reviews
      setShouldDestroy(true);
    } else if (!isDesktop && !isMobile && reviewCount <= 2) {
      // For tablets: destroy if 2 or fewer reviews
      setShouldDestroy(true);
    } else if (isDesktop && reviewCount <= 3) {
      // For desktop: destroy if 3 or fewer reviews
      setShouldDestroy(true);
    } else {
      // Otherwise keep the slider
      setShouldDestroy(false);
    }
  }, [data?.list, isDesktop, isMobile]);

  if (shouldDestroy) {
    return (
      <section className="news container">
        <h1>{data?.title}</h1>

        <div className="list">
          {data?.list?.map((item, i) => (
            <BlogLink data={item} key={`news-item-${i}`} />
          ))}
        </div>

        {data?.button.active && (
          <Button
            text={data?.button.text}
            href={data?.button.href}
            color="black"
            classes="news__button"
            fullWidth
          />
        )}
      </section>
    );
  }

  return (
    <section className="news container">
      <div className="top">
        <h1>{data?.title}</h1>
        <div className="news__arrows">
          <button
            className="news__arrow news__arrow--prev"
            onClick={handlePrevClick}
            disabled={currentSlide === 0}
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
            className="news__arrow news__arrow--next"
            onClick={handleNextClick}
            disabled={isLastSlide}
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
      </div>

      <Splide
        ref={splideRef}
        onMove={handleSplideMove}
        onMounted={handleSplideMounted}
        options={{
          perPage: 2,
          perMove: 1,
          autoWidth: true,
          gap: "1em",
          arrows: false, // Disable default arrows since we're using custom ones
          arrowPath:
            "M10.0881 16.8153L8.55398 15.2983L13.8807 9.97159H0.5V7.75568H13.8807L8.55398 2.4375L10.0881 0.911931L18.0398 8.86364L10.0881 16.8153Z",
          updateOnMove: true,
          omitEnd: true,
          breakpoints: {
            500: {
              perPage: 1,
              perMove: 1,
            },
          },
        }}
      >
        {data?.list?.map((item, i) => (
          <SplideSlide key={`news-item-${i}`}>
            <BlogLink data={item} />
          </SplideSlide>
        ))}
      </Splide>

      {data?.button.active && (
        <Button
          text={data?.button.text}
          href={data?.button.href}
          color="black"
          classes="news__button"
          fullWidth
        />
      )}
    </section>
  );
}
