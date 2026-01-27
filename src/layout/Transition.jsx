import React from "react";
import s from "./TransitionCover.module.scss"
export const TransitionCover = ({ state = "idle" }) => {
  const isActive = state !== "idle";
  const isCovering = state === "covering";

  return (
    <div

    className={s.container}
      style={{
        // position: "fixed",
        // top: 0,
        // left: 0,
        // width: "100vw",
        // height: "100vh",
        pointerEvents: isActive ? "all" : "none",
        zIndex: 999999,
        overflow: "hidden",
      }}
    >
      {/* Wipe element */}
      <div className={s.bar}
        style={{
          transform: state === "uncovering"
            ? "translateX(100%)"
            : isCovering
            ? "translateX(0%)"
            : "translateX(-102%)",
          transition: state === "idle"
            ? "none"
            : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
};

export default TransitionCover;