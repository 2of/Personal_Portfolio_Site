import React, { useState, useMemo, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDarkMode } from "../../../contexts/DarkMode";
import s from "./FancyStateTransition.module.scss";

const PortalOverlay = ({ children }) => {
    if (typeof document === "undefined") return null;
    return ReactDOM.createPortal(children, document.body);
};

export const FancyStateTransition = () => {
    const { darkMode, toggleDarkMode ,ClearFullScreenTransition, StartFullScreenTransition,fullscreentransition} = useDarkMode();
    const [animationState, setAnimationState] = useState("idle");
    const [visualMode, setVisualMode] = useState(darkMode ? "night" : "day");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);



useEffect(() => {
    if (fullscreentransition) { 
        // alert("DOING IT")
    handleTransition()
    }

}, [fullscreentransition])

    // Generate twinkling stars with varied properties
    const stars = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 60}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.5,
        duration: 1 + Math.random() * 2,
        delay: Math.random() * 3,
        brightness: 0.4 + Math.random() * 0.6
    })), []);

    // Generate clouds with better distribution
    const clouds = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        top: `${8 + (i % 4) * 12}%`,
        scale: 0.6 + Math.random() * 0.8,
        speed: `${12 + Math.random() * 10}s`,
        delay: `-${(i * 4) + Math.random() * 5}s`,
        variant: i % 3
    })), []);

    const handleTransition = () => {
        if (animationState !== "idle") return;

        const startingMode = darkMode ? "night" : "day";
        const targetMode = darkMode ? "day" : "night";

        // First, show the overlay with current mode
        setVisualMode(startingMode);
        setShowOverlay(true);

        // Small delay to ensure DOM is ready, then start entrance
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setAnimationState("entering");
            });
        });

        // After entrance animation, start the warp and transition
        setTimeout(() => {
            setAnimationState("warping");
            setIsTransitioning(true);

            // Smoothly transition the visual mode
            setTimeout(() => {
                setVisualMode(targetMode);
                toggleDarkMode();
            }, 200);
        }, 900);

        // Stable phase
        setTimeout(() => {
            setAnimationState("stable");
            setIsTransitioning(false);
        }, 2400);

        // Exit phase
        setTimeout(() => {
            setAnimationState("exiting");
        }, 3700);

        // Cleanup
        setTimeout(() => {
            setAnimationState("idle");
            setShowOverlay(false);
            ClearFullScreenTransition();
        }, 4700);
    };

    return (
        <>
            <button className={s.triggerBtn} onClick={handleTransition} disabled={animationState !== "idle"}>
                {animationState === "idle" ? (
                    <span className={s.btnContent}>
                        <span className={s.btnIcon}>{darkMode ? "☀️" : "🌙"}</span>
                        <span className={s.btnText}>Switch to {darkMode ? "Day" : "Night"}</span>
                    </span>
                ) : (
                    <span className={s.btnContent}>
                        <span className={s.spinner} />
                        <span className={s.btnText}>Shifting...</span>
                    </span>
                )}
            </button>

            {showOverlay && (
                <PortalOverlay>
                    <div className={`
                        ${s.fullScreenContainer} 
                        ${s[animationState]} 
                        ${s[visualMode]}
                        ${isTransitioning ? s.transitioning : ''}
                    `}>

                        {/* 1. Sky & Atmosphere */}
                        <div className={s.atmosphere}>
                            {/* Star Field - only visible at night */}
                            <div className={s.starField}>
                                {stars.map(star => (
                                    <div
                                        key={star.id}
                                        className={s.star}
                                        style={{
                                            top: star.top,
                                            left: star.left,
                                            width: star.size,
                                            height: star.size,
                                            '--twinkle-duration': `${star.duration}s`,
                                            '--twinkle-delay': `${star.delay}s`,
                                            '--star-brightness': star.brightness
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Sun */}
                            <div className={`${s.celestialBody} ${s.sun}`}>
                                <div className={s.sunCore} />
                                <div className={s.sunRays} />
                                <div className={s.sunGlow} />
                            </div>

                            {/* Moon */}
                            <div className={`${s.celestialBody} ${s.moon}`}>
                                <div className={s.moonCrater} style={{ top: '20%', left: '25%', width: '20px', height: '20px' }} />
                                <div className={s.moonCrater} style={{ top: '50%', left: '55%', width: '12px', height: '12px' }} />
                                <div className={s.moonCrater} style={{ top: '65%', left: '30%', width: '15px', height: '15px' }} />
                                <div className={s.moonGlow} />
                            </div>
                        </div>

                        {/* 2. Speed Layer (Only during warping) */}
                        <div className={s.warpVortex}>
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={s.streak} style={{
                                    top: `${5 + (i * 5)}%`,
                                    animationDelay: `${Math.random() * 0.3}s`,
                                    '--streak-length': `${200 + Math.random() * 400}px`
                                }} />
                            ))}
                        </div>

                        {/* 3. Clouds - Better distributed */}
                        <div className={s.cloudLayer}>
                            {clouds.map(cloud => (
                                <div
                                    key={cloud.id}
                                    className={`${s.cloudWrapper} ${s[`cloudVariant${cloud.variant}`]}`}
                                    style={{
                                        top: cloud.top,
                                        '--drift-speed': cloud.speed,
                                        animationDelay: cloud.delay,
                                        transform: `scale(${cloud.scale})`
                                    }}
                                >
                                    <div className={s.cloudBody}>
                                        <div className={s.cloudPuff} style={{ left: '10%', top: '-40%', width: '55px', height: '55px' }} />
                                        <div className={s.cloudPuff} style={{ left: '40%', top: '-55%', width: '70px', height: '70px' }} />
                                        <div className={s.cloudPuff} style={{ left: '65%', top: '-35%', width: '50px', height: '50px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 4. The Terrain - Horizon Line & River */}
                        {/* 4. The Ocean - Full width below horizon */}
                        <div className={s.terrain}>
                            <div className={s.horizonLine} />

                            <div className={s.ocean}>
                                {/* Wave Layers */}
                                <div className={s.waveLayerBack} />
                            </div>
                        </div>

                        {/* 5. Ambient particles */}
                        <div className={s.particles}>
                            {[...Array(15)].map((_, i) => (
                                <div
                                    key={i}
                                    className={s.particle}
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        '--float-duration': `${4 + Math.random() * 4}s`,
                                        '--float-delay': `${Math.random() * 5}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </PortalOverlay>
            )}
        </>
    );
};