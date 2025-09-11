"use client";
import Link from "next/link";
import React, { useContext } from "react";

import "./Menu.scss";
import { motion } from "framer-motion";
import { anim, MenuAnim } from "@/lib/helpers/anim";
import { Button } from "@/utils/Button/Button";
import { LocaleContext } from "@/lib/providers/LocaleProvider/LocaleProvider";
import { usePathname } from "next/navigation";

export default function Menu({ setIsMenuOpen, data }) {
  const { lang } = useContext(LocaleContext);
  const path = usePathname();
  const langSwitchLink = path.startsWith("/en")
    ? path.replace("/en", "") || "/"
    : `/en${path}`;

  return (
    <>
      <motion.div {...anim(MenuAnim.wrapper)} className="menu">
        <div className="list">
          {data.slice(0, -1).map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="menu__item"
              onClick={() => setIsMenuOpen(false)}
            >
              <h2>{item.text}</h2>
            </Link>
          ))}
          <div className="buttons">
            <Button
              text={lang === "ua" ? "EN" : "UA"}
              href={langSwitchLink}
              fullWidth
              onClick={() => setIsMenuOpen(false)}
              classes="lang-button"
            />
            <Button
              text={data[data.length - 1].text}
              href={data[data.length - 1].href}
              color="black"
              fullWidth
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="menu-background"
        {...anim(MenuAnim.backround)}
        onClick={() => setIsMenuOpen(false)}
      ></motion.div>
    </>
  );
}
