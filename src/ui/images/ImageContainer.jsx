import React, { useState } from "react";

import clsx from "clsx";
import styles from "./styles/ImageContainer.module.scss"


export const ImageContainer = ({
  src,
  alt,
  title,
  statusText,
  isCompact = false,
  className
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const containerRole = title || statusText ? "figure" : "presentation";

  return (
    <div 
      role={containerRole}
      aria-label={title || statusText ? `${title || "Cargo asset"} - ${statusText || ""}` : undefined}
      className={clsx(
        styles.DATASTRIP_ImageWrap, 
        {
          [styles.compact]: isCompact,
          [styles.loading]: !isLoaded && !hasError,
          [styles.error]: hasError
        },
        className
      )}
    >

      {hasError ? (
        <div className={styles.imageFallbackState} aria-hidden="true">
          <span>SRC_ERR // 404</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || `Cargo Manifest Item: ${title || "No data description provided"}`}
          title={title || undefined}
          loading="lazy"
          className={styles.image}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}


      {statusText && !hasError && (
        <span className={styles.DATASTRIP_Status} aria-hidden="true">
          {statusText}
        </span>
      )}
    </div>
  );
};
