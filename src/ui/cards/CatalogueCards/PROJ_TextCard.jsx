import React, { useState } from "react";
import styles from "./styles/PROJ_TextCard.module.scss";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";

export const PROJCARD_Text = ({
  title,
  description,
  date,
  tags,
  links,
  link,
  image,
  inprogress,
  variant = "large",
  imageLocation = "top", // ✨ NEW: top, left, or right
}) => {
  const gotoURL = useNavigateTo();
  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ VARIANT NORMALIZATION
  const resolvedVariant =
    variant === "large" ? "interesting" : variant || "regular";

  const variantClass = styles[resolvedVariant] || styles.regular;

  // ✨ NEW: Image location class
  const imageLocationClass = styles[`image_${imageLocation}`] || styles.image_top;

  const visibleTags = tags.slice(0, 8);
  const hiddenCount = tags.length - 8;

  const handleTitleClick = () => {
    if (links && links.length > 0) {
      gotoURL(links[0].to);
    } else if (link) {
      gotoURL(link);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  // Render image component
  const ImageComponent = image && (
    <div className={styles.ImgContainer}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.imageOverlay} />
    </div>
  );

  // Render content component
  const ContentComponent = (
    <>
      <h3
        className={`${styles.title} ${resolvedVariant === "interesting" ? styles.before : ""}`}
        onClick={handleTitleClick}
      >
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

      <p
        className={`${styles.description} ${isExpanded ? styles.expanded : ""
          }`}
      >
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className={"tagContainer"}>
          {visibleTags.map((tag, i) => (
            <span key={i} className={"tag"}>{tag}</span>
          ))}

          {hiddenCount > 0 && (
            <span className={` tag ${styles.more}`}>
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
              variant="dev_chungus"
              icon={getIcon(l.icon || "right")}
              label={l.label}
              callback={() => gotoURL(l.to)}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <article className={`${styles.textCard} ${variantClass} ${imageLocationClass}`}>
      {imageLocation === "top" && (
        <div className={styles.header}>
          {ImageComponent}
          {ContentComponent}
        </div>
      )}

      {(imageLocation === "left" || imageLocation === "right") && (
        <div className={styles.horizontalLayout}>
          {imageLocation === "left" && ImageComponent}
          <div className={styles.content}>
            {ContentComponent}
          </div>
          {imageLocation === "right" && ImageComponent}
        </div>
      )}
    </article>
  );
};
