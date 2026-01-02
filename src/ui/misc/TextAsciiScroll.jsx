import React from "react";

export const AsciiArt = ({
  art,
  direction = "top-down", // "top-down" | "bottom-up"
  minOpacity = 0.1,
  maxOpacity = 1,
  showLineNumbers = false,
  className = "",
}) => {
  const lines = art
    .split("\n")
    .filter((line, i, arr) => !(i === 0 && line === "") && !(i === arr.length - 1 && line === ""));

  const total = lines.length - 1 || 1;

  const getOpacity = (index) => {
    const t =
      direction === "bottom-up"
        ? 1 - index / total
        : index / total;

    return minOpacity + t * (maxOpacity - minOpacity);
  };

  return (
    <pre
      className={className}
      style={{
        fontFamily: "monospace",
        lineHeight: "1.2em",
        margin: 0,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            opacity: getOpacity(i),
            whiteSpace: "pre",
          }}
        >
          {showLineNumbers && (
            <span
              style={{
                width: "3ch",
                marginRight: "1ch",
                textAlign: "right",
                opacity: 0.5,
                userSelect: "none",
              }}
            >
              {i + 1}
            </span>
          )}
          <span>{line}</span>
        </div>
      ))}
    </pre>
  );
};
