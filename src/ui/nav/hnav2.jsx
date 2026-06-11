import React, { useState, useEffect, useRef } from "react";
import s from "./styles/hnav2.module.scss";
import { useLocation } from "react-router-dom";
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import { getLink } from "../../helpers/GetLink";
import { Logo } from "../misc/Logo";
import { useModal } from "../../contexts/ModalContext";
import { ShareSheet } from "../misc/ShareSheet";
import { HoverAndSoWeExpandToAnotherComponent } from "../containers/HoverAndSoWeExpandToAnotherComponent";
import GlassPushOverlay from "../containers/GlassContainer";
import { useNav } from "../../contexts/NavContext";
import { usePageTransition } from "../../contexts/PageTransition";
import { useDarkMode } from "../../contexts/DarkMode";
import { routes } from "../../routes";
import { DarkModeAnimatedWithCoolDownToastButton } from "../wrappers/DarkModeWrapper";

export const Hnav2 = () => {
  const { startTransition } = usePageTransition();
  const location = useLocation();
  const { navStuckToTop } = useNav();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { showModal } = useModal();
  
  const [isAnimating, setIsAnimating] = useState(false);
  const prevStuckRef = useRef(navStuckToTop);

  useEffect(() => {
    if (prevStuckRef.current !== navStuckToTop) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 700);
      prevStuckRef.current = navStuckToTop;
      return () => clearTimeout(timer);
    }
  }, [navStuckToTop]);

  const navStateClass = !navStuckToTop ? s.fullwidth : s.float;
  const desktopRoutes = routes.filter((x) => x.expose_desktop_nav);

  return (
    <div className={`${s.outerContainer} ${navStateClass}`}>
      <div className={`${s.innerContainer} ${navStateClass} ${navStuckToTop && 'MaterialL1 '}`}>
  

        <div className={s.contentWrapper}>
          <div className={s.left}>
            {/* <HoverAndSoWeExpandToAnotherComponent
              idle={
                <ModernButton
                  icon={getIcon("menu")}
                  label="hi!"
                  variant="dev_simple"
                />
              }
              expanded={<Logo />}
            /> */}

            <Logo />
            {desktopRoutes.map((route) => (
              <ModernButton
                key={route.path}
                icon={getIcon(route.icon)}
                label={route.title}
                
                variant="nav_Primary"
                callback={() => startTransition(route.path)}
                tooltip={route.title}
                active={location.pathname === route.path}
                // forceDarkMode
              />
            ))}
          </div>

          <div className={s.right}>
            <div className={s.UtilityIcons}>
              <ModernButton
                icon={getIcon(darkMode ? "sun" : "moon")}
                variant="nav_IconOnly"
                callback={toggleDarkMode}
              />
              <ModernButton
                icon={getIcon("share")}
                variant="nav_IconOnly"
                callback={() =>
                  showModal({
                    title: "Share",
                    content: <ShareSheet />,
                    floatnav: true,
                    size: "small",
                  })
                }
              />
            </div>
            
            <div className={`${s.outlinks} MaterialL2`}>
              <ModernButton
                icon={getIcon("github")}
                label="GitHub"
                variant="nav_Secondary"
                callback={() => window.open(getLink("github"), "_blank")}
              />
              <ModernButton
                icon={getIcon("linkedin")}
                label="LinkedIn"
                variant="nav_Secondary"
                callback={() => window.open(getLink("linkedin"), "_blank")}
              />

              <ModernButton
                icon={getIcon("resume")}
                label="Resume"
                variant="nav_Secondary"
                callback={() => window.open(getLink("resume"), "_blank")}
              />
            </div>


                    <DarkModeAnimatedWithCoolDownToastButton buttonvariantstr="natural_nav" darkstr=".dark" lightstr=".light" />
            <ModernButton
              icon={getIcon("right")}
              variant="nav_IconOnly"
              callback={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};