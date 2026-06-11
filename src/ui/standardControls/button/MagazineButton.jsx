import React from "react";
import s from "./styles/MagazineButton.module.scss"

export const MagazineButton = ({
    label,
    icon,
    size = "md",
    variant = "Magazine_Primary",
    disabled,
    tooltip,
    onClick,
    active,
    forceDarkMode,
}) => {
    let variantClass;
    let isIconOnly = false;

    switch (variant) {
        case "Magazine_Primary":
            variantClass = s.mag_primary;
            break;
        case "Magazine_Secondary":
            variantClass = s.mag_secondary;
            break;
        case "Magazine_IconOnly":
            variantClass = s.mag_iconOnly;
            isIconOnly = true;
            break;
        default:
            console.warn(`MagazineButton: unknown variant "${variant}"`);
            return null;
    }

    const rootClass = [
        variantClass,
        active   && s.active,
        disabled && s.disabled,
    ].filter(Boolean).join(" ");

    const showActiveDot = isIconOnly && active;
    const showIcon      = !showActiveDot && icon;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            data-size={size}
            data-force-dark={forceDarkMode ? "true" : undefined}
            className={rootClass}
            aria-pressed={active ? "true" : "false"}
            aria-label={isIconOnly ? (tooltip ?? label) : undefined}
        >
            {showActiveDot ? (
                <span className={s.activeDot} aria-hidden="true" />
            ) : showIcon ? (
                <span className={s.icon} aria-hidden="true">{icon}</span>
            ) : null}
             

            {!isIconOnly && label && (
                <span className={s.label}>{label}</span>
            )}
        </button>
    );
};