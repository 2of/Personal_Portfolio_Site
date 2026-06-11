// PROJCARD_Large.jsx
import React from "react";
import styles from "./styles/PROJ_LargeCard.module.scss";
import defaultImg from "../../../assets/default.jpeg";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";

export const PROJCARD_Large = ({
  title,
  description,
  date,
  tags,
  links,
  image,
  inprogress,
  isHighlight = false,
}) => {
  const gotoURL = useNavigateTo();
  const truncatedTags = tags?.slice(0, 6) ?? [];
  const remaining = (tags?.length ?? 0) - truncatedTags.length;

  return (
    <div 
      className={`
        ${styles.DATASTRIP_Container} 
        ${isHighlight ? styles.isHighlight : ""}
      `}
    >
      {/* Visual Image Block (Optional side panel) */}
      {image && (
        <div className={styles.imageWrap}>
          <img src={image || defaultImg} alt={title} className={styles.image} />
          {inprogress && (
            <span className={styles.DATASTRIP_Status}>In Progress</span>
          )}
        </div>
      )}

      {/* Technical Vertical Strip Divider */}
      <div className={styles.DATASTRIP_Divider} />

      {/* Main Technical Content Panel */}
      <div className={styles.DATASTRIP_TerminalBody}>
        
        {/* Header Metadata block */}
        <div className={styles.DATASTRIP_MetaHeader}>
          <span>{date}</span>
          {inprogress && !image && (
            <span className={styles.DATASTRIP_Status}>In Progress</span>
          )}
        </div>

        {/* Content */}
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>

        {/* Footer actions & taxonomies */}
        <div className={styles.footer}>
          {truncatedTags.length > 0 && (
            <div className={styles.tags}>
              {truncatedTags.map((tag, i) => (
                <span key={i} className={styles.tag}>{tag}</span>
              ))}
              {remaining > 0 && (
                <span className={`${styles.tag} ${styles.tagMore}`}>
                  +{remaining}
                </span>
              )}
            </div>
          )}

          {links?.length > 0 && (
            <div className={styles.links}>
              {links.map((l, i) => (
                <ModernButton
                  key={i}
                  variant={i === 0 ? "nav_Tertiary" : "nav_Primary"}
                  icon={getIcon("right")}
                  label={l.label}
                  callback={() => gotoURL(l.to)}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};