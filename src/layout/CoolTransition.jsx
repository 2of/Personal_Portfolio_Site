import React from "react";
import s from "./CoolTransition.module.scss";

export const CoolTransition = ({ state = "idle" }) => {
    const isActive = state !== "idle";
    const isCovering = state === "covering";

    const shapes = [
        { type: 'rect', size: 'large', dir: 'left' },
        { type: 'triangle', size: 'medium', dir: 'right' },
        { type: 'circle', size: 'small', dir: 'left' },
        { type: 'rect', size: 'medium', dir: 'right' },
        { type: 'triangle', size: 'large', dir: 'left' },
        { type: 'circle', size: 'medium', dir: 'right' },
        { type: 'rect', size: 'small', dir: 'left' },
    ];

    return (
        <div
            className={s.container}
            style={{
                pointerEvents: isActive ? "all" : "none",
                zIndex: 999999,
                overflow: "hidden",
            }}
        >
            {shapes.map((shape, index) => (
                <div
                    key={index}
                    className={`${s.shape} ${s[shape.type]} ${s[shape.size]} ${s[shape.dir]} ${isCovering ? s.covering : state === "uncovering" ? s.uncovering : ""
                        }`}
                    style={{
                        animationDelay: isCovering
                            ? `${index * 0.06}s`
                            : `${(shapes.length - 1 - index) * 0.06}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default CoolTransition;
