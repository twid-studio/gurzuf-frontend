import Link from "next/link";
import React from "react";

import "./Button.scss";

export const Button = ({ text, href, color = "white", classes, ...rest }) => {
  return (
    <Link
      href={href || ""}
      className={`bold button button--${color} ${classes ? classes : ""}`}
      {...rest}
    >
      {text}
      <div className="button__arrow">
        <svg
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z"
            fill="black"
          />
        </svg>
      </div>
    </Link>
  );
};
