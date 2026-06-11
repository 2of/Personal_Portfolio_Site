import React from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";

export const StandardPage = ({ children }) => {
  const screenSize = useScreenSize();
  const isMobile = screenSize === "sm";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden", // Cuts off ghost margins
        boxSizing: "border-box",
        paddingTop: "4vh",
        paddingBottom: "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          boxSizing: "border-box",
          padding: isMobile ? "0 1rem" : "0 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          // ── THE HORIZONTAL FIXES ──
          minWidth: 0,         // Forces flex children to shrink below content size
          overflowX: "hidden"  // Prevents wide child components from expanding this column
        }}
      >
        {children}
      </div>
    </div>
  );
};