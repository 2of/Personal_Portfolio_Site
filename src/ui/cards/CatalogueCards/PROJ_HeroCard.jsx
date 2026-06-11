import React from "react";
import styles from "./styles/PROJ_HeroCard.module.scss";
import defaultImg from "../../../assets/default.jpeg";
import { useNavigateTo } from "../../../hooks/useNavigate";
import { ModernButton } from "../../standardControls/button/Button";
import getIcon from "../../../tools/iconRef";

export const PROJCARD_HeroCard = ({
  title, description, date, tags, links, image, inprogress
}) => {
  const gotoURL = useNavigateTo();
  const truncatedTags = tags?.slice(0, 8) ?? [];
  const remaining = (tags?.length ?? 0) - truncatedTags.length;

  return (
    <div className={styles.card}>

      {image && (
        <div className={styles.imageWrap}>
          <img src={image || defaultImg} alt={title} className={styles.image} />
          <div className={styles.imageOverlay} />
          {inprogress && (
            <span className={styles.progressBadge}>In Progress</span>
          )}
        </div>
      )}

      <div className={styles.body}>

        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.date}>{date}</span>
            {inprogress && !image && (
              <span className={styles.progressBadge}>In Progress</span>
            )}
          </div>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <p className={styles.description}>{description}</p>

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
                  icon={getIcon(l.icon || "right")}
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