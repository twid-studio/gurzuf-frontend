import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import { formatDate } from "@/lib/helpers/formatDate";

import "./BlogLink.scss";

export const BlogLink = ({ data }) => {
  if (!data) return null;

  const { type, link, title, image, source, date } = data;
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
      className="blog-link"
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
      <div className="blog-link__bottom">
        {date && <p className="shadow small-text">{formatDate(date)}</p>}
        <p className="bold blog-link__text" ref={textRef}>
          {title}
          {link.type === "href" && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="blog-link__text-icon"
            >
              <path
                d="M1.69176 10.804L0.522017 9.62784L7.6108 2.52628H2.17756L2.19034 0.909091H10.4041V9.12926H8.77415L8.78693 3.69602L1.69176 10.804Z"
                fill="black"
              />
            </svg>
          )}
        </p>
      </div>
    </Link>
  );
};
