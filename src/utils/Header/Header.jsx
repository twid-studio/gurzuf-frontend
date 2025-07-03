"use client";
import React, { useState } from "react";
import { Logo, LongLogo } from "../Logo/Logo";

import "./Header.scss";
import Link from "next/link";
import { Content } from "../Content/Content";
import useIsMobile from "@/lib/helpers/useIsMobile";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Menu/Menu";

const links = [
  {
    text: "Продукти",
    href: "/products",
  },
  {
    text: "Про нас",
    href: "/about",
  },
  {
    text: "Блог",
    href: "/blog",
  },
  {
    text: "Озброїти підрозділ",
    href: "/contact",
  },
];

export default function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const burger = "M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z";
  const cross =
    "M19.0713 6.34375L13.4141 12L19.0713 17.6572L17.6572 19.0713L12 13.4141L6.34277 19.0713L4.92871 17.6572L10.585 12L4.92871 6.34375L6.34277 4.92871L12 10.5859L17.6572 4.92871L19.0713 6.34375Z";

  return (
    <>
      <header className="header">
        {/* <div className="mobile-logo">
          <Content
            url="/assets/gsf-logo.mp4"
            className="mobile-logo__video"
            lazy={false}
            sizes={{
              width: 41,
              height: 36,
            }}
          />
          <Logo className="mobile-logo__logo" />
        </div> */}
        {/* <LongLogo className="header__logo" />
        <Content
          url="/assets/gsf-logo.mp4"
          className="header__center-logo"
          lazy={false}
          sizes={{
            width: 41,
            height: 36,
          }}
        /> */}
        <div className="logos-wrapper">
          <Content
            url="/assets/gsf-logo.mp4"
            className="header__center-logo"
            lazy={false}
            sizes={{
              width: 41,
              height: 36,
            }}
          />
          <LongLogo className="header__logo" data-only-desktop />
          <Logo className="header__logo" data-not-desktop />
        </div>
        <div className="header__links" data-only-desktop--flex>
          {links.map((link, index) => (
            <Link key={index} href={link.href} className="header__link bold">
              {link.text}
            </Link>
          ))}
        </div>
        <div
          className="header__menu-button"
          onClick={() => setIsMenuOpened(!isMenuOpened)}
          data-not-desktop
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={!isMenuOpened ? burger : cross} fill="black" />
          </svg>
        </div>
      </header>
      <AnimatePresence mode="wait">
        {isMenuOpened && (
          <Menu setIsMenuOpen={setIsMenuOpened} data={links} />
        )}
      </AnimatePresence>
    </>
  );
}
