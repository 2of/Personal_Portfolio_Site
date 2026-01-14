import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/StandardTab.module.scss";

export const StandardTab = ({
  tabs = {},
  tabPosition = "bottom",
  variant = "mobile", // default variant
}) => {
  const tabKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const tabRefs = useRef({});

  const ActiveComponent = tabs[activeTab];

  // Determine which variant-specific button class to use
  const variantButtonClass = `${variant}-tabButton`;

  return (
    <div
      className={`${styles.StandardTabContainer} ${
        tabPosition === "bottom" ? styles.bottom : ""
      } ${styles[variant]}`}
    >
  

      <div className={styles.tabContent}>
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
      
          <div className={styles.tabList}>
        {tabKeys.map((title) => (
          <button
            key={title}
            ref={(el) => (tabRefs.current[title] = el)}
            className={`${styles.tabButton} ${styles[variantButtonClass]} ${
              activeTab === title ? styles.active : ""
            }`}
            data-label={title} // for glitch-outline flicker
            onClick={() => setActiveTab(title)}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};
