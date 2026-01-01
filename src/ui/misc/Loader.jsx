import React from "react";
import styles from "./styles/loader.module.scss";




export function Loader({ size = 3, text = "loading" , fillparent = false}) {
  const totalDots = size * size;
  const dots = Array.from({ length: totalDots });

  return (
    <div className={`${styles.container} ${fillparent && styles.fillpage}`}>
      <div className={styles.grid} style={{ '--grid-size': size }}>
        {dots.map((_, i) => (
          <div
            key={i}
            className={styles.dot}
            style={{
              "--x": i % size,
              "--y": Math.floor(i / size),
            }}
          />
        ))}
      </div>
      <span className={styles.label}>{text}</span>
    </div>
  );
}