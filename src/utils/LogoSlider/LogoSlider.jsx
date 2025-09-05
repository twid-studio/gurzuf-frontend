import React from "react";

import "./LogoSlider.scss";

export default function LogoSlider({ logos }) {
  return (
    <div className="logos-slider">
      <div className="logos-slider-overflow">  
        <div
          className="logos-slider-wrapper"
          style={{ animationDuration: `${logos.length + 40}s` }}
        >
          {logos.map((currLogo, i) => (
            <img
              src={currLogo.src}
              alt={currLogo.alt || `clients-logo--${i}`}
              className="logo"
              key={`clients-logo--${i}`}
            />
          ))}
        </div>
        <div
          className="logos-slider-wrapper"
          style={{ animationDuration: `${logos.length + 40}s` }}
        >
          {logos.map((currLogo, i) => (
            <img
              src={currLogo.src}
              alt={currLogo.alt}
              className="logo"
              key={`clients-logo--${i}-2`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
