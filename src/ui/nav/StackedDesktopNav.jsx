import React, { useState, useEffect } from "react";
import s from "./styles/StackedDesktopNav.module.scss"
import { routes } from "../../routes";
import { useDarkMode } from "../../contexts/DarkMode";
import { useNavigate, useLocation } from "react-router-dom";
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import { getLink } from "../../helpers/GetLink";
import { Logo } from "../misc/Logo";
import { useModal } from "../../contexts/ModalContext";
import { ShareSheet } from "../misc/ShareSheet";
import { AboutCardSmall } from "../cards/AboutCard";
import { DarkModeTile } from "../wrappers/DarkModeFancyTile";
import { CookieManagerForm } from "../../tools/cookiemanagergui";
import { DarkModeAnimatedWithCoolDownToastButton } from "../wrappers/DarkModeWrapper";
import { useAppState } from "../../contexts/StateContext";
import { navigateTo } from "../../tools/navigator";
import { useNavigateTo } from "../../hooks/useNavigate";
import { usePageTransition } from "../../contexts/PageTransition";
import { useNavStack } from "../../contexts/NavigationButtonsStack";

const COLLAPSE_ANIMATION_DURATION = 350;

export const StackedDesktopNav = () => {
    const { startTransition, transitionState } = usePageTransition();
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, toggleDarkMode ,ClearFullScreenTransition, StartFullScreenTransition,fullscreentransition} = useDarkMode();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showCollapsedIcons, setShowCollapsedIcons] = useState(false);
    const { showModal } = useModal();
      const { ToggleMobileNav, MobileNavIsOpen,navstack,allComponents, addComponent, hasCustomComponents } = useNavStack();
    
    const navigateTo = useNavigateTo();
      const { getFlag } = useAppState();

    const handleInfoModa2l = () => {
        alert("ETST")
        showModal({
            open: true,
            title: "OOGABOOGS"
        })

    }


    const handleInfoModal = () => {
        showModal({
            // title: "blah blah",
            size: "large",

            title: "A quick wee about",
            size: "medium",
            floatnav: true,

        });
    };


    const handleToggle = () => {
        if (isCollapsed) {
            setShowCollapsedIcons(false);
            setIsCollapsed(false);
        } else {
            setIsCollapsed(true);
        }
    };

    useEffect(() => {
        if (isCollapsed) {
            const timer = setTimeout(() => {
                setShowCollapsedIcons(true);
            }, COLLAPSE_ANIMATION_DURATION);
            return () => clearTimeout(timer);
        } else {
            setShowCollapsedIcons(false);
        }
    }, [isCollapsed]);

    return (
        <nav className={`${s.NavContainer} ${isCollapsed ? s.collapsed : ''}`}>
            {/* Toggle Button */}
            <ModernButton
            // label={ !isCollapsed ? "collapse" : "" }
                icon={isCollapsed ? getIcon("menu") : getIcon("collapse")}
                variant="dev_simple"
                callback={handleToggle}
                tooltip={isCollapsed ? "Expand" : "Collapse"}
            />


            {isCollapsed && (
                <div className={`${s.CollapsedIcons} ${showCollapsedIcons ? s.visible : ''}`}>
                    <ModernButton
                        icon={getIcon("github")}
                        variant="dev_simple"
                        callback={() => window.open(getLink("github"), "_blank")}
                        tooltip="GitHub"
                    />
                    <ModernButton
                        icon={getIcon("linkedin")}
                        variant="dev_simple"
                        callback={() => window.open(getLink("linkedin"), "_blank")}
                        tooltip="LinkedIn"
                    />
                    <ModernButton
                        icon={getIcon(darkMode ? "sun" : "moon")}
                        variant="dev_simple"
                        callback={toggleDarkMode}
                        tooltip={darkMode ? "Light mode" : "Dark mode"}
                    />
                </div>
            )}

            {/* Expanded Nav Content */}
            <div className={s.NavItems}>

                <div className={s.logocontainer}>
    <Logo />

                </div>

                <div className={s.Divider} />
                {/* <span className={s.textChunk}>
                    this is my personal portfolio site!, feel free to have a peep around....
                </span>
                <div className={s.Divider} /> */}
                <div className={s.NavSection}>
                    {routes.filter(x => x.expose_desktop_nav)
                    
                    
                    .map((route, idx) => (
                        <ModernButton
                            key={idx}
                            variant="natural_nav"
                            label={`.${route.title}`}
                            active={location.pathname === route.path}
                            callback={() => startTransition(route.path)}
                        />
                    ))}
                </div>

                <div className={s.Divider} />

                <div className={s.NavSection}>
                    <ModernButton label=".resume" variant="natural_nav" external link={getLink("resume")} />
                    <ModernButton label=".linkedin" variant="natural_nav" external link={getLink("linkedin")} />
                    <ModernButton label=".github" variant="natural_nav" external link={getLink("github")} />
                </div>

                <div className={s.Divider} />
                        {/* <div className={s.DarkModeTileContainer}>


                        <DarkModeTile/>
                    </div>

                      <div className={s.Divider} /> */}

                {/* <ModernButton
                    label={darkMode ? ".light" : ".dark"}
                    variant="code_small"
                    callback={toggleDarkMode}
                /> */}

                      <DarkModeAnimatedWithCoolDownToastButton buttonvariantstr="natural_nav" darkstr=".dark" lightstr=".light"/>

                <ModernButton
                    label=".info"
                    variant="natural_nav"
                     callback={() => showModal({
                        title: "About This Website",
                        content: <AboutCardSmall />,
                        // floatnav: true,
                        size: "medium"
                    })}
                />

                 <ModernButton
                    label=".!Construction"
                    variant="natural_nav"
                    callback={() => showModal({
                        title: "Under construction",
                        content: <p>
                            FYI this site is still a slight WIP, it's being migrated from the old site in more/oldsites
                        </p>,
     
                        size: "small"
                    })}
                />

                <ModernButton
                    label=".share"
                    variant="natural_nav"
                    callback={() => showModal({
                        title: "TEST",
                        content: <ShareSheet />,
                        floatnav: true,
                        size: "small"
                    })}
                />


{/* {hasCustomComponents && <h3>test</h3>} */}
                       {hasCustomComponents && (
  <div className={s.CustomComponentContainer}>
  <div className={s.Divider} />
    <h4>Page Controls</h4>
    
    {/* <h3>Custom Components Found:</h3> */}
    {allComponents.map((C, i) => (
      <div key={i} className="wrapper">
        {/* Render the actual component saved in state */}
        {C} 
        
        {/* Debug button */}
        {/* <button onClick={() => console.log("Component Data:", C)}>
          Log Component {i}
        </button> */}
      </div>
    ))}
  </div>
)}
            {getFlag("dev") &&
            <>
                        <div className={s.Divider} />
                        <h4>Dev crap --- This may be disabled in /more</h4>

                        {/* <p> </p> */}
              <ModernButton
                    label=".cookies manager"
                    variant="natural_nav"
                    callback={() => showModal({
                        title: "Cookies",
                        content: <CookieManagerForm />,
                        floatnav: false,
                        size: "medium"
                    })}
                />



                <ModernButton
                    label=".Junk and Crap"
                    variant="natural_nav"
              callback={() => navigate("/sample")}
                     active={location.pathname === "/sample"}
                />
            <h4> {fullscreentransition ? "FS" : "WAIT" }</h4>
            
            </>
         
                
                }


                {/* <DarkModeTile/> */}
            </div>
        </nav>
    );
};