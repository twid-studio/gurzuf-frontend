import React, { useEffect, useRef } from "react";

import "./HotNews.scss";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { formatDate } from "@/lib/helpers/formatDate";

export default function HotNews({ data }) {
  return (
    <section className="hot-news container">
      {data?.titleHotNews && <h1>{data?.titleHotNews}</h1>}

      <div className="list">
        <BigNewsItem item={data?.list[0]} />

        <div className="list-right">
          {data?.list.slice(1,3).map((item, index) => (
            <SmallNewsItem item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const BigNewsItem = ({ item }) => {
  const { type, link, title, image, source, date } = item;
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Register SplitText plugin
      gsap.registerPlugin(SplitText);

      // Split text by lines
      const splitText = new SplitText(textRef.current, {
        type: "lines",
        linesClass: "blog-link__text-line",
      });

      // Cleanup function to revert split text
      return () => {
        if (splitText) {
          splitText.revert();
        }
      };
    }
  }, [title]);

  return (
    <Link
      href={link.type === "slug" ? `/blog/${link?.slug}` : link?.href}
      className="blog-link big-blog-link"
      target={link.type === "href" ? "_blank" : "_self"}
    >
      <div className="blog-link__top">
        <div className={`blog-link__type blog-link__type--${type.slug}`}>
          {type.text}
        </div>

        {source.active && (
          <Image
            src={source.image}
            alt="source"
            width={44}
            height={44}
            className="blog-link__source"
          />
        )}
        <Image
          src={image}
          alt={title}
          width={450}
          height={250}
          className="blog-link__image"
        />
      </div>

      <div className="big-blog-link__content">
        {date && <p className="shadow small-text">{formatDate(date)}</p>}
        <p className="bold blog-link__text" ref={textRef}>
          {title}
        </p>
      </div>
    </Link>
  );
};

const SmallNewsItem = ({ item }) => {
  const { type, link, title, image, source, date } = item;
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Register SplitText plugin
      gsap.registerPlugin(SplitText);

      // Split text by lines
      const splitText = new SplitText(textRef.current, {
        type: "lines",
        linesClass: "blog-link__text-line",
      });

      // Cleanup function to revert split text
      return () => {
        if (splitText) {
          splitText.revert();
        }
      };
    }
  }, [title]);

  return (
    <Link
      href={link.type === "slug" ? `/blog/${link?.slug}` : link?.href}
      className="blog-link small-blog-link"
      target={link.type === "href" ? "_blank" : "_self"}
    >
      <div className="blog-link__top">
        <div className={`blog-link__type blog-link__type--${type.slug}`}>
          {type.text}
        </div>

        {source.active && (
          <Image
            src={source.image}
            alt="source"
            width={44}
            height={44}
            className="blog-link__source"
          />
        )}
        <Image
          src={image}
          alt={title}
          width={450}
          height={250}
          className="blog-link__image"
        />
      </div>

      <div className="small-blog-link__content">
        {date && <p className="shadow small-text">{formatDate(date)}</p>}
        <p className="bold blog-link__text" ref={textRef}>
          {title}
        </p>
      </div>
    </Link>
  );
};
