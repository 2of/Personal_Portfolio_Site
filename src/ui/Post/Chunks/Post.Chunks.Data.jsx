import React from "react";
import styles from "./styles/PostChunkData.module.scss"

import ProgressBar from "../../standardControls/ProgressBar";
import Divider from "../../misc/Divider";


export const Post_Chunk_Data = ({
  title,
  datapoints = [],
  className,
//   styles
}) => {


  return (
    <div className={className}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}

      {datapoints.map((pointGroup, i) => {
        const barType = pointGroup.type;

        // Render each group block
        return (

            <>
            

          <div key={i} className={styles.block}>
            {pointGroup.overallLabel && (
              <h4 className={styles.overallLabel}>{pointGroup.overallLabel}</h4>
            )}


<div className={styles.datacontent}>
            {barType === "linear_bar" && (
              <>
                {pointGroup.data.map((point, j) => {
                  const commonProps = {
                    val: point.value,
                    lowerBound: point.lowerBound,
                    upperBound: point.upperBound,
                    showVal: true,
                    showBounds: true,
                  };
                  return (
                    <div className={styles.linearBarRow} key={j}>

                      <div className={styles.BarContainer}>
                        <ProgressBar {...commonProps} label={point.label} />
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {barType === "radial" && (
              <div className={styles.radialbar}>
                {pointGroup.data.map((point, j) => {
                  const commonProps = {
                    val: point.value,
                    lowerBound: point.lowerBound,
                    upperBound: point.upperBound,
                    showVal: true,
                    showBounds: true,
                  };
                  return (
                    <div className={styles.RadialContainerCell} key={j}>
                      <ProgressBar style="round" {...commonProps} label={point.label} />
                      {/* <span className={styles.pointLabel}>{point.label}</span> */}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Fallback for unknown type */}
            {!["linear_bar", "radial"].includes(barType) && (
              <h1 key={`unknown-${i}`}>Unknown type: {barType}</h1>
            )}

            </div>
          </div>
          {/* <Divider/> */}
                      </>
        );
      })}
    </div>
    
  );
};
