import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import s from './styles/HoverAndSoWeExpand.module.scss';

export const HoverAndSoWeExpandToAnotherComponent = ({ 
    idle, 
    expanded, 
    direction = "horizontal", 
    forceExpanded = false,
    className
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [coords, setCoords] = useState(null);
    const [animateIn, setAnimateIn] = useState(false);
    
    const wrapperRef = useRef(null);
    const hideTimer = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(hideTimer.current);
        if (!wrapperRef.current) return;
        
        const rect = wrapperRef.current.getBoundingClientRect();
        setCoords({
            top: rect.top + rect.height / 2,
            left: rect.left + rect.width / 2,
        });
        
        setIsHovered(true);
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setAnimateIn(true);
            });
        });
    };

    const handleMouseLeave = () => {
        clearTimeout(hideTimer.current);
        setAnimateIn(false);
        
        hideTimer.current = setTimeout(() => {
            setIsHovered(false);
            setCoords(null);
        }, 450); 
    };

    useEffect(() => {
        const handleScrollOrResize = () => {
            if (isHovered) {
                setIsHovered(false);
                setAnimateIn(false);
                setCoords(null);
            }
        };
        
        window.addEventListener("scroll", handleScrollOrResize, { passive: true });
        window.addEventListener("resize", handleScrollOrResize, { passive: true });
        
        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            clearTimeout(hideTimer.current);
        };
    }, [isHovered]);

    const activeHover = isHovered || forceExpanded;
    const isShowingPortal = activeHover && coords;

    return (
        <>
            <div 
                ref={wrapperRef}
                className={clsx(s.stubBox, className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div style={{ opacity: animateIn ? 0 : 1, transition: 'opacity 0.2s', display: 'flex' }}>
                    {idle}
                </div>
            </div>

            {isShowingPortal && createPortal(
                <div 
                    className={clsx(s.portalOverlay)}
                    style={{
                        top: coords.top,
                        left: coords.left,
                    }}
                >
                    <div 
                        className={clsx(
                            s.portalInnerContainer, 
                            s[direction],
                            animateIn && s.expanded,
                            className
                        )}
                        onMouseEnter={() => {
                            clearTimeout(hideTimer.current);
                            setAnimateIn(true);
                        }}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={s.expandedPane}>
                            <div className={s.innerContent}>
                                {expanded}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};
