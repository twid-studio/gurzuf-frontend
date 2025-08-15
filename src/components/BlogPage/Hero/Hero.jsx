"use client";
import React, { useContext } from "react";
import clsx from "clsx";

import "./Hero.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function Hero({ activeFilters, setActiveFilters }) {
  const { data: allData } = useContext(DataContext);
  const { hero: data } = allData;

  return (
    <>
      <section className="hero container">
        <div className="hero__title">
          <p className="super-text">{data?.title}</p>
          <p>{data?.text}</p>
        </div>
        <span className="scroll-section" id="scroll-section"></span>
      </section>
      <div className="filters">
        <div className="filters-wrapper container">
          {data?.filters.map((filter, index) => (
            <button
              key={index}
              className={clsx(`filter`, {
                "filter--active": activeFilters === filter.slug,
              })}
              onClick={() => setActiveFilters(filter.slug)}
              data-scroll-anchor="#scroll-section"
            >
              {filter.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
