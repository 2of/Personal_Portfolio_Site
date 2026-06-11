import React, { useState } from "react";
import styles from "./styles/PROJ_TestBedCard.module.scss";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";

export const PROJCARD_TestBedCard = ({
  title,
  description,
  date,
  tags,
  links,
  link,
  image,
  inprogress,
  imageLocation = "top", // top | left | right
}) => {
  const gotoURL = useNavigateTo();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTitleClick = () => {
    if (links && links.length > 0) {
      gotoURL(links[0].to);
    } else if (link) {
      gotoURL(link);
    } else {
      setIsExpanded((prev) => !prev);
    }
  };

  const visibleTags = tags?.slice(0, 8) ?? [];
  const hiddenCount = (tags?.length ?? 0) - 8;

  // ─── Sub-components ───────────────────────────────────────

  const ImageComponent = image ? (
    <div className={styles.ImgContainer}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.imageOverlay} />
    </div>
  ) : null;

  const ContentComponent = (
    <div className={styles.content}>
      <div className={styles.accentBar} aria-hidden="true" />

      <h3 className={styles.title} onClick={handleTitleClick}>
        {title}
      </h3>

      <div className={styles.meta}>
        {date && <span className={styles.date}>{date}</span>}
        {inprogress && (
          <span className={styles.inProgress}>
            {getIcon("smile")}
            <span>In Progress</span>
          </span>
        )}
      </div>

      <p className={`${styles.description} ${isExpanded ? styles.expanded : ""}`}>
        {description}
      </p>

      {visibleTags.length > 0 && (
        <div className={styles.tagContainer}>
          {visibleTags.map((tag, i) => (
            <span key={i} className={`${styles.tag} MaterialL3 BorderFullInset`}>
              {tag}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className={`${styles.tag} ${styles.tagMore} MaterialL3 BorderFullInset`}>
              +{hiddenCount} more
            </span>
          )}
        </div>
      )}

      {links && links.length > 0 && (
        <div className={styles.actions}>
          {links.map((l, i) => (
            <ModernButton
              key={i}
              variant="nav_Primary"
              icon={getIcon(l.icon || "right")}
              label={l.label}
              callback={() => gotoURL(l.to)}
            />
          ))}
        </div>
      )}
    </div>
  );

  // ─── Layout assembly ──────────────────────────────────────

  const isHorizontal = imageLocation === "left" || imageLocation === "right";

  return (
    <article
      className={[
        styles.textCard,
        "MaterialL2",
        "BorderFull",
        styles[`image_${imageLocation}`] || styles.image_top,
      ].join(" ")}
    >
      {!isHorizontal ? (
        <div className={styles.verticalLayout}>
          {ImageComponent}
          {ContentComponent}
        </div>
      ) : (
        <div className={styles.horizontalLayout}>
          {imageLocation === "left" && ImageComponent}
          {ContentComponent}
          {imageLocation === "right" && ImageComponent}
        </div>
      )}
    </article>
  );
};