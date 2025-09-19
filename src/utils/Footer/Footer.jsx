"use client";

import React, { useContext, useRef } from "react";

import "./Footer.scss";

// import dataFalback from "./footerData.json";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import useIsMobile from "@/lib/helpers/useIsMobile";
import { LinkAnim } from "../LinkAnim/LinkAnim";
import { LocaleContext } from "@/lib/providers/LocaleProvider/LocaleProvider";

export default function Footer({ data }) {
  const { lang } = useContext(LocaleContext);
  // Defensive fallbacks to prevent runtime errors when data or navigation is missing
  const navigation = data?.navigation || {};
  const pages = navigation.pages || { title: "", items: [] };
  const contact = navigation.contact || { title: "", items: [] };
  const other = navigation.other || { title: "", items: [], madeBy: { text: "", href: "#" } };

  // If there is no usable navigation data at all, render nothing (or a minimal placeholder if desired)
  if (!data || !data.navigation) {
    return null; // Alternatively, return a skeleton / placeholder component
  }

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
              <LinkAnim
                text={item.text}
                href={item.href}
                key={index}
                color="white"
                classes="navigation__link"
              />
            ))}
          </div>

          <LinkAnim
            text={other.madeBy?.text}
            href={other.madeBy?.href}
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
          className="footer-image"
        />
      </div>
    </footer>
  );
}

const SocialsLink = ({ href, icon }) => {
  return (
    <Link
      className="socials-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={icon}
        alt="social icon"
        width={24}
        height={24}
        className="socials-link__icon"
      />
    </Link>
  );
};
