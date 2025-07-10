"use client";
import React from "react";
import { Logo, LongLogo } from "../Logo/Logo";

import "./Header.scss";
import Link from "next/link";
import { Content } from "../Content/Content";
import MenuWrapper from "./Menu/MenuWrapper";
import { LinkAnim } from "../LinkAnim/LinkAnim";

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
  return (
    <>
      <header className="header">
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
            // <Link key={index} href={link.href} className="header__link bold">
            //   {link.text}
            // </Link>
            <LinkAnim
              text={link.text}
              href={link.href}
              key={index}
            />
          ))}
        </div>
        <MenuWrapper links={links} />
      </header>
    </>
  );
}
