import React, { useEffect, useState } from "react";
import s from "./AltTransition.module.scss";

const ASCII_SCENE = `
          _  _
         ( \\/ )
  .---.   \\  /   .-"-.
 /   6_6   \\/   / 4 4 \\
 \\_  (__\\       \\_ v _/
 //   \\\\        //   \\\\
((     ))      ((     ))
=======""===""========""===""=======
         |     |
         |     |
   \\^/   |     |   \\^/
    |    |     |    |
`;

const ASCII_MOUNTAINS = `
                                            
                                  _         
                                 / \\        
                                /   \\       
               /\\              /     \\      
              /  \\            /       \\     
             /    \\          /         \\    
            /      \\        /           \\   
           /        \\      /             \\  
          /          \\    /               \\ 
_________/____________\\__/_________________\\__
`;

// A more complex nature scene
const SCENE_FRAMES = [
    `
      \\/
     _||_
    /    \\         /\\
   /      \\       /  \\
  /        \\     /    \\
 /          \\   /      \\
/____________\\_/________\\
`,
    `
      \\/
     _||_
    /    \\         /\\
   /      \\  /\\   /  \\
  /        \\/  \\ /    \\
 /          \\   /      \\
/____________\\_/________\\
`
];


export const AltTransition = ({ state = "idle" }) => {
    const isActive = state !== "idle";
    const [frame, setFrame] = useState(0);

    // Simple animation for the ASCII art itself if we wanted
    //   useEffect(() => {
    //     if (!isActive) return;
    //     const interval = setInterval(() => {
    //       setFrame(f => (f + 1) % SCENE_FRAMES.length);
    //     }, 500);
    //     return () => clearInterval(interval);
    //   }, [isActive]);

    if (!isActive && state !== "exiting") return null;

    let animationClass = "";
    if (state === "covering") {
        // We are entering or completely covered
        animationClass = s.entering;
    } else if (state === "uncovering") {
        // We are exiting
        animationClass = s.exiting;
    }

    // To handle the "perfectly hide" requirement:
    // When state is 'covering', we want to be fully visible.
    // When state acts as 'uncovering', we want to animate out.
    // The 'TransitionCover' logic was: 
    //   covering -> translateX(0)
    //   uncovering -> translateX(100%)

    // We will map this to classes.

    return (
        <div
            className={`${s.container} ${isActive ? '' : s.hidden}`}
            style={{
                pointerEvents: isActive ? "all" : "none",
                opacity: state === 'idle' ? 0 : 1,
                transition: 'opacity 0.1s linear' // small fade just in case
            }}
        >
            <div className={`${s.asciiContainer} ${state === "covering" ? s.entering : ""
                } ${state === "uncovering" ? s.exiting : ""
                }`}>
                <pre className={s.sun}>
                    {`      \\|/
    -- O --
      /|\\`}
                </pre>
                <pre className={s.mountain}>
                    {ASCII_MOUNTAINS}
                </pre>
                <div style={{ marginTop: '20px', fontSize: '24px' }}>
                    LOADING...
                </div>
            </div>
        </div>
    );
};

export default AltTransition;
