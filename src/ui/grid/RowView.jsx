import React from "react";
import styles from "./styles/RowView.module.scss";

export const RowView = ({ rows = [], mobile }) => {
  return (
    <div
      className={`${styles.rowViewPlatter} ${mobile ? styles.mobile : ""}`}
    >
      {rows.map((item, index) => {
        const hasComponent = !!item.component;
        const hasParagraph = !!item.paragraph;

        return (
          <div
            key={index}
            className={`
              ${styles.row}
              ${!hasComponent && !hasParagraph ? styles.justLabel : ""}
              ${!hasComponent && hasParagraph ? styles.labelAndParagraph : ""}
              ${hasComponent && !hasParagraph ? styles.labelAndComponent : ""}
              ${hasComponent && hasParagraph ? styles.fullRow : ""}
              ${item.disable ? styles.disabled : ""}
            `}
          >
            <span className={styles.label}>{item.label}</span>

            {hasComponent && (
              <div className={styles.component}>{item.component}</div>
            )}

            {hasParagraph && (
              <p className={styles.paragraph}>{item.paragraph}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RowView;
