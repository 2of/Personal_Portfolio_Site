import React from "react";
import styles from "./styles/textinput.module.scss";

export const TextInput = ({
  value,
  onChange,
  title,
  variant = "airline", // "regular", "glass", "box", or "airline"
  showBorder = true,
  placeholder = "",
  type = "text",
  name,
  className = "",
  ...props
}) => {
  
  const getVariantClass = () => {
    switch (variant) {
      case "glass":
        return styles.variantGlass;
      case "box":
        return styles.variantBox;
      case "airline":
        return styles.variantAirline;
      case "regular":
      default:
        return styles.variantRegular;
    }
  };

  // Maps clean string inputs or falls back safely
  const materialClass = variant === "glass" ? "MaterialL1" : "";

  const containerClasses = [
    styles.inputContainer,
    getVariantClass(),
    !showBorder ? styles.noBorder : "",
    materialClass,
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={containerClasses}>
      {title && (
        variant === "airline" ? (
          /* Uses global data structure token for terminal theme headers */
          <div className={`${styles.airlineMetaHeader} DATASTRIP_MetaHeader`}>
            <span>{title}</span>
            <span className={styles.systemTag}>SYS//INP</span>
          </div>
        ) : (
          <label className={styles.label} htmlFor={name}>
            {title}
          </label>
        )
      )}
      
      <div className={variant === "airline" ? "DATASTRIP_TerminalBody" : styles.inputWrapper}>
        <input
          {...props}
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder || variant}
          className={`${styles.inputElement} ${variant === "airline" ? styles.airlineInput : ""}`}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};