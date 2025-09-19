"use client";
import React, { useContext } from "react";
import { Logo, LongLogo } from "../Logo/Logo";

import "./Header.scss";
import Link from "next/link";
import { Content } from "../Content/Content";
import MenuWrapper from "./Menu/MenuWrapper";
import { LinkAnim } from "../LinkAnim/LinkAnim";
import { usePathname } from "next/navigation";
import { LocaleContext } from "@/lib/providers/LocaleProvider/LocaleProvider";
import { Button } from "../Button/Button";


export default function Header({ data }) {
  const path = usePathname();
  const { lang } = useContext(LocaleContext);
  // const linksData = links[lang] || links.ua;
const linksData = data?.navList;

  const isHomePage = path === "/" || path === "/en";
  const langSwitchLink = path.startsWith("/en")
    ? path.replace("/en", "") || "/"
    : `/en${path}`;

  return (
    <>
      <header className="header">
        <Link
          href={isHomePage ? "#hero" : lang === "ua" ? "/" : "/en"}
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
            <LinkAnim text={link.text} href={link.href} key={index} />
          ))}
          <Link href={langSwitchLink} className="header__lang-button">
            {lang === "ua" ? "EN" : "UA"}
          </Link>
        </div>

        <MenuWrapper links={linksData} />
      </header>
    </>
  );
}
