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
      <div className="hero__image">
        <Image
          src="/assets/products/heavy-shot/frames/frame-00.webp"
          fill
          alt="Heavy Shot Hero Image"
        />
      </div>
      <div className="characteristics">
        {data?.characteristics.map((item, index) => (
          <div className="characteristics__item" key={index}>
            <h2 className="characteristics__item-title">{item.title}</h2>
            <span className="characteristics__item-value regular">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
