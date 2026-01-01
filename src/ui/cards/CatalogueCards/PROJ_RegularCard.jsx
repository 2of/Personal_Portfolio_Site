import React from "react";
import styles from "./styles/PROJ_RegularCard.module.scss";
import defaultImg from "../../../assets/default.jpeg";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";
import { BlackAndWhiteHoverReveal } from "../../images/BlackAndWhiteHoverReveal";

export const PROJCARD_Regular = ({
  title,
  description,
  date,
  tags,
  links,
  link,
  image
}) => {
  const gotoURL = useNavigateTo();

  return (
   <div className={`${styles.cardRegular} StandardBoxL2`}>
  <div className={styles.ImgContainer}>
    {/* Base color image */}
    <BlackAndWhiteHoverReveal img={image || defaultImg}/>

    {/* Black & white overlay */}
    <img
      src={image || defaultImg}
      alt={title}
      className={`${styles.image} ${styles.bw}`}
    />
  </div>

  <div className={styles.ContentWrapper}>
    <div className={styles.Header}>
      <h4 className={styles.Title}>{title}</h4>
      <span className={styles.date}>{date}</span>
    </div>

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
            variant="dev_block"
            icon={getIcon("right")}
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
