"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import Menu from "./Menu";

export default function MenuWrapper({ links }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const burger = "M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z";
  const cross =
    "M19.0713 6.34375L13.4141 12L19.0713 17.6572L17.6572 19.0713L12 13.4141L6.34277 19.0713L4.92871 17.6572L10.585 12L4.92871 6.34375L6.34277 4.92871L12 10.5859L17.6572 4.92871L19.0713 6.34375Z";

  return (
    <>
      <button
        className="header__menu-button"
        data-not-desktop
        onClick={() => setIsMenuOpened(!isMenuOpened)}
        aria-label={isMenuOpened ? "Close menu" : "Open menu"}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={!isMenuOpened ? burger : cross} fill="black" />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        {isMenuOpened && (
          <Menu setIsMenuOpen={setIsMenuOpened} data={links} />
        )}
      </AnimatePresence>
    </>
  );
}
