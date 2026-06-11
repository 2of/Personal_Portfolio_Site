import styles from "./styles/CodeButton.module.scss"
import getIcon from "../../../tools/iconRef";
import { useTheme } from "../../../contexts/ThemeProvider";
import { useTooltip } from "../../../contexts/ToolTipContext";

export const CodeButton = ({
    label,
    icon,
    size,
    variant,
    disabled,
    tooltip,
    onClick,
    fixedwhitemode,
    fixeddarkmode,
    external,

    active
}) => {
    const externalIcon = external ? getIcon("external") : null;
    const { setTooltip } = useTooltip();
    // return (<h1>teasst</h1>)
    switch (variant) {
        case "code":
            const codeClasses = [
                styles.code,
                fixedwhitemode && styles.fixedWhiteMode,
                fixeddarkmode && styles.fixedDarkMode,
                active && styles.activeState
            ].filter(Boolean).join(' ');

            return (
                <div
                    type="button"
              className={`${codeClasses} text-iata`}
                    disabled={disabled}
                    title={tooltip}
                    onClick={onClick}
                >

                    <div className={styles.l1}>
                        {icon}
                        {label}
                    </div>
                    <div className={styles.l2}>
                        {icon}
                        {label}

                    </div>

                    {externalIcon && (
                        <span className={styles.externalCornerIcon}>{externalIcon}</span>
                    )}

                </div>
            );


        case "code_small":
            const codeSmallClasses = [
                styles.code_small,
                fixedwhitemode && styles.fixedWhiteMode,
                fixeddarkmode && styles.fixedDarkMode,
                active && styles.activeState
            ].filter(Boolean).join(' ');

            return (
                <div
                    type="button"
                    className={`${codeSmallClasses} text-iata`}
                    disabled={disabled}
                    title={tooltip}
                    onClick={onClick}

                      onMouseEnter={() => setTooltip(tooltip || null)}
                    onMouseLeave={() => setTooltip(null)}


                >


                    <div className={styles.l1}>
                        {icon}
                        {label}
                    </div>
                    <div className={styles.l2}>
                        {icon}
                        {label}

                    </div>

                    {externalIcon && (
                        <span className={styles.externalCornerIcon}>{externalIcon}</span>
                    )}

                </div>
            );


        default:
            return <h1>testasf {variant} </h1>;
    }
};
