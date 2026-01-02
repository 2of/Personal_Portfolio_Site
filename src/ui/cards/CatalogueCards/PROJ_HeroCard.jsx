import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/PROJ_HeroCard.module.scss";
import defaultImg from "../../../assets/default.jpeg";
import { navigateTo } from "../../../tools/navigator";
import { ModernButton } from "../../standardControls/button/Button";
import { useNavigate } from "react-router-dom";


import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { BlackAndWhiteHoverReveal } from "../../images/BlackAndWhiteHoverReveal";

export const PROJCARD_HeroCard = ({
  title, description, date, tags, links, link, image, inprogress
}) => {
  const gotoURL = useNavigateTo();
  const [showButtons, setShowButtons] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedImagesRef = useRef(new Set());

  const handleImageLoad = (imageId) => {
    loadedImagesRef.current.add(imageId);
    if (loadedImagesRef.current.size === 2) {
      requestAnimationFrame(() => {
        setImagesLoaded(true);
      });
    }
  };

  useEffect(() => {
    if (!image) {
      setImagesLoaded(true);
      return;
    }
    loadedImagesRef.current.clear();
    setImagesLoaded(false);
  }, [image]);

  return (
    <div 
      className={`${styles.heroCard} StandardBoxInline ${imagesLoaded ? styles.imagesReady : styles.imagesLoading}`}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {inprogress && (
        <div className={styles.badge}>
          {getIcon("smile")}
          <span>In Early Progress</span>
        </div>
      )}

      {image && (
        <div className={styles.ImgContainer}>
          <img
            src={image}
            alt={title}
            className={styles.image}
            loading="eager"
            decoding="async"
            onLoad={() => handleImageLoad('base')}
            onError={() => handleImageLoad('base')}
          />
          <img
            src={image}
            alt=""
            className={styles.imageCover}
            loading="eager"
            decoding="async"
            aria-hidden="true"
            onLoad={() => handleImageLoad('cover')}
            onError={() => handleImageLoad('cover')}
          />
        </div>
      )}


      <div className={styles.ContentWrapper}>
        <div className={styles.Header}>
          <h2 className={styles.Title}>{title}</h2>
          <span className={styles.date}>{date}</span>
        </div>

        <p className={styles.Description}>{description}</p>
 <div className={`${styles.fff} tagContainer`}>
            {tags?.map((tag, i) => (
              <span key={i} className={` tag `}>{tag}</span>
            ))}
          </div>

         

          <div className={`${styles.linkGroup} ${!showButtons ? styles.hideButtons : styles.showButtons}`}>
            {links?.map((l, i) => (
              <ModernButton
                key={i}
                variant="dev"
                icon={getIcon(l.icon || 'right')}
                label={l.label}
                callback={() => gotoURL(l.to)}
              />
            ))}


        </div>
      </div>
    </div>
  );
};
