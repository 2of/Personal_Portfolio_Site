import React from "react";
import styles from "./styles/Divider.module.scss";

/**
 * Divider Component - Multiple monochrome variants
 * 
 * @param {Object} props
 * @param {string} props.variant - Type of divider:
 *   'solid' | 'dashed' | 'dotted' | 'double' | 'thick' | 'fade' | 
 *   'dots' | 'minimal' | 'spaced' | 'inset' | 'gradient' | 'wave'
 * @param {string} props.spacing - Vertical spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} props.className - Additional CSS classes
 */
export const Divider = ({ 
  variant = "solid", 
  spacing = "md",
  className = "" 
}) => {
  return (
    <div 
      className={`${styles.divider} ${styles[variant]} ${styles[`spacing-${spacing}`]} ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};

export default Divider;