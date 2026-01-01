import React from "react";
import styles from "./styles/PROJ_LargeCard.module.scss";
import defaultImg from "../../../assets/default.jpeg";
import { navigateTo } from "../../../tools/navigator";
import { ModernButton } from "../../standardControls/button/Button";
import { useNavigate } from "react-router-dom";


import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { BlackAndWhiteHoverReveal } from "../../images/BlackAndWhiteHoverReveal";

export const PROJCARD_Large = ({
  title, description, date, tags, links, link, image
}) => {
  const gotoURL = useNavigateTo();


  return (
    <div className={`${styles.cardLarge} StandardBoxInline`}>

      <div className={styles.ImgContainer}>

        <BlackAndWhiteHoverReveal img={image || defaultImg} filterType="grayscale"/>
        
      </div>

      <div className={styles.ContentWrapper}>
        <div className={styles.Header}>
          <h3 className={styles.Title}>{title}</h3>
          <span className={styles.date}>{date}</span>
        </div>

        <p className={styles.Description}>{description}</p>

        <div className={styles.Footer}>
          <div className={`${styles.fff} tagContainer`}>
            {tags?.map((tag, i) => (
              <span key={i} className={`${styles.tag} tag `}>{tag}</span>
            ))}
          </div>

          <div className={styles.linkGroup}>
            {links?.map((l, i) => (
              <ModernButton
                key={i}
                variant="dev_block"
                icon={getIcon(l.icon || 'right')}
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
