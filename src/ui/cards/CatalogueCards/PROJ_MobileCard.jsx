import React, { useState } from "react";
import styles from "./styles/PROJ_MobileCard.module.scss";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";

export const PROJCARD_Mobile = ({
  title,
  description,
  date,
  tags,
  links,
  link,
  image,
  inprogress
}) => {
  const gotoURL = useNavigateTo();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    if (links && links.length > 0) {
      gotoURL(links[0].to);
    } else if (link) {
      gotoURL(link);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div 
      className={`${styles.mobileCard} StandardBoxL2`}
      onClick={handleCardClick}
    >
      {inprogress && (
        <div className={styles.badge}>
          {getIcon("smile")}
          <span>In Progress</span>
        </div>
      )}

      {image && (
        <div className={styles.ImgContainer}>
          <img
            src={image}
            alt={title}
            className={styles.image}
          />
          <div className={styles.imageOverlay} />
        </div>
      )}

      <div className={styles.ContentWrapper}>
        <div className={styles.Header}>
          <h3 className={styles.Title}>{title}</h3>
          {date && <span className={styles.date}>{date}</span>}
        </div>

        <p className={`${styles.Description} ${isExpanded ? styles.expanded : ''}`}>
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className={styles.tagContainer}>
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className={styles.tag}>{tag}</span>
            ))}
            {tags.length > 3 && (
              <span className={styles.tagMore}>+{tags.length - 3}</span>
            )}
          </div>
        )}

        {links && links.length > 0 && (
          <div className={styles.linkGroup}>
            {links.slice(0, 2).map((l, i) => (
              <ModernButton
                key={i}
                variant="dev_block"
                icon={getIcon(l.icon || 'right')}
                label={l.label}
                callback={(e) => {
                  e.stopPropagation();
                  gotoURL(l.to);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

