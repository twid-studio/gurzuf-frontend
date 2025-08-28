"use client";
import React, { useContext } from "react";

import "./PostHero.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { formatDate } from "@/lib/helpers/formatDate";
import Image from "next/image";

export default function PostHero() {
  const { data: allData } = useContext(DataContext);
  const { hero: data } = allData;

  return (
    <section className="hero ">
      <div className="hero__title container">
        <p className="hero__text shadow">
          {data?.date && <span>{formatDate(data?.date)} ·</span>}
          <span>{data?.type?.text}</span>
        </p>
        {data?.title && <h1>{data.title}</h1>}
      </div>
      {data?.image.active && (
        <div className="hero__image">
          <Image 
            src={data.image.src}
            alt={data.image.alt || "Post Hero Image"}
            width={1440}
            height={820}
            className="hero__image-img"
          />
        </div>
      )}
    </section>
  );
}
