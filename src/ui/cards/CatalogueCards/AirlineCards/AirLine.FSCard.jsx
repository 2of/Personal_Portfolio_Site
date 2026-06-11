import React, { useState } from "react";
import defaultImg from "../../../../assets/default.jpeg";
import { useNavigateTo } from "../../../../hooks/useNavigate";
import { ModernButton } from "../../../standardControls/button/Button";

import styles from "./styles/Airline_FullscreenCard.module.scss";

export const AirlineCardFullscreen = ({
  title,
  description,
  date,
  tags,
  links,
  image,
  inprogress,
  isHighlight = false,
  percentvisible,
}) => {
  const gotoURL = useNavigateTo();
  const [isExpanded, setIsExpanded] = useState(false);

  // Smooth scroll parallax for the overlay content
  const isVisible = percentvisible !== undefined ? percentvisible : 1;
  const overlayStyle = {
    opacity: isVisible,
    transform: `translateY(${(1 - isVisible) * 40}px)`,
  };

  const truncatedTags = tags?.slice(0, 5) ?? [];
  const remaining = (tags?.length ?? 0) - truncatedTags.length;

  // Split links for layout: First is full-width, rest form a row below
  const firstLink = links?.[0];
  const secondaryLinks = links?.slice(1) ?? [];

  return (
    <div className={`${styles.fullscreenFrame} ${isHighlight ? styles.isHighlight : ""}`}>
      
      {/* 1. Seamless Cinematic Backdrop */}
      <div className={styles.imageScreenNode}>
        <img
          src={image || defaultImg}
          alt={title}
          className={styles.image}
        />
        <div className={styles.imageOverlay} />
      </div>

      {/* 2. Borderless Bottom-Anchored Content Zone */}
      <div 
        className={`${styles.cinematicOverlay} ${isExpanded ? styles.expanded : ""}`}
        style={overlayStyle}
      >
        <div className={styles.contentWorkspace} onClick={() => setIsExpanded(!isExpanded)}>
          
          <div className={styles.microMetadata}>
            <span>{date}</span>
            {inprogress && (
              <span className={styles.liveIndicator}>
                <span className={styles.livePulse} />
                IN PROGRESS
              </span>
            )}
          </div>
          
          <h4 className={styles.title}>{title}</h4>
          
          {truncatedTags.length > 0 && (
            <div className={styles.tagsContainer}>
              {truncatedTags.map((tag, i) => (
                <span key={i} className={styles.tagBadge}>
                  {tag}
                </span>
              ))}
              {remaining > 0 && (
                <span className={`${styles.tagBadge} ${styles.tagMore}`}>
                  +{remaining}
                </span>
              )}
            </div>
          )}

          <p className={styles.description}>{description}</p>
        </div>

        {/* 3. Button Layout (Full width primary, row for rest) */}
        <div className={styles.actionFooter}>
          {firstLink && (
            <div className={styles.primaryButtonWrapper}>
              <ModernButton
                variant="Airline_Primary"
                label={firstLink.label}
                callback={() => gotoURL(firstLink.to)}
              />
            </div>
          )}
          
          {secondaryLinks.length > 0 && (
            <div className={styles.secondaryButtonRow}>
              {secondaryLinks.map((l, i) => (
                <div key={i} className={styles.buttonCell}>
                  <ModernButton
                    variant="Airline_Secondary"
                    label={l.label}
                    callback={() => gotoURL(l.to)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};