import React from "react";

export const HandWrittenLabel = ({ 
  text = "",
  arrow = true,
  arrowBefore = false,
  variant = "straight",
  color = "inherit",
  rotate = 0,
  style = {},
  className = "",
  ...rest
}) => {
  const rootStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35em",
    color,
    whiteSpace: "nowrap",
    userSelect: "none",
    width: "max-content", 
    flexDirection: arrowBefore ? "row-reverse" : "row",
    ...style,
  };

  const arrowStyle = {
    opacity: 0.85, 
    display: "inline-block",
    width: "1.15em",  
    height: "1.15em",
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    transformOrigin: "center center",
    flexShrink: 0,
  };

  const renderArrowPath = () => {
    switch (variant) {
      case "curveLeft":
        return (
          <>
            <path d="M19 20c-3-2-5-5-5-9V4" />
            <polyline points="10 8 14 4 18 8" />
          </>
        );
      case "curveRight":
        return (
          <>
            <path d="M5 20c3-2 5-5 5-9V4" />
            <polyline points="6 8 10 4 14 8" />
          </>
        );
      case "straight":
      default:
        return (
          <>
            <line x1="12" y1="20" x2="12" y2="4" />
            <polyline points="6 10 12 4 18 10" />
          </>
        );
    }
  };

  return (
    <span style={rootStyle} className={`${className} text-handwritten1`} {...rest}>
      {text}
      {arrow && (
        <svg 
          viewBox="0 0 24 24" 
          style={arrowStyle}
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {renderArrowPath()}
        </svg>
      )}
    </span>
  );
};