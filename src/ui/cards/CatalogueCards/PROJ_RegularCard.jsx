// PROJCARD_Regular.jsx
import React from "react";
import styles from "./styles/PROJ_RegularCard.module.scss";
import defaultImg from "../../../assets/default.jpeg";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";

export const PROJCARD_Regular = ({
  title,
  description,
  date,
  tags,
  links,
  image,
  inprogress,
}) => {
  const gotoURL = useNavigateTo();
  const truncatedTags = tags?.slice(0, 6) ?? [];
  const remaining = (tags?.length ?? 0) - truncatedTags.length;

  return (
    <div className={`${styles.card} MaterialL1`}>

      {image && (
        <div className={styles.imageWrap}>
          <img src={image || defaultImg} alt={title} className={styles.image} />
          {inprogress && (
            <span className={styles.progressBadge}>In Progress</span>
          )}
        </div>
      )}

      <div className={styles.body}>

        <div className={`${styles.meta} MaterialL2`}>
          <span className={styles.date}>{date}</span>
          {inprogress && !image && (
            <span className={styles.progressBadge}>In Progress</span>
          )}
        

        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
</div>
        {truncatedTags.length > 0 && (
          <div className={styles.tags}>
            {truncatedTags.map((tag, i) => (
              <span key={i} className={`${styles.tag} MaterialL2`}>{tag}</span>
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
                variant="nav_Primary"
                key={i}
           
                icon={getIcon("right")}
                label={l.label}
                callback={() => gotoURL(l.to)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};