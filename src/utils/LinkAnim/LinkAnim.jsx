import Link from "next/link";
import React from "react";

import "./LinkAnim.scss";
import { getLinkTarget } from "@/lib/helpers/getLinkTarget";

export const LinkAnim = ({
  text,
  href = "",
  classes,
  color = "black",
  ...rest
}) => {
  const isAnchorLink = href && href.startsWith("#");
  
  return (
    <Link
      href={href || "#"}
      className={`link-anim bold ${classes || ""} link-anim--${color}`}
      {...rest}
      target={isAnchorLink ? undefined : getLinkTarget(href)}
      {...(isAnchorLink && { "data-scroll-anchor": href })}
    >
      {text}
    </Link>
  );
};
