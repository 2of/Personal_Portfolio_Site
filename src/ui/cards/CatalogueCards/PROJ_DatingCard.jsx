import React from "react";
import styles from "./styles/PROJ_DatingCard.module.scss";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";

export const PROJCARD_DatingProfile = ({
  title,
  description,
  date,
  tags,
  links,
  image,
  inprogress,
}) => {
  const gotoURL = useNavigateTo();

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    gotoURL(url);
  }

  const handleCardClick = () => {
    if (links && links[0]) {
      gotoURL(links[0].to);
    }
  }

  return (
    <div className={styles.container} >
      <div className={styles.card}>

        {/* Full Bleed Background Image */}
        <div className={styles.backgroundWrapper}>
          {image ? (
            <img src={image} alt={title} className={styles.backgroundImage} />
          ) : (
            <div className={styles.placeholderBackground}>
              <span>{title?.charAt(0)}</span>
            </div>
          )}
          <div className={styles.gradientOverlay} />
        </div>

        {/* Content Overlay */}
        <div className={styles.contentOverlay}>

          <div className={styles.header}>
            <div className={styles.topBadges}>
              {inprogress && (
                <span className={styles.statusBadge}>
                  <span className={styles.icon}>🚧</span> In Progress
                </span>
              )}
              {date && (
                <span className={styles.dateBadge}>
                  {new Date(date).getFullYear()}
                </span>
              )}
            </div>
          </div>

          <div className={styles.mainContent}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.tagsRow}>
              {tags?.slice(0, 3).map((tag, i) => (
                <span key={i} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <p className={styles.description}>
              {description}
            </p>

            {links && links.length > 0 && (
              <div className={styles.linksRow}>
                {links.map((l, i) => (

                  <ModernButton 
                  label ={l.label || "view"}
                  variant="rounded"
                  icon={getIcon(l.icon || "go")}
                           onClick={(e) => handleLinkClick(e, l.to)}

                  />
                  // <button
                  //   key={i}
                  //   className={styles.linkButton}
                  //   onClick={(e) => handleLinkClick(e, l.to)}
                  // >
                  //   {l.label || "View Project"} <span className={styles.arrow}>→</span>
                  // </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};