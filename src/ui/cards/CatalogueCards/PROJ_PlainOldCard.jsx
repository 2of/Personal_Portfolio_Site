import React, { useState } from "react";
import styles from "./styles/PROJ_PlainOldCard.module.scss";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";

export const PROJCARD_PlainOldCard = ({

    // export const PROJCARD_DataStrip = ({
    title,
    description,
    tags,
    links,
    image,
    inprogress,
}) => {
    const gotoURL = useNavigateTo();

    return (
        <article className={styles.rowCard}>
            
            {/* Locked Visual Viewport */}
            <div className={styles.imageViewport}>
                {image && <img src={image} alt={title} />}
                {inprogress && (
                    <div style={{
                        position: 'absolute', bottom: 0, right: 0, 
                        fontSize: '9px', padding: '4px 8px', background: 'var(--accent-color)',
                        color: '#000', fontWeight: '900', fontFamily: 'monospace'
                    }}>
                        LIVE_SYSTEM
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className={styles.contentColumn}>
                <div className={styles.tagsRow}>
                    {tags?.map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                </div>
                
                <h2 className={styles.title}>{title}</h2>
                
                <p className={styles.description}>{description}</p>
                
                {/* Actions Integrated via Footer */}
                <footer className={styles.footerActions}>
                    {links?.map((l, i) => (
                        <ModernButton
                            key={i}
                            variant="nav_Outline"
                            icon={getIcon(l.icon || "info")}
                            label={l.label}
                            callback={(e) => {
                                e.stopPropagation();
                                gotoURL(l.to);
                            }}
                        />
                    ))}
                </footer>
            </div>

            {/* Pure Visual Flourish */}
            <div className={styles.flourishStrip} />
            
        </article>
    );
};