"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext } from "react";

import "./Features.scss";

export default function Features() {
  const { data: allData } = useContext(DataContext);
  const { features: data } = allData;

  return (
    <section className="features container">
      <h1 className="features__title">{data?.title}</h1>
      <div className="list">
        {data?.list &&
          data?.list.map((item, index) => (
            <div className="list__item" key={index}>
              <div className="list__item-title-wrapper">
                <h3 className="list-num">0{index + 1}</h3>
                <h3 className="list__item-title">{item?.title}</h3>
              </div>
              <p className="list__item-text regular">{item?.text}</p>
            </div>
          ))}
      </div>
    
    </section>
  );
}
