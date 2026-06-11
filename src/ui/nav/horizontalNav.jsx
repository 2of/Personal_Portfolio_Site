import React, { useState, useEffect, useRef } from "react";
import s from "./styles/HorizontalNav.module.scss";
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
import { HoverAndSoWeExpandToAnotherComponent } from "../containers/HoverAndSoWeExpandToAnotherComponent";

const OVERFLOW_ANIM_DURATION = 280;
// props are vert and horizontal opts for variatn
export const HorizontalNav = ({ variant = "horizontal" }) => {
    const { startTransition, transitionState } = usePageTransition();
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, toggleDarkMode, ClearFullScreenTransition, StartFullScreenTransition, fullscreentransition } = useDarkMode();
    const [overflowOpen, setOverflowOpen] = useState(false);
    const [overflowVisible, setOverflowVisible] = useState(false);
    const { showModal } = useModal();
    const { ToggleMobileNav, MobileNavIsOpen, navstack, allComponents, addComponent, hasCustomComponents } = useNavStack();
    const overflowRef = useRef(null);

    const navigateToFn = useNavigateTo();
    const { getFlag } = useAppState();

    const handleOverflowToggle = () => {
        if (overflowOpen) {
            setOverflowVisible(false);
            setTimeout(() => setOverflowOpen(false), OVERFLOW_ANIM_DURATION);
        } else {
            setOverflowOpen(true);
        }
    };

    useEffect(() => {
        if (overflowOpen) {
            const timer = setTimeout(() => setOverflowVisible(true), 20);
            return () => clearTimeout(timer);
        }
    }, [overflowOpen]);

    useEffect(() => {
        if (!overflowOpen) return;
        const handleClickOutside = (e) => {
            if (overflowRef.current && !overflowRef.current.contains(e.target)) {
                setOverflowVisible(false);
                setTimeout(() => setOverflowOpen(false), OVERFLOW_ANIM_DURATION);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [overflowOpen]);

    const desktopRoutes = routes.filter(x => x.expose_desktop_nav);

    return (
        <div className={`${s.HorizontalNavOuter}  ${s[variant] || s.horizontal}`}>
            
            <nav className={`${s.HorizontalNavContainer} `} ref={overflowRef}>
            <div className={s.LogoSlot}>
                    {/* <Logo /> */}
                    <HoverAndSoWeExpandToAnotherComponent idle={<ModernButton
                        icon={getIcon("menu")}
                        label="Noah's Website"
                        variant="dev_simple"/>} expanded={<Logo/>}/>
                </div>

                <div className={s.Separator} />

                <div className={s.RouteIcons}>
                    {desktopRoutes.map((route, idx) => (
                        <div
                            key={idx}
                            className={`${s.NavIconWrap} ${location.pathname === route.path ? s.activeCAP : ""}`}
                            style={{ animationDelay: `${idx * 40}ms` }}
                        >
                            <ModernButton
                                icon={getIcon(route.icon)}
                                label={route.title}
                                variant="code_small"
                                callback={() => startTransition(route.path)}
                                tooltip={route.title}
                                active={location.pathname === route.path}
                            />
                            <span className={s.ActivePip} />
                        </div>
                    ))}
                </div>

                {/* <div className={s.Separator} /> */}

                <div className={s.Separator} />
{/* <h4>share</h4> */}    <div className={s.growySeparator} />
                <div className={s.ExternalIcons}>
                                {/* <h4>links</h4> */}
                    <div className={s.NavIconWrap}>
                        <ModernButton
                            icon={getIcon("resume")}
                            variant="code_small"
                            callback={() => window.open(getLink("resume"), "_blank")}
                            tooltip="Resume"
                        />
                    </div>
                    <div className={s.NavIconWrap}>
                        <ModernButton
                            icon={getIcon("linkedin")}
                            variant="code_small"
                            callback={() => window.open(getLink("linkedin"), "_blank")}
                            tooltip="LinkedIn"
                        />
                    </div>
                    <div className={s.NavIconWrap}>
                        <ModernButton
                            icon={getIcon("github")}
                            variant="code_small"
                            callback={() => window.open(getLink("github"), "_blank")}
                            tooltip="GitHub"
                        />
                    </div>
                </div>

                <div className={s.Separator} />
                
                <div className={s.UtilityIcons}>
                    <div className={s.NavIconWrap}>
  <ModernButton
                            icon={getIcon(darkMode ? "sun" : "moon")}
                            variant="code_small"
                            callback={toggleDarkMode}
                            tooltip={darkMode ? "Light mode" : "Dark mode"}
                        />
                    </div>

                    <div className={s.NavIconWrap}>
                        <ModernButton
                            icon={getIcon("information")}
                            variant="code_small"
                            callback={() => showModal({
                                title: "About This Website",
                                content: <AboutCardSmall />,
                                size: "medium"
                            })}
                            tooltip="Info"
                        />
                    </div>

                    <div className={s.NavIconWrap}>
                        <ModernButton
                            icon={getIcon("share")}
                            variant="code_small"
                            callback={() => showModal({
                                title: "Share",
                                content: <ShareSheet />,
                                floatnav: true,
                                size: "small"
                            })}
                            tooltip="Share"
                        />
                    </div>
                        <div className={s.Separator}/>
                    <div className={s.NavIconWrap}>
                        <ModernButton
                            icon={getIcon("right")}
                            variant="code_small"
                            callback={handleOverflowToggle}
                            tooltip="More"
                        />
                    </div>
                </div>

                {overflowOpen && (
                    <div className={`${s.OverflowTray} ${overflowVisible ? s.open : ""}`}>
                        <ModernButton
                            label=".!Construction"
                            variant="code_small"
                            callback={() => showModal({
                                title: "Under construction",
                                content: <p>
                                    FYI this site is still a slight WIP, it's being migrated from the old site in more/oldsites
                                </p>,
                                size: "small"
                            })}
                        />

                        {hasCustomComponents && (
                            <div className={s.OverflowSection}>
                                <div className={s.OverflowDivider} />
                                <h4>Page Controls</h4>
                                {allComponents.map((C, i) => (
                                    <div key={i} className="wrapper">
                                        {C}
                                    </div>
                                ))}
                            </div>
                        )}

                        {getFlag("dev") &&
                            <>
                                <div className={s.OverflowDivider} />
                                <h4>Dev crap --- This may be disabled in /more</h4>
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
                                <h4> {fullscreentransition ? "FS" : "WAIT"}</h4>
                            </>
                        }
                    </div>
                )}
            </nav>
        </div>
    );
};
