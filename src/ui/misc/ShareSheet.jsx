import React, { useState, useEffect } from "react";
import styles from "./styles/Sharesheet.module.scss";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";

/* ✅ Defined locally */
const socialMediaServices = [
  {
    name: "Twitter",
    icon: "twitter",
    baseUrl: "https://twitter.com/intent/tweet?url=",
    descriptionParam: "&text=",
  },
  {
    name: "Facebook",
    icon: "facebook",
    baseUrl: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    baseUrl: "https://www.linkedin.com/sharing/share-offsite/?url=",
  },
  {
    name: "Email",
    icon: "email",
    baseUrl: "mailto:?body=",
    descriptionParam: "%0A%0A",
  },
];

export const ShareSheet = ({
  url,
  title = "Share something from my website ",
  description: initialDescription = "",
  onClose,
}) => {
  const screenSize = useScreenSize();

  // Helper to safely get window URL
  const getCurrentUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  // 1. Initialize with prop OR window URL
  const [shareUrl, setShareUrl] = useState(url || getCurrentUrl());
  const [description, setDescription] = useState(initialDescription);

  // 2. Update state if the prop changes, otherwise fallback to window URL again
  useEffect(() => {
    setShareUrl(url || getCurrentUrl());
  }, [url]);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleShareClick = (service) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedDescription = encodeURIComponent(description);

    let shareLink = `${service.baseUrl}${encodedUrl}`;

    if (service.descriptionParam && description) {
      shareLink += `${service.descriptionParam}${encodedDescription}`;
    }

    window.open(shareLink, "_blank");
    onClose?.();
  };

  const handleCopyLink = () => {
    const textToCopy = description
      ? `${shareUrl}\n\n${description}`
      : shareUrl;

    navigator.clipboard.writeText(textToCopy);
    alert("Link copied to clipboard!");
    onClose?.();
  };

  return (
    <div
      className={`${styles.dialog} ${
        screenSize === "sm" ? styles.sm : styles.fulldialogue
      }`}
    >
      <h2>{title}</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="share-url">Link to Share:</label>
        <input
          id="share-url"
          type="text"
          value={shareUrl}
          onChange={(e) => setShareUrl(e.target.value)}
          className={styles.urlInput}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="share-description">Description (Optional):</label>
        <textarea
          id="share-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.descriptionInput}
          rows={4}
          placeholder="Add a short description or message..."
        />
      </div>

      <div className={styles.socialIcons}>
        {socialMediaServices.map((service) => (
          <ModernButton
            key={service.name}
            label=""
            variant="dev"
            icon={getIcon(service.icon)}
            callback={() => handleShareClick(service)}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <ModernButton
          label="Clipboard"
          callback={handleCopyLink}
          icon={getIcon("copy")}
          variant="dev"
          tooltip="Clipboard"
        />
      </div>
    </div>
  );
};