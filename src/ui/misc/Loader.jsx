import React from "react";
import styles from "./styles/loader.module.scss";




// export function Loader({ size = 3, text = "loading" , fillparent = false}) {
//   const totalDots = size * size;
//   const dots = Array.from({ length: totalDots });

//   return (
//     <div className={`${styles.container} ${fillparent && styles.fillpage}`}>
//       <div className={styles.grid} style={{ '--grid-size': size }}>
//         {dots.map((_, i) => (
//           <div
//             key={i}
//             className={styles.dot}
//             style={{
//               "--x": i % size,
//               "--y": Math.floor(i / size),
//             }}
//           />
//         ))}
//       </div>
//       <span className={styles.label}>{text}</span>
//     </div>
//   );
// }

export function Loader({ size = 13, text = "loading", fillparent = false }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        height: fillparent ? "100%" : "auto",
        width: fillparent ? "100%" : "auto",
        perspective: "800px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
          transformStyle: "preserve-3d",
          animation: "rotateShape 12s linear infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70px",
            height: "70px",
            border: "2px solid currentColor",
            animation: "morph 12s ease-in-out infinite",
          }}
        />
      </div>

      {text && (
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: "500",
            color: "currentColor",
            opacity: "0.6",
            letterSpacing: "0.5px",
          }}
        >
          {text}
        </p>
      )}

      <style>{`
        @keyframes rotateShape {
          from { transform: rotateY(0deg) rotateX(15deg); }
          to { transform: rotateY(360deg) rotateX(15deg); }
        }

        @keyframes morph {
          /* Square: 0-4s */
          0%, 30% {
            border-radius: 0%;
          }
          
          /* Transition to Circle: 4-8s */
          50%, 80% {
            border-radius: 50%;
          }
          
          /* Back to Square: 8-12s */
          100% {
            border-radius: 0%;
          }
        }
      `}</style>
    </div>
  );
}
