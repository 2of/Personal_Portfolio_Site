import React from "react";
import styles from "./styles/PROJ_HeroCard.module.scss";
import defaultImg from "../../../assets/default.jpeg";
import { ModernButton } from "../../standardControls/button/Button";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";

export const PROJCARD_HeroCard = ({
  title,
  description,
  date,
  tags,
  links,
  image
}) => {
  const gotoURL = useNavigateTo();

  return (
    <div className={`${styles.heroCard} StandardBoxL2`}>
      <div className={styles.ImageStage}>
        <img
          src={image || defaultImg}
          alt={title}
          className={styles.image}
        />

        <div className={styles.ImageOverlay} />

        <div className={styles.HeroHeader}>
          <h2 className={styles.Title}>{title}</h2>
          <span className={styles.date}>{date}</span>
        </div>
      </div>

      <div className={styles.Content}>
        <p className={styles.Description}>{description}</p>

        <div className={styles.Footer}>
          <div className="tagContainer">
            {tags?.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>

          <div className={styles.linkGroup}>
            {links?.map((l, i) => (
              <ModernButton
                key={i}
                variant="code_small"
                icon={getIcon(l.icon || "right")}
                label={l.label}
                callback={() => gotoURL(l.to)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
