import React from "react";
import styles from "./styles/GenericCard.module.scss";
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import { useNavigateTo } from "../../hooks/useNavigate";

export const GenericCard = ({ title, subtitle, link }) => {
  const navigateTo = useNavigateTo();
  
  return (
    <div className={styles.card}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {link && (
        <ModernButton
          label="open"
          icon={getIcon("go")}
          variant="dev"
          callback={() => navigateTo(link)}
        />
      )}
    </div>
  );
};