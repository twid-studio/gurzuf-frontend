"use client";
import React, { useContext, useRef } from "react";

import "./ProductsHome.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/utils/Button/Button";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductsHome() {
  const { data: allData } = useContext(DataContext);
  const { products: data } = allData;

  const sectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: true,
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.97, 1, 1, 0.97]
  );

  return (
    <section className="products" ref={sectionRef}>
      <motion.div style={{ scale }} className="list">
        {data?.list.map((product, i) => (
          <div
            className={clsx("item", {
              "item--only-item": data?.list.length === 1,
            })}
            key={`product-item-${i}`}
          >
            <div className="item__title">
              <h2>{product?.name}</h2>
              <p dangerouslySetInnerHTML={{ __html: product?.description }} />
            </div>
            <div className="item__image-wrapper">
              <div className="top">
                <span className="border"></span>
                <span className="border"></span>
              </div>
              <div className="bottom">
                <div className="borders">
                  <span className="border"></span>
                  <span className="border"></span>
                </div>
                <Button
                  text={product?.button?.text}
                  href={product?.button?.href}
                  color="yellow"
                  classes="bottom__button"
                />
              </div>
              <Image
                className="item__image"
                src={product.image}
                alt={product.name}
                fill
              />
            </div>
            <ul className="item__characteristics">
              {product?.characteristics?.map((characteristic, j) => (
                <li
                  key={`product-characteristic-${i}-${j}`}
                  className="characteristic"
                >
                  <span>{characteristic.title}</span>
                  <p className="characteristic-tag">{characteristic.value}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
