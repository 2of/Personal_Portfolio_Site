import React from "react";
import styles from "./styles/BlackAndWhiteHoverReveal.module.scss";
import defaultImg from "../../assets/default.jpeg";

export const BlackAndWhiteHoverReveal = ({ img, filterType = "grayscale" }) => {
  const imageSrc = img || defaultImg;

  return (
    <div className={styles.container}>
      {/* Base color image */}
      <img src={imageSrc} alt="color" className={`${styles.image} ${styles.color}`} />

      {/* Overlay with filter */}
      <img
        src={imageSrc}
        alt="overlay"
        className={`${styles.image} ${styles.overlay} ${styles[filterType]}`}
      />
    </div>
  );
};
