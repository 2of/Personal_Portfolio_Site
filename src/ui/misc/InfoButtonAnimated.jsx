import React, { useState } from 'react';

export const InfoButtonWrapper = ({onClickCallback}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
    if (onClickCallback) onClickCallback();
  }
  
  return (
    <>
      <style>{`
        .info-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .info-button {
          position: relative;
          width: 1.5rem;
          height: 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .info-button:hover {
          transform: scale(1.15);
        }

        .info-button:active {
          transform: scale(0.9);
        }

        .info-button.animating {
          animation: button-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .circle-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Orbiting particles */
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: var(--text-color, #1a1a1a);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }

        .info-button.animating .particle {
          animation: particle-orbit 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .particle:nth-child(1) { animation-delay: 0s; }
        .particle:nth-child(2) { animation-delay: 0.1s; }
        .particle:nth-child(3) { animation-delay: 0.2s; }
        .particle:nth-child(4) { animation-delay: 0.3s; }

        .i-symbol {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 0.85rem;
          font-weight: 400;
          font-style: italic;
          color: var(--text-color, #1a1a1a);
          line-height: 1;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          user-select: none;
        }

        .info-button:hover .i-symbol {
          transform: translate(-50%, -50%) scale(1.15);
          font-style: normal;
        }

        .info-button.animating .i-symbol {
          animation: i-dance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Pulse rings */
        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border: 1px solid var(--text-color, #1a1a1a);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          pointer-events: none;
        }

        .info-button.animating .pulse-ring {
          animation: pulse-wave 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .pulse-ring:nth-child(2) {
          animation-delay: 0.15s;
        }

        @keyframes button-bounce {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3) rotate(10deg); }
          50% { transform: scale(0.95) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(3deg); }
        }

        @keyframes particle-orbit {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(0) scale(1);
          }
          50% { 
            opacity: 1;
            transform: translate(-50%, -50%) rotate(180deg) translateX(20px) scale(1.5);
          }
          100% { 
            opacity: 0;
            transform: translate(-50%, -50%) rotate(360deg) translateX(0) scale(0.5);
          }
        }

        @keyframes i-dance {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg); 
            font-style: italic;
            opacity: 1;
          }
          25% { 
            transform: translate(-50%, -50%) scale(1.5) rotate(15deg); 
            font-style: normal;
            opacity: 0.8;
          }
          50% { 
            transform: translate(-50%, -50%) scale(0.8) rotate(-10deg); 
            font-style: italic;
            opacity: 1;
          }
          75% { 
            transform: translate(-50%, -50%) scale(1.2) rotate(5deg); 
            font-style: normal;
            opacity: 0.9;
          }
        }

        @keyframes pulse-wave {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
      
      <div className="info-container">
        <button 
          className={`info-button ${isAnimating ? 'animating' : ''}`}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Information"
        >
          <div className="circle-wrapper">
            <div className="i-symbol">i</div>
            {isAnimating && (
              <>
                <div className="particle" style={{ top: '50%', left: '50%' }}></div>
                <div className="particle" style={{ top: '50%', left: '50%' }}></div>
                <div className="particle" style={{ top: '50%', left: '50%' }}></div>
                <div className="particle" style={{ top: '50%', left: '50%' }}></div>
                <div className="pulse-ring"></div>
                <div className="pulse-ring"></div>
              </>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default InfoButtonWrapper;