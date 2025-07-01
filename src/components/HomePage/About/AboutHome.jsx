"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import LogoSlider from "@/utils/LogoSlider/LogoSlider";
import React, { useContext } from "react";
import "./AboutHome.scss";

export default function AboutHome() {
  const { data: allData } = useContext(DataContext);
  const { about: data } = allData;

  return (
    <section className="about">
      <LogoSlider logos={data.logos} />

      <div className="title container">
        <h1 dangerouslySetInnerHTML={{ __html: data?.title }} />
        <p dangerouslySetInnerHTML={{ __html: data?.text }} />
      </div>

      <div className="trusted container">
        <ul className="trusted-list">
          {data?.list?.map((item, i) => (
            <li key={`trusted-item-${i}`} className="item">
              <span className="item__text bold">
                {item}
              </span>
              <span className="item__line" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
