import React, { useMemo } from "react";
import s from "./AltTransition.module.scss";

// --- ASCII ASSETS ---



const ASCII_CLOUD_1 = `
   _  _
  ( \\/ )
   \\  /
    \\/
`;

const ASCII_CLOUD_2 = `
      .--.
   .-(    ).
  (___.__)__)
`;

// Simple terrain generator or static block
const ASCII_MOUNTAIN_BACK = `
           /\\                       /\\            /\\
          /  \\                     /  \\          /  \\
         /    \\      /\\           /    \\        /    \\
        /      \\    /  \\         /      \\      /      \\
       /        \\  /    \\       /        \\    /        \\
      /          \\/      \\     /          \\  /          \\
--------------------------------------------------------------
`;

const ASCII_MOUNTAIN_FRONT = `
              /\\
             /  \\              /\\
            /    \\            /  \\
           /      \\          /    \\
          /        \\        /      \\
_________/__________\\______/________\\_________
`;


export const AltTransition = ({ state = "idle" }) => {
    const isActive = state !== "idle";

    // Generate some clouds with random positions
    const clouds = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            art: i % 2 === 0 ? ASCII_CLOUD_1 : ASCII_CLOUD_2,
            top: `${10 + Math.random() * 20}%`, // Top 10-30%
            left: `${Math.random() * 80}%`, // Random horizontal start
            delay: `${Math.random() * -20}s`, // Random start time in animation cycle
            scale: 0.8 + Math.random() * 0.5,
            speed: 15 + Math.random() * 20, // Duration
        }));
    }, []);

    // Determine container classes based on state
    let stateClass = "";
    if (state === "covering") stateClass = s.covering;
    if (state === "uncovering") stateClass = s.uncovering;
    if (state === "exiting") stateClass = s.exiting; // If you have a specific exit state, otherwise usually mapped to idle
    // Note: The parent usually toggles selection. 
    // Standard flows: idle -> covering -> uncovering -> idle OR idle -> covering -> idle

    // We need to ensure we render during the exit phase if needed.
    // Assuming 'state' controls purely 'covering' (active) vs 'idle' (inactive).
    // If we only get 'idle', 'covering', 'uncovering'.

    return (
        <div className={`${s.container} ${isActive ? s.active : ''} ${stateClass}`}>



            {/* Layer 2: Clouds */}
            <div className={`${s.layer} ${s.cloudLayer}`}>
                {clouds.map((cloud) => (
                    <pre
                        key={cloud.id}
                        className={s.cloud}
                        style={{
                            top: cloud.top,
                            // We can override animation here if we want strictly JS controlled,
                            // but CSS animation with negative delay is easier for "already there" feel
                            animationDuration: `${cloud.speed}s`,
                            animationDelay: cloud.delay,
                            transform: `scale(${cloud.scale})`, // Note: keyframes might override transform. 
                            // Better to use a wrapper if complex transforms needed.
                            // For now, let's just stick to CSS opacity/drift.
                            fontSize: `${cloud.scale}em`
                        }}
                    >
                        {cloud.art}
                    </pre>
                ))}
            </div>

            {/* Layer 3: Back Mountains */}
            <div className={`${s.layer} ${s.mountainBackLayer}`}>
                <pre className={s.mountainASCII}>
                    {/* Repeat to fill width roughly */}
                    {ASCII_MOUNTAIN_BACK.repeat(3)}
                </pre>
            </div>

            {/* Layer 4: Front Mountains */}
            <div className={`${s.layer} ${s.mountainFrontLayer}`}>
                <pre className={s.mountainASCII}>
                    {ASCII_MOUNTAIN_FRONT.repeat(3)}
                </pre>
            </div>

            {/* Layer 5: Birds */}
            <div className={`${s.layer} ${s.birdLayer}`}>
                <pre className={s.bird} style={{ top: '20%', animationDelay: '0s' }}>
                    {` /\\ `}
                </pre>
                <pre className={s.bird} style={{ top: '25%', animationDelay: '0.5s', left: '10%' }}>
                    {` /v\\ `}
                </pre>
            </div>

        </div>
    );
};

export default AltTransition;
