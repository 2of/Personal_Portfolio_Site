import React, { useState, useRef, useEffect } from "react";


export const VerticalScrollWithTracking = ({ update, children }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const scrollHeight = containerRef.current.scrollHeight;
    const clientHeight = containerRef.current.clientHeight;

    const newPercent = Math.min(
      100,
      Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100)
    );

    setPercent(newPercent);
    if (update) update(newPercent);
  };

  // Optional: track scroll if the user resizes the window
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    node.addEventListener("scroll", handleScroll);
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        // backgroundColor: "red",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {children}

      {/* Optional: display scroll percent */}
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          padding: "0.3rem 0.6rem",
          borderRadius: "4px",
        }}
      >
        {percent.toFixed(0)}%
      </div>
    </div>
  );
};
