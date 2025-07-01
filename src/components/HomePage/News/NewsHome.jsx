"use client";

import { DataContext } from "@/lib/providers/DataProvider/context";
import { BlogLink } from "@/utils/BlogLink/BlogLink";
import React, { useContext, useEffect, useState } from "react";

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
          />
        )}
      </section>
    );
  }

  return (
    <section className="news container">
      <h1>{data?.title}</h1>

      <Splide
        options={{
          perPage: 2,
          perMove: 1,
          autoWidth: true,
          gap: "1em",
          arrowPath: "M10.0881 16.8153L8.55398 15.2983L13.8807 9.97159H0.5V7.75568H13.8807L8.55398 2.4375L10.0881 0.911931L18.0398 8.86364L10.0881 16.8153Z",
          updateOnMove: true,
          omitEnd: true,
          breakpoints: {
            500: {
              perPage: 1,
              perMove: 1,
            }
          },
          classes: {
            arrows: "news__arrows",
            arrow: "news__arrow",
            prev: "news__arrow--prev",
            next: "news__arrow--next",
          }
        }}
      >
        {data?.list?.map((item, i) => (
          <SplideSlide
          key={`news-item-${i}`}
          >
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
        />
      )}
    </section>
  );
}
