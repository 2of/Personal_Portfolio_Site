import React from "react";
import styles from "./styles/SmallCardCareer.module.scss";
import { useModal } from "../../contexts/ModalContext";
import { BasicTile } from "./ExpandOnHoverCardCareerTile";

export const SmallCareerTileWithModal = ({
  position = "",
  company = "Tech Innovators Inc.",
  duration = "Jan 2021 - Present",
  location = "Remote",
  doing = [],
  techStack = [],
  icon = null,
  blur = true,
}) => {
  const { showModal } = useModal();

  const handleTap = () => {
    showModal({
      size: "medium",
      title: position,
      content: (
        <BasicTile
          position={position}
          company={company}
          duration={duration}
          location={location}
          doing={doing}
          techStack={techStack}
          icon={icon}
        />
      ),
    });
  };

  return (
    <div
      className={[
        styles.tile,
        styles.tapTile, 
        blur ? styles.blur : "",
        "StandardBoxL3",
      ].join(" ")}
      onClick={handleTap}
      role="button"
      tabIndex={0}
    >
      {/* <div className={styles.content}> */}
        <div className={styles.textContent}>
          <div className={styles.titleRow}>
            <h4 className={styles.position}>{position}</h4>
     

          <div className={styles.meta}>
            <span className={styles.company}>{company}</span>
            {location && (
              <>
                <span className={styles.dot}>•</span>
                <span className={styles.location}>{location}</span>
              </>
            )}

                 </div>
          </div>

          <span className={styles.duration}>{duration}</span>
        {/* </div> */}
      </div>
    </div>
  );
};

// export default SmallCareerTileWithModal;
