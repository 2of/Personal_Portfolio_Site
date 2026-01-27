import React from "react";

export function WavyText({ text, fontSize = "48px", fontWeight = "700", delay = 0.1 }) {
  const characters = text.split("");

  return (
    <div
      style={{
        display: "inline-flex",
        // fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {characters.map((char, i) => (
        <span
          key={i}
          style={{
            fontSize,
            fontWeight,
            color: "currentColor",
            display: "inline-block",
            animation: `wave 3s ease-in-out ${i * delay}s infinite`,
            transformStyle: "preserve-3d",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}

      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-20px) rotateX(10deg);
          }
        }
      `}</style>
    </div>
  );
}