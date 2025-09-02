"use client";
import React, { useContext } from "react";
import { Logo, LongLogo } from "../Logo/Logo";

import "./Header.scss";
import Link from "next/link";
import { Content } from "../Content/Content";
import MenuWrapper from "./Menu/MenuWrapper";
import { LinkAnim } from "../LinkAnim/LinkAnim";
import { usePathname } from "next/navigation";
import { Button } from "../Button/Button";
import { LocaleContext } from "@/lib/providers/LocaleProvider/LocaleProvider";

const links = {
  ua: [
    {
      text: "Продукти",
      href: "/products/heavy-shot",
    },
    {
      text: "Про нас",
      href: "/about",
    },
    {
      text: "Новини",
      href: "/blog",
    },
    {
      text: "Озброїти підрозділ",
      href: "#contact",
    },
  ],
  en: [
    {
      text: "Products",
      href: "/en/products/heavy-shot",
    },
    {
      text: "About us",
      href: "/en/about",
    },
    {
      text: "News",
      href: "/en/blog",
    },
    {
      text: "Equip the unit",
      href: "#contact",
    },
  ],
};

export default function Header() {
  const path = usePathname();
  const { lang } = useContext(LocaleContext);
  const linksData = links[lang] || links.ua;
  const isHomePage = path === "/" || path === "/en";

  return (
    <>
      <header className="header">
        <Link
          href={isHomePage ? "#hero" : "/"}
          className="logos-wrapper"
          {...(isHomePage ? { "data-scroll-anchor": "#hero" } : {})}
        >
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
        </Link>
        <div className="header__links" data-only-desktop--flex>
          {linksData.map((link, index) => (
            // <Link key={index} href={link.href} className="header__link bold">
            //   {link.text}
            // </Link>
            <LinkAnim text={link.text} href={link.href} key={index} />
          ))}
        </div>

        <MenuWrapper links={linksData} />
      </header>
    </>
  );
}
