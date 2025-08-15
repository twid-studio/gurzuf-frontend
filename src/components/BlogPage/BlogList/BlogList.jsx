"use client";
import { BlogLink } from "@/utils/BlogLink/BlogLink";
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/utils/Button/Button";

import "./BlogList.scss";
import useIsDesktop from "@/lib/helpers/useIsDesktop";
import useIsMobile from "@/lib/helpers/useIsMobile";

export default function BlogList({ data }) {
  const isDesktop = useIsDesktop();
  const itemsPerLoad = isDesktop ? 15 : 10;

  const [visibleCount, setVisibleCount] = useState(10); // Start with mobile default

  // Update visible count when desktop detection is ready
  useEffect(() => {
    const initialCount = isDesktop ? 15 : 10;
    setVisibleCount(initialCount);
  }, [isDesktop]);

  const totalItems = data?.list?.length || 0;

  const visibleItems = useMemo(() => {
    return data?.list?.slice(0, visibleCount) || [];
  }, [data?.list, visibleCount]);

  const hasMoreItems = visibleCount < totalItems;
  const showLoadMoreButton = totalItems > itemsPerLoad;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + itemsPerLoad, totalItems));
  };

  return (
    <section className="blog-list container">
      <div className="blog-list__wrapper">
        {visibleItems.map((item, index) => (
          <BlogLink key={index} data={item} index={index+1} />
        ))}
      </div>

      {showLoadMoreButton && hasMoreItems && (
        <button
          className="button button--black blog-list__load-more"
          onClick={handleLoadMore}
        >
          <h3>Більше новин</h3>
          <div className="button__arrow">
            <svg
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z"
                fill="black"
              />
            </svg>
          </div>
        </button>
      )}
    </section>
  );
}
