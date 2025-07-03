"use client";

import React, { useRef } from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";

import data from "./footerData.json";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  const pages = data.navigation.pages;
  const contact = data.navigation.contact;
  const other = data.navigation.other;

  const footerRef = useRef();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"],
    layoutEffect: true,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "10%"]);

  return (
    <footer className="footer">
      <div className="navigation-wrapper" ref={footerRef}>
        <div className="navigation">
          <p className="shadow">{pages.title}</p>
          <div className="list">
            {pages.items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="navigation__link"
                // target={item.link.type === "href" ? "_blank" : "_self"}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="navigation">
          <p className="shadow">{contact.title}</p>
          <div className="list">
            {contact.items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="navigation__link"
                // target={item.link.type === "href" ? "_blank" : "_self"}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="navigation">
          <p className="shadow">{other.title}</p>
          <div className="list">
            {other.items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="navigation__link"
                // target={item.link.type === "href" ? "_blank" : "_self"}
              >
                {item.text}
              </Link>
            ))}
          </div>

          <Link className="navigation__link navigation__link-made-by" href={other.madeBy.href}>
            {other.madeBy.text}
          </Link>
        </div>
      </div>
      <motion.div style={{ y }} className="footer-image" />
    </footer>
  );
}
