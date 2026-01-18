import React from "react";
import styles from "./styles/textinput.module.scss";

export const TextInput = ({
  value,
  onChange,
  title,
  variant = "regular", // "hero", "regular", or "mobile"
  showBorder = true,
  placeholder = "",
  type = "text",
  name,
  ...props
}) => {
  
  // Combine dynamic styles
  const containerClasses = [
    styles.inputContainer,
    styles[variant],
    !showBorder ? styles.noBorder : ""
  ].join(" ").trim();

  return (
    <div className={containerClasses}>
      {title && (
        <label className={styles.label} htmlFor={name}>
          {title}
        </label>
      )}
      <input
        {...props}
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className={styles.inputElement}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};