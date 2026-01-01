import styles from "./styles/CodeButton.module.scss"
import getIcon from "../../../tools/iconRef";

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
                    className={codeClasses}
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
                    className={codeSmallClasses}
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


        default:
            return <h1>testasf {variant} </h1>;
    }
};
