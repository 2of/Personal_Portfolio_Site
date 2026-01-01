import React, { useRef, useEffect, useCallback } from "react";
import styles from "./styles/TrackedDots.module.scss";
import { useAppTheme } from "../../contexts/ThemeContext.jsx";

const TrackedDots = ({
    radius = 320,
    transitionDuration = 300,
    alwaysListen = true,
    isbg = true
}) => {
    const canvasRef = useRef(null);
    const { getColor } = useAppTheme();

    const bg = getColor("--bg");
    const dotColor = getColor("--bg-l2") || "#ffffff";

    const pointer = useRef({ x: -1000, y: -1000 });
    const size = useRef({ width: 0, height: 0 });
    const currentRadius = useRef(0);
    const targetRadius = useRef(alwaysListen ? radius : 0);
    const rafRef = useRef(null);
    const patternCache = useRef(null);

    const getPattern = useCallback((ctx) => {
        if (patternCache.current) return patternCache.current;

        const spacing = 12;
        const dotSize = 1.5;
        const patternCanvas = document.createElement("canvas");
        patternCanvas.width = spacing;
        patternCanvas.height = spacing;
        const pCtx = patternCanvas.getContext("2d");

        pCtx.fillStyle = dotColor === "transparent" ? "rgba(255,255,255,0.5)" : dotColor;
        pCtx.beginPath();
        pCtx.arc(spacing / 2, spacing / 2, dotSize, 0, Math.PI * 2);
        pCtx.fill();

        const pattern = ctx.createPattern(patternCanvas, "repeat");
        patternCache.current = pattern;
        return pattern;
    }, [dotColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const updateSize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            size.current = { width: rect.width, height: rect.height };
            patternCache.current = null;
        };

        const draw = (now) => {
            if (!draw.lastTime) draw.lastTime = now;
            const dt = now - draw.lastTime;
            draw.lastTime = now;

            const step = (radius / transitionDuration) * dt;
            if (currentRadius.current < targetRadius.current) {
                currentRadius.current = Math.min(targetRadius.current, currentRadius.current + step);
            } else {
                currentRadius.current = Math.max(targetRadius.current, currentRadius.current - step);
            }

            const { width, height } = size.current;
            ctx.clearRect(0, 0, width, height);

            ctx.globalCompositeOperation = "source-over";
            const pattern = getPattern(ctx);
            if (pattern) {
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, width, height);
            }

            if (currentRadius.current > 0) {
                const gradient = ctx.createRadialGradient(
                    pointer.current.x,
                    pointer.current.y,
                    0,
                    pointer.current.x,
                    pointer.current.y,
                    currentRadius.current
                );
                gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.globalCompositeOperation = "destination-in";
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        const handleMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            pointer.current.x = e.clientX - rect.left;
            pointer.current.y = e.clientY - rect.top;
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        rafRef.current = requestAnimationFrame(draw);

        if (alwaysListen) {
            window.addEventListener("mousemove", handleMove);
        } else {
            const parent = canvas.parentElement;
            parent.addEventListener("mousemove", handleMove);
            parent.addEventListener("mouseenter", () => { targetRadius.current = radius; });
            parent.addEventListener("mouseleave", () => { targetRadius.current = 0; });
        }

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", updateSize);
            window.removeEventListener("mousemove", handleMove);
        };
    }, [radius, transitionDuration, alwaysListen, getPattern]);

    return (
        <div
            className={`${styles.container} ${isbg ? styles.fullscreen : ""}`}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                background: bg
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default TrackedDots;