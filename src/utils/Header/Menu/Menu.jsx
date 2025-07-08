import Link from "next/link";
import React from "react";

import "./Menu.scss";
import { motion } from "framer-motion";
import { anim, MenuAnim } from "@/lib/helpers/anim";
import { Button } from "@/utils/Button/Button";

export default function Menu({ setIsMenuOpen, data }) {
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
          <Button
            text={data[data.length - 1].text}
            href={data[data.length - 1].href}
            color="black"
            fullWidth
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      </motion.div>
      <motion.div className="menu-background" {...anim(MenuAnim.backround)} onClick={() => setIsMenuOpen(false)}></motion.div>
    </>
  );
}
