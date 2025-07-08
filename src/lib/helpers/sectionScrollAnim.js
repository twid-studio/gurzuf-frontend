import { useScroll, useTransform } from "framer-motion";

export const sectionScrollAnim = (sectionScrollRef) => {
  const { scrollYProgress } = useScroll({
    target: sectionScrollRef,
    offset: ["start end", "end start"],
    layoutEffect: true,
  });

  const margin = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["1em 1em 0", "1em 0em 0", "1em 0em 0", "1em 1em 0"]
  );

  return margin;
};
