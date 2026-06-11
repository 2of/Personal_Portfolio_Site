import React from "react";

export const GiantBoldTitle = ({ 
  text = "Project Manifest", 
  fontSize = "48px", 
  color = "var(--text-color)",
  accentColor = "var(--accent-color)" 
}) => {
  // Unique ID for the path to allow multiple instances on one page !!! ahhhh
  const pathId = React.useId().replace(/:/g, "");

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 0",
      overflow: "visible",
      userSelect: "none"
    }}>
      <svg 
        viewBox="0 0 600 120" 
        style={{ 
          width: "100%", 
          maxWidth: "1000px", 
          height: "auto", 
          overflow: "visible" 
        }}
      >

        <defs>
          <path 
            id={pathId} 
            d="M 50,100 Q 300,-20 550,100" 
          />
        </defs>

        <text 
          style={{
            fill: color,
            fontWeight: 900,
            fontSize: fontSize,
            // fontFamily: '"Inter", "Geist", "SF Pro Display", sans-serif',
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
          }}
        >
          <textPath 
            href={`#${pathId}`} 
            startOffset="50%" 
            textAnchor="middle"
          >
            {text}
          </textPath>
        </text>
      </svg>


      <div style={{
        width: "40%",
        height: "1px",
        marginTop: "-15px",
        background: `linear-gradient(90deg, 
          transparent, 
          ${accentColor}44, 
          transparent
        )`,
        position: "relative"
      }}>
       
      </div>


      
    </div>
  );
};

export default GiantBoldTitle;