import React from "react";
import TextSrc from "../../../public/misc/asciiwindow.js"; // default export
import s from "./styles/ascii.module.scss";

/**
 * TextASCIIbg
 * Renders ASCII text as a subtle, translucent background.
 *
 * Props:
 * - drift: boolean - if true, applies slow vertical drift animation
 * - className: optional extra CSS classes
 */
export const TextASCIIbg = ({ drift = true, className = "" }) => {
  return (
    <pre
      className={`${s.ascii} ${drift ? s["ascii--drift"] : ""} ${className}`}
    >
      {TextSrc}
    </pre>
  );
};
