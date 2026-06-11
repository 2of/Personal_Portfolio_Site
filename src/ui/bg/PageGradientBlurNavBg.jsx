import { useMemo } from "react";
import { useAppTheme } from "../../contexts/ThemeContext";

/**
 * Converts any standard Hex color string (#FFFFFF or #FFF) to an "R, G, B" string.
 * Returns a safe dark/light fallback if parsing fails.
 */
const hexToRgbString = (hex, fallback = "0, 0, 0") => {
  if (!hex || typeof hex !== "string") return fallback;
  
  let cleaned = hex.replace(/^#/, "");
  if (cleaned.length === 3) {
    cleaned = cleaned.split("").map((c) => c + c).join("");
  }
  
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) return fallback;
  return `${r}, ${g}, ${b}`;
};

/**
 * Ultra-smooth progressive blur designed explicitly for bottom navs.
 */
function ProgressiveBlur({ intensity, shape }) {
  const steps = 12;
  
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: steps }, (_, i) => {
        const t = i / (steps - 1);
        const blur = (Math.pow(t, 2) * 24 * intensity).toFixed(1);
        
        const stop1 = Math.max(0, (t - 0.12) * 100).toFixed(1);
        const stop2 = (t * 100).toFixed(1);
        const stop3 = Math.min(100, (t + 0.12) * 100).toFixed(1);
        
        let mask = "";

        if (shape === "radial") {
          const dist1 = 100 - stop3;
          const dist2 = 100 - stop2;
          const dist3 = 100 - stop1;
          mask = `radial-gradient(ellipse at bottom center, transparent ${dist1}%, rgba(0,0,0,1) ${dist2}%, transparent ${dist3}%)`;
        } else {
          mask = `linear-gradient(to bottom, transparent ${stop1}%, rgba(0,0,0,1) ${stop2}%, transparent ${stop3}%)`;
        }

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Solid color fade overlay anchored to the bottom.
 * Uses only the background color string passed down from the theme context.
 */
function ColorFade({ intensity, bgRgb, shape }) {
  const background = useMemo(() => {
    if (shape === "radial") {
      return `radial-gradient(ellipse at bottom center, 
        rgba(${bgRgb}, ${intensity.toFixed(2)}) 0%, 
        rgba(${bgRgb}, ${(intensity * 0.85).toFixed(2)}) 35%, 
        rgba(${bgRgb}, ${(intensity * 0.3).toFixed(2)}) 70%, 
        rgba(${bgRgb}, 0) 100%)`;
    }
    
    return `linear-gradient(to top,
      rgba(${bgRgb}, ${intensity.toFixed(2)}) 0%,
      rgba(${bgRgb}, ${(intensity * 0.72).toFixed(2)}) 38%,
      rgba(${bgRgb}, ${(intensity * 0.22).toFixed(2)}) 70%,
      rgba(${bgRgb}, 0) 100%)`;
  }, [intensity, bgRgb, shape]);

  return <div style={{ position: "absolute", inset: 0, background }} />;
}

/**
 * NavObsNavgradBlurBG
 * Custom dynamic contrast layout for underlying navigation bars.
 */
export function NavObsNavgradBlurBG({
  effect = "gradient", // "blur" or "gradient"
  shape = "linear",     // "linear" or "radial"
  intensity = 2,
  height = 120,
}) {
  const { getColor, darkMode } = useAppTheme();
  
  // Resolve background color safely depending on dark/light mode context
  const hexBg = getColor("--bg");
  const bgRgbString = useMemo(() => {
    const defaultFallback = darkMode ? "17, 17, 16" : "250, 250, 248";
    return hexToRgbString(hexBg, defaultFallback);
  }, [hexBg, darkMode]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: "12px",
        height, 
        pointerEvents: "none", 
        zIndex: 400, 
        overflow: "hidden",
      }}
    >
      {effect === "blur" && (
        <ProgressiveBlur 
          intensity={intensity} 
          shape={shape} 
        />
      )}
      {effect === "gradient" && (
        <ColorFade
          intensity={intensity}
          bgRgb={bgRgbString}
          shape={shape}
        />
      )}
    </div>
  );
}