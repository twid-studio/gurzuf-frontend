"use client";
import Image from "next/image";
import React, { useContext, useRef } from "react";

import "./QuoteHome.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { Button } from "@/utils/Button/Button";
import { motion, useScroll, useTransform } from "framer-motion";

export default function QuoteHome() {
  const { data: allData } = useContext(DataContext);
  const { quote: data } = allData;

  const sectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
    layoutEffect: true,
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <section className="quote" ref={sectionRef}>
      <picture className="quote-background">
        <source
          media="(max-aspect-ratio: 2/3)"
          srcSet="/assets/home/quote/mobile-bg.svg"
        />
        <source
          media="(min-aspect-ratio: 2/3) and (max-aspect-ratio: 4/3)"
          srcSet="/assets/home/quote/tablet-bg.svg"
        />
        <img src="/assets/home/quote/desktop-bg.svg" alt="" width="100%" />
      </picture>
      <motion.div className="quote-content-wrapper">
        <div className="quote-content">
          <div className="text">
            <div className="text-quote-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.8088 3.6001V19.9308L22.9744 11.7655V3.6001H14.8088Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.19995 3.6001V19.9308L9.36556 11.7655V3.6001H1.19995Z"
                  fill="white"
                />
              </svg>
            </div>
            <h2
              className="text-quote"
              dangerouslySetInnerHTML={{ __html: data.text }}
            />
          </div>
          <div className="author">
            <Image
              src={data.author.image}
              alt={data.author.name}
              width={64}
              height={64}
              className="author__image"
            />
            <div className="author-info">
              <p className="author-name bold">{data.author?.name}</p>
              <p className="author-position">{data.author?.position}</p>
            </div>
          </div>
        </div>
        {data?.button.active && (
          <Button
            text={data?.button?.text}
            href={data?.button?.href}
            color="black"
            // classes="quote__button"
            fullWidth
          />
        )}
      </motion.div>
    </section>
  );
}
