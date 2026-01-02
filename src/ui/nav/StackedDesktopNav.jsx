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

const COLLAPSE_ANIMATION_DURATION = 350;

export const StackedDesktopNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showCollapsedIcons, setShowCollapsedIcons] = useState(false);
    const { showModal } = useModal();

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
                icon={isCollapsed ? getIcon("menu") : getIcon("left")}
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
                <Logo />
                <div className={s.Divider} />
                <span>
                    this is my personal portfolio site!, feel free to have a peep around....
                </span>
                <div className={s.Divider} />
                <div className={s.NavSection}>
                    {routes.filter(x => x.expose_desktop_nav)
                    
                    
                    .map((route, idx) => (
                        <ModernButton
                            key={idx}
                            variant="code_small"
                            label={`.${route.title}`}
                            active={location.pathname === route.path}
                            callback={() => navigate(route.path)}
                        />
                    ))}
                </div>

                <div className={s.Divider} />

                <div className={s.NavSection}>
                    <ModernButton label=".resume" variant="code_small" external link={getLink("resume")} />
                    <ModernButton label=".linkedin" variant="code_small" external link={getLink("linkedin")} />
                    <ModernButton label=".github" variant="code_small" external link={getLink("github")} />
                </div>

                <div className={s.Divider} />
                
                <ModernButton
                    label={darkMode ? ".light" : ".dark"}
                    variant="code_small"
                    callback={toggleDarkMode}
                />
                <ModernButton
                    label=".info"
                    variant="code_small"
                     callback={() => showModal({
                        title: "About This Website",
                        content: <AboutCardSmall />,
                        // floatnav: true,
                        size: "medium"
                    })}
                />
                <ModernButton
                    label=".share"
                    variant="code_small"
                    callback={() => showModal({
                        title: "TEST",
                        content: <ShareSheet />,
                        floatnav: true,
                        size: "small"
                    })}
                />
            </div>
        </nav>
    );
};