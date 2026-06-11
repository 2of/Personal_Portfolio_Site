import React from "react";
import { useNavigateTo } from "../../../../hooks/useNavigate";
import { ModernButton } from "../../../standardControls/button/Button";
import getIcon from "../../../../tools/iconRef";

import styles from "./styles/Airline_CompactCard.module.scss";

export const AirlineCardCompact = ({
  title,
  description,
  date,
  tags,
  links,
  inprogress,
  isHighlight = false,
}) => {
  const gotoURL = useNavigateTo();
  
  
  const truncatedTags = tags?.slice(0, 3) ?? [];
  const remaining = (tags?.length ?? 0) - truncatedTags.length;

  return (
    <div 
      className={`
        ${styles.cardFrame} 
        DATASTRIP_CompactContainer 
        ${isHighlight ? "isHighlight" : ""}
      `}
    >

      <div className="DATASTRIP_TopDivider" />

      <div className={styles.layoutWrapper}>
        

        <div className={`${styles.sideDataBar} DATASTRIP_Divider`}>
          <span>{inprogress ? "In Progress" : "Done"}</span>
        </div>

        <div className={`${styles.mainTerminalBody} DATASTRIP_CompactBody`}>
          
          <div className={styles.coreDataSegment}>
            
            {/* Structural high-precision metadata wrapper */}
            <div className="DATASTRIP_MetaHeader" style={{ padding: 0, margin: 0, border: 'none' }}>
              <span>{date}</span>
              {inprogress && (
                <span className="DATASTRIP_Status">In Progress</span>
              )}
            </div>
            
            {/* Title and Multi-line Content Layout Block */}
            <div className={styles.titleGroup}>
              <h5 className="DATASTRIP_Title compact" style={{ fontSize: '0.95rem' }}>
                {title}
              </h5>
              <p className="DATASTRIP_Description compact" style={{ opacity: 0.75, whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {description}
              </p>
            </div>

            {/* Technical Taxonomy Tags Row */}
            {truncatedTags.length > 0 && (
              <div className="DATASTRIP_Tags" style={{ marginTop: '2px' }}>
                {truncatedTags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
                {remaining > 0 && (
                  <span className="tag tagMore">
                    +{remaining}
                  </span>
                )}
              </div>
            )}

          </div>

          {/* Action Hub Panel */}
          {links?.length > 0 && (
            <div className={`${styles.actionHub} DATASTRIP_Links compact`}>
              {links.slice(0, 2).map((l, i) => (
                <ModernButton
                  key={i}
                  variant="code_small"
                  icon={getIcon("right")}
                  label={l.label}
                  callback={() => gotoURL(l.to)}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};