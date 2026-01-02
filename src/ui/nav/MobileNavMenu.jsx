import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "../../routes";
import s from "./styles/MobileNavMenu.module.scss";
import { useNavigateTo } from "../../hooks/useNavigate";
import { useNavStack } from "../../contexts/NavigationButtonsStack";
import StandardGrid from "../grid/StandardGrid";
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";

// Memoized MobileNavMenu to prevent re-renders unless necessary
const MobileNavMenu = React.memo(({ direction }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const gotoURL = useNavigateTo();
  const { ExitMobileNav, MobileNavIsOpen } = useNavStack();
  
  // Refs to track state without causing re-renders
  const isNavigatingRef = useRef(false);
  const previousLocationRef = useRef(location.pathname);
  const gotoURLRef = useRef(gotoURL);
  const exitNavRef = useRef(ExitMobileNav);
  const animationTimeoutRef = useRef(null);

  // Keep refs updated
  useEffect(() => {
    gotoURLRef.current = gotoURL;
    exitNavRef.current = ExitMobileNav;
  }, [gotoURL, ExitMobileNav]);

  // Initialize previous location
  useEffect(() => {
    previousLocationRef.current = location.pathname;
  }, []);

  // Handle menu visibility based on context state
  useEffect(() => {
    if (MobileNavIsOpen) {
      // Menu should be open
      setIsVisible(true);
      isNavigatingRef.current = false;
      
      // Clear any pending animations
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      
      // Trigger animation in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    } else if (!isNavigatingRef.current) {
      // Menu should close (and we're not navigating)
      setIsAnimatingIn(false);
      
      // Unmount after animation
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        animationTimeoutRef.current = null;
      }, 300);
    }
    // If MobileNavIsOpen is false but we're navigating, keep menu visible
  }, [MobileNavIsOpen]);

  // Handle location changes (navigation occurred)
  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = previousLocationRef.current;
    
    // Only process if location actually changed
    if (currentPath !== previousPath && isNavigatingRef.current) {
      // We initiated this navigation - now animate out
      previousLocationRef.current = currentPath;
      
      // Ensure menu stays visible during animation
      setIsVisible(true);
      
      // Start fade out animation (remove fadeIn class to trigger CSS transition)
      // Use a small delay to ensure navigation is visible first
      const startAnimationTimer = setTimeout(() => {
        setIsAnimatingIn(false);
      }, 10);
      
      // Close context after animation starts (so menu stays visible)
      const closeContextTimer = setTimeout(() => {
        exitNavRef.current();
      }, 50);
      
      // Unmount after animation completes (300ms for transition + small buffer)
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        isNavigatingRef.current = false;
        animationTimeoutRef.current = null;
      }, 350); // Slightly longer than transition to ensure it completes
      
      return () => {
        clearTimeout(startAnimationTimer);
        clearTimeout(closeContextTimer);
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
      };
    } else if (currentPath !== previousPath) {
      // Location changed but we didn't initiate it - just update ref
      previousLocationRef.current = currentPath;
    }
  }, [location.pathname]);

  // Memoized click handler
  const handleClick = useCallback((route) => {
    // Mark that we're navigating
    isNavigatingRef.current = true;
    
    // Navigate immediately - location change will trigger exit animation
    gotoURLRef.current(route.path);
  }, []);

  // Memoize route buttons to prevent re-renders
  const routeButtons = useMemo(() => {
    return routes.map((route, i) => (
      <StandardGrid.Item key={route.path || i}>
        <ModernButton
          label={route.title}
          icon={getIcon(route.icon)}
          variant="featured"
          callback={() => handleClick(route)}
        />
      </StandardGrid.Item>
    ));
  }, [handleClick]);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  return ( 
    <div 
      className={`${s.MobileNavMenuContainer} ${isAnimatingIn ? s.fadeIn : ''}`}
    > 
      <div className={s.content}>
        <StandardGrid template="nav"> 
          {routeButtons}
        </StandardGrid>
      </div>

      <div className={s.footer}>
        <div className={s.socialLinks}>
          <ModernButton
            icon={getIcon("github")}
            variant="mobileNavWithLabel"
            callback={() => {}}
          />
          <ModernButton
            icon={getIcon("linkedin")}
            variant="mobileNavWithLabel"
            callback={() => {}}
          />
        </div>
        
        <div className={s.divider} />
        
        <div className={s.themeToggle}>
          <ModernButton
            label="Toggle Theme"
            icon={getIcon("sun")}
            variant="mobileNavWithLabel"
            callback={() => {}}
          />
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
