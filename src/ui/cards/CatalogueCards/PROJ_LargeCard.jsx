import React from "react";
import styles from "./styles/PROJ_LargeCard.module.scss";
import defaultImg from "../../../assets/default.jpeg";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";
import { BlackAndWhiteHoverReveal } from "../../images/BlackAndWhiteHoverReveal";

export const PROJCARD_Large = ({
  title,
  description,
  date,
  tags,
  links,
  link,
  image,
  inprogress
}) => {
  const gotoURL = useNavigateTo();

  return (
   <div className={`${styles.CardLarge} StandardBoxL2`}>

       {image && (
 
         <div className={styles.ImgContainer}>
 
           {/* <BlackAndWhiteHoverReveal img={image || defaultImg} filterType="grayscale"/> */}
           <img
             src={image}
             alt={title}
             className={styles.image}
           />
 
 
           <img
             src={image}
             alt={title}
             className={styles.imageCover}
           />
         </div>
 
 
       )}

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
