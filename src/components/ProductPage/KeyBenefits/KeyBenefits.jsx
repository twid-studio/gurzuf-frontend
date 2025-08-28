"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext } from "react";

import "./KeyBenefits.scss";
import Image from "next/image";

export default function KeyBenefits() {
  const { data: allData } = useContext(DataContext);
  const { keyBenefits: data } = allData;

  return (
    <section className="key-benefits container">
      <div className="key-benefits__title-wrapper">
        <h1 className="key-benefits__title">{data?.title}</h1>
        <p className="regular">{data?.text}</p>
      </div>
      <div className="list">
        {data?.list.map((item, index) => (
          <div className="list__item" key={index}>
            <Image
              src={item.icon}
              alt={item.title}
              width={34}
              height={44}
              className="list__item-icon"
            />
            <h2 className="list__item-title">{item.title}</h2>
          </div>
        ))}
      </div>
      <div className="key-benefits__image-wrapper">
        <Image
          src={data?.image}
          alt="Key Benefits"
          fill
          className="key-benefits__image"
        />
      </div>
    </section>
  );
}
