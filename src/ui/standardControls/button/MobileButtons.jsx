import React from "react";
import styles from "./styles/MobileButtons.module.scss";
import getIcon from "../../../tools/iconRef";

export const MobileButton = ({ variant, label, icon, onClick, className = "", active = false, ...props }) => {
  const variantClass = styles[variant] || styles.mobileNav;
  
  return (
    <button
      className={`${styles.MobileButton} ${variantClass} ${active ? styles.active : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <div className={styles.icon}>
          {typeof icon === "string" ? getIcon(icon) : icon}
        </div>
      )}
      {(variant === "mobileNavWithLabel" || variant === "mobileNavLargeMenu") && label && (
        <span className={styles.label}>{label}</span>
      )}
    </button>
  );
};