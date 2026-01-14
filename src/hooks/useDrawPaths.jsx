import { useEffect, useRef } from "react";

function useDrawPaths(svgRef, {
  duration = 1.8,
  stagger = 0.08,
} = {}) {
  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");

    paths.forEach((path, i) => {
      const length = path.getTotalLength();

      path.style.fill = "none";
      path.style.stroke = "currentColor";
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.opacity = 1;

      path.getBoundingClientRect();

      path.style.transition = `
        stroke-dashoffset ${duration}s ease
      `;
      path.style.transitionDelay = `${i * stagger}s`;

      path.style.strokeDashoffset = 0;
    });
  }, [svgRef, duration, stagger]);
}
