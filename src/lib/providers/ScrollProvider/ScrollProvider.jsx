"use client";
import React, { useEffect, useState } from "react";
import { ScrollContext } from "./context";
import { ScrollBar } from "@/utils/ScrollBar/ScrollBar";

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

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

  // Add click event listener for data-scroll-anchor elements
  useEffect(() => {
    const handleClick = (e) => {
      const scrollTrigger = e.target.closest("[data-scroll-anchor]");
      if (scrollTrigger) {
        const targetSection = scrollTrigger.getAttribute("data-scroll-anchor");
        const targetElement = document.querySelector(targetSection);
        
        if (targetElement) {
          // Use setTimeout to allow other click handlers to execute first
          setTimeout(() => {
            scrollTo(targetElement);
          }, 100);
        }
      }
    };

    // Use capture phase to ensure we handle the event before other listeners
    document.addEventListener("click", handleClick, false);
    return () => document.removeEventListener("click", handleClick, false);
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
