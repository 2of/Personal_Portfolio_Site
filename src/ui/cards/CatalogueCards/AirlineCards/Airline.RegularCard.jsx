import React from "react";
import defaultImg from "../../../../assets/default.jpeg";
import { useNavigateTo } from "../../../../hooks/useNavigate";
import { ModernButton } from "../../../standardControls/button/Button";
import getIcon from "../../../../tools/iconRef";

import styles from "./styles/Airline_RegiuarCard.module.scss";

export const AirlineCardRegular = ({
  title,
  description,
  date,
  tags,
  links,
  image,
  inprogress,
  isHighlight = false,
  imagePosition = "top", // "side" or "top"
}) => {
  const gotoURL = useNavigateTo();
  
  const truncatedTags = tags?.slice(0, 6) ?? [];
  const remaining = (tags?.length ?? 0) - truncatedTags.length;

  // Compute dynamic layout modifiers based on positioning prop
  const isTop = imagePosition === "top";
  const layoutClass = isTop ? styles.layoutWrapperTop : styles.layoutWrapperSide;
  const imageClass = isTop ? styles.imagePanelTop : styles.imagePanelSide;

  return (
    <div 
      className={`
        ${styles.cardFrame} 
        DATASTRIP_Container
        ${isHighlight ? "isHighlight" : ""}
      `}
    >
      <div className={layoutClass}>
        
        {/* Media Showpiece Panel */}
        {image && (
          <div className={`${imageClass} DATASTRIP_ImageWrap`}>
            <img src={image || defaultImg} alt={title} className="image" />
            {inprogress && (
              <span className="DATASTRIP_Status">In Progress</span>
            )}
          </div>
        )}

        {/* Decorative Technical Divider Strip (Flex axis flips via CSS matches) */}
        <div className="DATASTRIP_Divider" />

        {/* High-Precision Content Workspace Pane */}
        <div className={`${styles.mainContentPane} DATASTRIP_TerminalBody`}>
          
          {/* Metadata Header line */}
          <div className="DATASTRIP_MetaHeader">
            <span>{date}</span>
            {inprogress && !image && (
              <span className="DATASTRIP_Status">In Progress</span>
            )}
          </div>

          {/* Typography Stack */}
          <h4 className="DATASTRIP_Title">{title}</h4>
          <p className={`${styles.descriptionBox} DATASTRIP_Description`}>
            {description}
          </p>

          <div className={styles.spacer}/>

          {/* Action Hub & Tag Alignment Matrix */}
          <div className={`${styles.stack} DATASTRIP_Footer`}>
            
            {truncatedTags.length > 0 && (
              <div className="DATASTRIP_Tags">
                {truncatedTags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
                {remaining > 0 && (
                  <span className="tag tagMore">+{remaining}</span>
                )}
              </div>
            )}

            {links?.length > 0 && (
              <div className={`${styles.buttonCluster} DATASTRIP_Links`}>
                {links.map((l, i) => (
                  <ModernButton
                    key={i}
                    variant={i === 0 ?  "Airline_Primary" : "Airline_Secondary"}
                    // icon={getIcon("right")}
                    label={l.label}
                    callback={() => gotoURL(l.to)}
                  />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};