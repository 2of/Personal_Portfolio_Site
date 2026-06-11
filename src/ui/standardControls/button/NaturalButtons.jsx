import React, { act } from "react";
import getIcon from "../../../tools/iconRef";
import styles from "./styles/NaturalButtons.module.scss";

export const NaturalButton = ({
  label,
  icon,
  onClick,
  variant = "natural",
  className = "",
  darkOverride = false,
  tooltip,
  active,
  ...props
}) => {



  let variantClass = "";
  if (variant === "natural") variantClass = styles.natural;
  if (variant === "natural_icon_only") variantClass = styles.natural_icon_only;
  if (variant === "natural_large_touch") variantClass = styles.natural_large_touch;
  if (variant === "natural_nav") variantClass = styles.natural_nav;
  if (variant === "natural_squared") variantClass = styles.natural_squared;
  if (variant === "natural_wipe") variantClass = styles.natural_wipe;
  if (variant === "natural_large_touch_nav_menu") variantClass = styles.natural_large_touch_nav_menu;
  if (variant === "expandbutton") variantClass = styles.expandbutton;

  return (
    <button
      className={`${styles.NatButtonContainer} ${variantClass} ${className} ${darkOverride && styles.darkOverride} ${active && styles.active}`}
      onClick={onClick}
      title={tooltip}
      {...props}
    >

      {/* test  {active ? "TSET" : "SDF"} */}
      {variant === "expandbutton" ? (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {label && (
            <span className={styles.expandLabelWrapper}>
              <span className={styles.expandLabelInner}>{label}</span>
            </span>
          )}
        </>
      ) : variant === "natural_wipe" ? (
        <>
          <span className={styles.buttoncontent}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {label && <span>{label}</span>}
          </span>
          <span className={styles.buttoncontentOverlay}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {label && <span>{label}</span>}
          </span>
        </>
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
};