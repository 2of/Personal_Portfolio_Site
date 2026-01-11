import React, { useState } from "react";
import { useDarkMode } from "../../../contexts/DarkMode";
import s from "./RoadTransition.module.scss";




export const RoadTransition = () => { 
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [animationState, setAnimationState] = useState("idle");
  const [sceneMode, setSceneMode] = useState(darkMode ? "night" : "day");

  const handleTransition = () => {
    // Phase 1: Animate in (1.5s)
    setAnimationState("entering");
    
    // Phase 2: Toggle colors (at 1.5s, transition for 1.5s)
    setTimeout(() => {
      setAnimationState("stable");
      setSceneMode(darkMode ? "day" : "night"); // Toggle to opposite
      toggleDarkMode();
    }, 1500);
    
    // Phase 3: Animate out (at 3s, exit for 1.5s)
    setTimeout(() => {
      setAnimationState("exiting");
    }, 3000);
    
    // Phase 4: Reset (at 4.5s)
    setTimeout(() => {
      setAnimationState("idle");
    }, 4500);
  };

  if (animationState === "idle") {
    return (
      <button onClick={handleTransition} className={s.triggerButton}>
        Toggle Dark Mode (with animation!)
      </button>
    );
  }

  return (
    <div className={`${s.transitionOverlay} ${s[animationState]}`}>
      {/* Sky */}
      <div className={`${s.sky} ${s[`sky-${sceneMode}`]}`}>
        {/* Clouds */}
        <div className={`${s.cloud} ${s.cloud1} ${s[`cloud-${sceneMode}`]}`} />
        <div className={`${s.cloud} ${s.cloud2} ${s[`cloud-${sceneMode}`]}`} />
        <div className={`${s.cloud} ${s.cloud3} ${s[`cloud-${sceneMode}`]}`} />
        
        {/* Stars (only visible at night) */}
        {sceneMode === "night" && (
          <div className={s.stars}>
            {[...Array(50)].map((_, i) => (
              <div 
                key={i} 
                className={s.star}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Sun/Moon */}
        <div className={`${s.celestial} ${s[`celestial-${sceneMode}`]}`} />
      </div>

      {/* Hills */}
      <div className={s.hillsContainer}>
        <div className={`${s.hill} ${s.hillBack} ${s[`hill-${sceneMode}`]}`} />
        <div className={`${s.hill} ${s.hillMiddle} ${s[`hill-${sceneMode}`]}`} />
        <div className={`${s.hill} ${s.hillFront} ${s[`hill-${sceneMode}`]}`} />
      </div>

      {/* Road */}
      <div className={`${s.road} ${s[`road-${sceneMode}`]}`}>
        <div className={s.roadMarkings}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={s.roadLine} />
          ))}
        </div>
        <div className={s.roadEdgeLeft} />
        <div className={s.roadEdgeRight} />
      </div>
    </div>
  );
};