import React, { useState } from "react";
import styles from "./styles/StandardTab.module.scss";
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import GlassPushOverlay from "../containers/GlassContainer";
import { BouncyButtonRow } from "../misc/BouncyButtonsRow";

export const StandardTab = ({
  tabs = {},
  tabPosition = "top",
  variant = "outline",
}) => {
  const tabKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [hoveredTab, setHoveredTab] = useState(null);

  const ActiveComponent = tabs[activeTab];


  const isPeeking = hoveredTab && hoveredTab !== activeTab;
  
  return (
    <div
      className={`
        ${styles.StandardTabContainer}
        ${tabPosition === "bottom" ? styles.bottom : ""}
        ${styles[variant]}

      `}
    >
      <div
        className={`
          ${styles.tabContent}
          ${isPeeking ? styles.peekHint : ""}
        `}
      >
        {ActiveComponent && (
          <div key={activeTab} className={styles.tabPanel}>
            <ActiveComponent />
          </div>
        )}
      </div>

{/* 
  <GlassPushOverlay
            showShine={false}> */}
  {/* <button onClick={() => console.log(tabs)}>
    click me 
  </button> */}


    

      <div className={`${styles.tabList}        `}>



        <BouncyButtonRow
        variant="tab"
          buttons={tabKeys.map((title) =>{ 
            const isActive = activeTab === title;

            return ( 
                {
                  label: title, 
                  callback: () => (setActiveTab(title)),
                  isActive: isActive
                }
            )
          }) }


/>
        {/* {tabKeys.map((title) => {
          const isActive = activeTab === title;
          return (


            <ModernButton
            variant="Airline_Secondary"
            icon={getIcon(title)}
            label={title} 
            callback={() => setActiveTab(title)}
            active = {isActive}
            onMouseEnter={() => setHoveredTab(title)}
            onMouseLeave={() => setHoveredTab(null)}
             />
            // <button
            //   key={title}
            //   className={`
            //     ${styles.tabButton}
            //     ${isActive ? styles.active : ""}
            //     ${isActive && variant === "glass" ? "MaterialL2" : "MaterialL2"}
            //     ${hoveredTab === title && !isActive ? styles.hovered : ""}
            //   `}
            //   onClick={() => setActiveTab(title)}
            //   onMouseEnter={() => setHoveredTab(title)}
            //   onMouseLeave={() => setHoveredTab(null)}
            // >
            //   {title}
            // </button>
          );
        })} */}
      </div>

      {/* </GlassPushOverlay> */}
    </div>
  );
};