import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "../../routes";
import s from "./styles/MobileNavMenu.module.scss";
import { useNavigateTo } from "../../hooks/useNavigate";
import { useNavStack } from "../../contexts/NavigationButtonsStack";
import StandardGrid from "../grid/StandardGrid";
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import { DarkModeAnimatedWithCoolDownToastButton } from "../wrappers/DarkModeWrapper";
import { HandWrittenLabel } from "../misc/HandWrittenLabel";

// Memoized MobileNavMenu to prevent re-renders unless necessary
const MobileNavMenu = React.memo(({ direction }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const gotoURL = useNavigateTo();
  const { ExitMobileNav, MobileNavIsOpen } = useNavStack();
  

  const isNavigatingRef = useRef(false);
  const previousLocationRef = useRef(location.pathname);
  const gotoURLRef = useRef(gotoURL);
  const exitNavRef = useRef(ExitMobileNav);
  const animationTimeoutRef = useRef(null);
  const Footer = { 
    titlecc : "Uhh, copyright 2025-26 .. Me?",
    note: "Thanks for visiting..."
  }

  useEffect(() => {
    gotoURLRef.current = gotoURL;
    exitNavRef.current = ExitMobileNav;
  }, [gotoURL, ExitMobileNav]);


  useEffect(() => {
    previousLocationRef.current = location.pathname;
  }, []);


  useEffect(() => {
    if (MobileNavIsOpen) {

      setIsVisible(true);
      isNavigatingRef.current = false;
      
   
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    } else if (!isNavigatingRef.current) {
      setIsAnimatingIn(false);
      

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        animationTimeoutRef.current = null;
      }, 300);
    }
  }, [MobileNavIsOpen]);

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = previousLocationRef.current;
    
    // Only process if location actually changed grre
    if (currentPath !== previousPath && isNavigatingRef.current) {
      previousLocationRef.current = currentPath;
      setIsVisible(true);

      const startAnimationTimer = setTimeout(() => {
        setIsAnimatingIn(false);
      }, 10);
      
      // Close context after animation starts (so menu stays visible and doesnt jank 
      const closeContextTimer = setTimeout(() => {
        exitNavRef.current();
      }, 50);
      

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        isNavigatingRef.current = false;
        animationTimeoutRef.current = null;
      }, 350); // Slight
      
      return () => {
        clearTimeout(startAnimationTimer);
        clearTimeout(closeContextTimer);
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
      };
    } else if (currentPath !== previousPath) {
      // Location changed but we didn't initi
      previousLocationRef.current = currentPath;
    }
  }, [location.pathname]);


  const handleClick = useCallback((route) => {
    // Mark that im navigating
    isNavigatingRef.current = true;

    gotoURLRef.current(route.path);
  }, []);


  const routeButtons = useMemo(() => {
    return routes.filter(x => x.expose_mobile_nav).map((route, i) => (
      <StandardGrid.Item key={route.path || i}>
        <ModernButton
          label={route.title}
          icon={getIcon(route.icon)}
          variant="natural_large_touch_nav_menu"
            active={location.pathname === route.path}
          callback={() => handleClick(route)}
        />
      </StandardGrid.Item>
    ));
  }, [handleClick]);


  if (!isVisible) {
    return null;
  }

  return ( 
    <div 
      className={`${s.MobileNavMenuContainer} ${isAnimatingIn ? s.fadeIn : ''}`}
    > 
      <div className={s.content}>

        {/* <h1>Howdy!</h1> */}
        {/* <h3>I like that you're here</h3> */}
        <HandWrittenLabel text="Go navigate somewhere" rotate={150} variant="curveLeft" />
        <StandardGrid template="nav"> 
          {routeButtons}
        </StandardGrid>
      </div>

      <div className={s.footer}>

                {/* <HandWrittenLabel text="Hire me ? " arrowBefore rotate={150} variant="curveRight" /> */}
        <div className={s.socialLinks}>
          <ModernButton
            icon={getIcon("github")}
            variant="natural_large_touch_nav_menu"
            callback={() => {}}
          />
          <ModernButton
            icon={getIcon("linkedin")}
            variant="natural_large_touch_nav_menu"
            callback={() => {}}
          />
            <ModernButton
            icon={getIcon("about")}
            variant="natural_large_touch_nav_menu"
            callback={() => {}}
          />
        </div>
        {/* <div className={s.divider} /> */}
        
        
        
        <div className={s.themeToggle}>
          {/* <ModernButton
            label="Toggle Theme"
            icon={getIcon("sun")}
            variant="mobileNavWithLabel"
            callback={() => {}}
          /> */}

          <DarkModeAnimatedWithCoolDownToastButton  buttonvariantstr="natural_large_touch_nav_menu" darkstr=".dark" lightstr=".light" />
        </div>

        <div className={s.footer_text}>
          <h4>{Footer.titlecc}</h4>        <h4>{Footer.note}</h4>
        </div>

      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if direction prop changes
  return prevProps.direction === nextProps.direction;
});

MobileNavMenu.displayName = 'MobileNavMenu';

export default MobileNavMenu;
