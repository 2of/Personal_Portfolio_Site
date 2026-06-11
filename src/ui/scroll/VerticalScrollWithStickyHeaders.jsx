import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./styles/VerticallScrollContainer.module.scss";
import ProgressBar from "../standardControls/ProgressBar.jsx";
import { useScreenSize } from "../../contexts/ScreenSizeContext.jsx";
import { baseTheme } from "../../style/Theme.jsx";
import GradientBG from "../bg/GradientBG.jsx";
import { useAppTheme } from "../../contexts/ThemeContext.jsx";
import { useNav } from "../../contexts/NavContext.jsx";

export const Section = ({
  Header,
  children,
  sticky,
  narrow,
  color = "",
  index,
  isFirst,
  animateIn,
  collapsed = false,
  clickHeaderToCollapse = true
}) => {
  console.log("RENDER THE SCROLLER VIEW");
  const { getColor } = useAppTheme();
  const screenSize = useScreenSize();
  
  const [collapseSection, setCollapse] = useState(collapsed);


  useEffect(() => { 
    setCollapse(collapsed);
  }, [collapsed]); 

  const handleCollapseClick = () => { 
    if (clickHeaderToCollapse) {
      setCollapse(prev => !prev);
    }
  };

  const headerClass = clsx(styles.sectionHeaderContainer, {
    [styles.stickyHeader]: sticky,
    [styles.narrow]: narrow,
    [styles.CanCollapse]: clickHeaderToCollapse 
  });

  const contentClass = clsx(styles.sectionContent, {
    [styles.narrow]: narrow,
    [screenSize === "sm"]: "mobile"
  });

  const displaycolor = () => {
    if (color) {
      if (color === "bg") return "";
      if (color === "l2") return getColor("--bg-l2");
      if (color === "l1") return getColor("--bg-l1");
      if (color === "l3") return getColor("--bg-l3");
      if (color === "dark") return baseTheme["--darkbg"];
      if (color === "accent") return 2;
    }
    return color;
  };

  return (
    <section
      className={`${styles.outermostSection} ${isFirst && styles.growFirst} ${screenSize !== "sm" && styles.desktop}`}
      style={{ background: displaycolor() }}
    >
      {displaycolor() === "gradient" && (
        <div className={styles.sectionGradContainer}>
          <GradientBG/>
        </div>
      )}

      {displaycolor() === "particles" && (
        <div className={styles.sectionGradContainer}>
          <Particles />
        </div>
      )}

      <div className={styles.sectionContainer}>
        {Header && (
          <div className={headerClass} onClick={handleCollapseClick}>
            <div className={`${styles.headerContentContainer} ${screenSize === "sm" && styles.mobile}`}>
              <Header />
            </div>
          </div>
        )}

        <div className={`${styles.collapsibleWrapper} ${collapseSection ? styles.collapsed : ""}`}>
          <div className={contentClass}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ScrollableVerticalView = ({
  children,
  trackVelocity = true,
  trackScrollPercent,
  staggerStart = false,
  alignCenter = false,
  animateIn = false,
  debug = false,
  updateScrollPercentExt = null,
  updateScrollPixAmountExt = null,
  displayTracker = false
}) => {
  const scrollRef = useRef(null);
  const [normalizedVelocity, setNormalizedVelocity] = useState(0);
  const [direction, setDirection] = useState("None");
  const [scrollPercent, setScrollPercent] = useState(0);
  const screenSize = useScreenSize();
  const MAX_SCROLL_VELOCITY = 3000;

  const { setNavStuckToTop } = useNav();

  useEffect(() => { 
     setNavStuckToTop(false);  
  }, [setNavStuckToTop]);

  useEffect(() => {
    if ((!trackVelocity && !trackScrollPercent) || (!trackScrollPercent && !debug)) return;

    let lastScrollTop = 0;
    let lastTime = performance.now();

    const handleScroll = () => {
      if (!scrollRef.current) return;

      const el = scrollRef.current;
      const scrollTop = el.scrollTop;
      const now = performance.now();
      const deltaY = scrollTop - lastScrollTop;
      const deltaTime = now - lastTime || 1;

      if (trackVelocity && debug) {
        const rawVelocity = (deltaY / deltaTime) * 1000;
        const absVelocity = Math.abs(rawVelocity);
        const clamped = Math.min(absVelocity / MAX_SCROLL_VELOCITY, 1);

        setNormalizedVelocity(clamped.toFixed(2));
        setDirection(deltaY > 0 ? "Down" : deltaY < 0 ? "Up" : "None");
        lastScrollTop = scrollTop;
        lastTime = now;
      }

      if (trackScrollPercent) {
        const scrollHeight = el.scrollHeight - el.clientHeight;
        const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        if (updateScrollPercentExt) {
          updateScrollPercentExt(percent);
        }

        if (percent > 0.1) {
          setNavStuckToTop(true);  
        } else  {
          setNavStuckToTop(false);
        }

        if (updateScrollPixAmountExt) {
          updateScrollPixAmountExt(scrollTop);
        }
        setScrollPercent(Math.min(Math.max(percent, 0), 100).toFixed(1));
      }
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);

    return () => el?.removeEventListener("scroll", handleScroll);
  }, [trackVelocity, trackScrollPercent, debug, updateScrollPercentExt, updateScrollPixAmountExt, setNavStuckToTop]);

  const containerClass = clsx(
    styles.scrollContainer,
    screenSize === "sm" && styles.padBottomForMobileFriendliness,
    trackVelocity ? styles.scrollContainerVelocity : styles.scrollContainerBounce,
    screenSize !== "sm" && styles.paddedforNavBarDesktop,
    alignCenter && styles.alignCenter,
  );

  const enhancedChildren = React.useMemo(() => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      const originalSticky = child.props.sticky;

      const isSection = child.type?.name === "Section";
      return isSection
        ? React.cloneElement(child, {
          sticky: originalSticky,
          narrow: child.props.narrow,
          index,
          isFirst: index === 0,
          animateIn: animateIn
        })
        : child;
    });
  }, [children, animateIn]);

  return (
    <div ref={scrollRef} className={containerClass}>
      {displayTracker && (
        <div className={styles.progressBarOverlay}>
          <ProgressBar
            lowerBound={0}
            upperBound={100}
            style={"marker"}
            val={scrollPercent}
            mappedtoinput
          />
        </div>
      )}
      <div
        className={clsx(
          styles.contentColumn,
          screenSize !== "sm" && styles.desktop,
          alignCenter && styles.alignCenter,
        )}
      >
        {staggerStart && <div className={styles.staggerSpacer} />}
        <div className={styles.chunk}>
          {enhancedChildren}
          <div className={styles.bottomSpacer} />
        </div>
        <div className={styles.bottomSpacer} />
      </div>
    </div>
  );
};