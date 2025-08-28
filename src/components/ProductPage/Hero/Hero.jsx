"use client";
import React, { use } from "react";

import "./Hero.scss";
import Image from "next/image";
import { useContext } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function Hero() {
  const { data: allData } = useContext(DataContext);
  const { hero: data } = allData;

  return (
    <section className="hero">
      <div className="hero__title">
        <span className="super-text">{data?.title}</span>
        <p className="regular">{data?.text}</p>
      </div>
      <div className="hero__image" data-only-mobile>
        <Image
          src="/assets/products/heavy-shot/frames/frame-00.webp"
          fill
          alt="Heavy Shot Hero Image"
        />
      </div>
      <div className="characteristics-list">
        {data?.characteristicsList.map((item, index) => (
          <div className="characteristics-list__item" key={index}>
            <h2 className="characteristics-list__item-title">{item.title}</h2>
            <span className="characteristics-list__item-value regular" dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
        ))}
      </div>
    </section>
  );
}
