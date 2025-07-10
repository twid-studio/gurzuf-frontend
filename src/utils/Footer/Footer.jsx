"use client";

import React, { useRef } from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";

import data from "./footerData.json";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import useIsMobile from "@/lib/helpers/useIsMobile";
import { LinkAnim } from "../LinkAnim/LinkAnim";

export default function Footer() {
  const pages = data.navigation.pages;
  const contact = data.navigation.contact;
  const other = data.navigation.other;

  const isMobile = useIsMobile();

  const footerRef = useRef();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
    layoutEffect: true,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const yMob = useTransform(scrollYProgress, [0, 0.75], ["-40%", "0%"]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(0)", "brightness(1)"]
  );
  const filterMob = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["brightness(0)", "brightness(1)"]
  );

  return (
    <footer className="footer">
      <div className="navigation-wrapper">
        <div className="navigation">
          <p className="shadow">{pages.title}</p>
          <div className="list">
            {pages.items.map((item, index) => (
              // <Link
              //   key={index}
              //   href={item.href}
              //   className="navigation__link"
              //   // target={item.link.type === "href" ? "_blank" : "_self"}
              // >
              //   {item.text}
              // </Link>
              <LinkAnim
                text={item.text}
                href={item.href}
                key={index}
                color="white"
                classes="navigation__link"
              />
            ))}
          </div>
        </div>
        <div className="navigation">
          <p className="shadow">{contact.title}</p>
          <div className="list">
            {contact.items.map((item, index) => (
              // <Link
              //   key={index}
              //   href={item.href}
              //   className="navigation__link"
              //   // target={item.link.type === "href" ? "_blank" : "_self"}
              // >
              //   {item.text}
              // </Link>
              <LinkAnim
                text={item.text}
                href={item.href}
                key={index}
                color="white"
                classes="navigation__link"
              />
            ))}
          </div>
        </div>
        <div className="navigation">
          <p className="shadow">{other.title}</p>
          <div className="list">
            {other.items.map((item, index) => (
              // <Link
              //   key={index}
              //   href={item.href}
              //   className="navigation__link"
              //   // target={item.link.type === "href" ? "_blank" : "_self"}
              // >
              //   {item.text}
              // </Link>
              <LinkAnim
                text={item.text}
                href={item.href}
                key={index}
                color="white"
                classes="navigation__link"
              />
            ))}
          </div>

          {/* <Link
            className="navigation__link navigation__link-made-by"
            href={other.madeBy.href}
          >
            {other.madeBy.text}
          </Link> */}

          <LinkAnim
            text={other.madeBy.text}
            href={other.madeBy.href}
            color="white"
            classes="navigation__link navigation__link-made-by"
            />
        </div>
      </div>
      <div className="footer-image__wrapper" ref={footerRef}>
        <motion.div
        style={{
          y: isMobile ? yMob : y,
          filter: isMobile ? filterMob : filter,
        }}
        className="footer-image" />
      </div>
    </footer>
  );
}
