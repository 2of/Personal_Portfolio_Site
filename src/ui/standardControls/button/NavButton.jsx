import React from "react";
import s from "./styles/NavButton.module.scss";

export const NavButton = ({
    label,
    icon,
    size = "md",
    variant = "nav_Primary", // or primary or _stacked
    disabled,
    tooltip,
    onClick,
    active,
    forceDarkMode
}) => {
    const commonProps = {
        onClick,
        disabled,
        title: tooltip,
        "data-size": size,
        "data-force-dark": forceDarkMode ? "true" : undefined,
        className: `${s[variant.replace('nav_', 'nav')]} ${active ? s.active : ""}`
    };

    // hmmmmm
    const showDot = (variant === "nav_Primary" || variant === "nav_IconOnly") && active;

    const content = (
        <>
            {showDot ? (
                <div className={s.activeDot} aria-hidden="true" />
            ) : (
                icon && <span className={s.icon}>{icon}</span>
            )}
            {variant !== "nav_IconOnly" && label && (
                <span className={s.label}>{label}</span>
            )}
        </>
    );

    if (!s[variant.replace('nav_', 'nav')]) return <h1>TEST</h1>;

    return (
        <button {...commonProps} aria-label={variant === "nav_IconOnly" ? (tooltip ?? label) : undefined}>
            {content}
        </button>
    );
};