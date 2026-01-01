import React from "react";
import styles from "./styles/SkillCard.module.scss";
import getIcon from "../../tools/iconRef";



const SkillCard = ({ chunk }) => {
  return (
    <div className={`${styles.skillSection} StandardBoxL2`}>
      <div className={styles.windowHeader}>
        {/* <div className={styles.trafficLights}>
          <span className={styles.red}></span>
          <span className={styles.yellow}></span>
          <span className={styles.green}></span>
        </div> */}
        <span className={styles.headerTitle}>
          {chunk.icon && getIcon(chunk.icon)} {chunk.header}
        </span>
      </div>
      <div className={styles.windowContent}>
        <div className={styles.skillsRow}>
          {chunk.skills.map((skill, j) => (
            <div key={j} className={styles.skillItem}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export { SkillCard };
