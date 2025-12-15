"use client";
import React, { useEffect, useState } from "react";
import { ScrollContext } from "./context";
import { ScrollBar } from "@/utils/ScrollBar/ScrollBar";

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export const ScrollProvider = ({ children, scrollBar = false, wrapper }) => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("lenis").then((LenisModule) => {
        const lenisInstance = new LenisModule.default({
          duration: 0.7,
          lerp: 0.1,
          smoothWheel: true,
          wheelMultiplier: 2,
          wrapper: wrapper ? document.querySelector(wrapper) : window,
        });

        setLenis(lenisInstance);

        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
          lenisInstance.destroy();
        };
      });
    }
  }, []);

  // Scroll once on initial load if URL has hash / anchor
  useEffect(() => {
    if (!lenis || typeof window === "undefined") return;

    // Use a flag on window to ensure this runs only once per full reload
    if (window.__lenisAnchorScrolled__) return;

    const { hash } = window.location;
    if (!hash) return;

    // Normalize hash to a selector (e.g. "#section" -> "#section")
    const targetSelector = hash.startsWith("#") ? hash : `#${hash}`;

    const handleInitialAnchorScroll = () => {
      const targetElement = document.querySelector(targetSelector);
      if (!targetElement) return;

      window.__lenisAnchorScrolled__ = true;

      // Delay a bit to ensure layout is ready
      requestAnimationFrame(() => {
        lenis.scrollTo(targetElement, {
          duration: 1.3,
          easing: (x) => easeOutExpo(x),
          offset: -60,
        });
      });
    };

    // Run after a short timeout to wait for page/content hydration
    const timeoutId = setTimeout(handleInitialAnchorScroll, 100);

    return () => clearTimeout(timeoutId);
  }, [lenis]);

  // Add click event listener for data-scroll-anchor elements
  useEffect(() => {
    const handleClick = (e) => {
      const scrollTrigger = e.target.closest("[data-scroll-anchor]");
      if (scrollTrigger) {
        // e.preventDefault();
        // e.stopPropagation();

        const targetSection = scrollTrigger.getAttribute("data-scroll-anchor");
        const targetElement = document.querySelector(targetSection);
        if (targetElement) {
          scrollTo(targetElement);
        }
      }
    };

    // Use capture phase to ensure we handle the event before other listeners
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [lenis]);

  const scrollTo = (target) => {
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.3,
        easing: (x) => easeOutExpo(x),
        offset: -60,
      });
    }
  };

  const rangeScrollTo = (progress) => {
    if (lenis) {
      lenis.scrollTo(progress, {
        duration: 1.5,
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollTo, rangeScrollTo }}>
      {scrollBar && <ScrollBar />}
      {children}
    </ScrollContext.Provider>
  );
};
