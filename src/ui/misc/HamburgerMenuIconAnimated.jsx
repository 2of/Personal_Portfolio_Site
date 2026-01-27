import React from 'react';

export const HamburgerButtonWrapper = ({state, onClickCallback}) => {
  const handleClick = () => {
    onClickCallback(!state)
  }
  
  return (
    <>
      <style>{`
        .hamburger-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hamburger {
          position: relative;
          width: 1.5rem;
          height: 1.5rem;
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .hamburger:hover {
          transform: scale(1.08);
        }

        .hamburger:active {
          transform: scale(0.92);
        }

        .hamburger.open {
          transform: rotate(90deg);
        }

        .hamburger.open:hover {
          transform: rotate(90deg) scale(1.08);
        }

        .line {
          width: 1.25rem;
          height: 2px;
          background: var(--text-color);
          border-radius: 1px;
          transform-origin: center;
          position: relative;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .line1 {
          transform: translateY(0) rotate(0deg) scaleX(1);
        }

        .line2 {
          opacity: 1;
          transform: scaleX(1) rotate(0deg);
        }

        .line3 {
          transform: translateY(0) rotate(0deg) scaleX(1);
        }

        .hamburger.open .line1 {
          transform: translateY(0.375rem) rotate(45deg) scaleX(1.2);
          transition-delay: 0.1s;
        }

        .hamburger.open .line2 {
          opacity: 0;
          transform: scaleX(0) rotate(180deg);
          transition-duration: 0.3s;
        }

        .hamburger.open .line3 {
          transform: translateY(-0.375rem) rotate(-45deg) scaleX(1.2);
          transition-delay: 0.15s;
        }

        .hamburger:focus {
          outline-offset: 2px;
        }

        /* Exciting hover effects on individual lines */
        .hamburger:not(.open):hover .line1 {
          transform: translateX(-3px) scaleX(1.1);
        }

        .hamburger:not(.open):hover .line2 {
          transform: translateX(4px) scaleX(0.9);
        }

        .hamburger:not(.open):hover .line3 {
          transform: translateX(-2px) scaleX(1.05);
        }

        /* Add a subtle pulse on the lines when opening */
        .hamburger.open .line1,
        .hamburger.open .line3 {
          animation: pulse 0.6s ease-out;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
      
      <div className="hamburger-container">
        <button 
          className={`hamburger ${state ? 'open' : ''}`}
          onClick={handleClick}
          aria-label="Toggle menu"
        >
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </button>
      </div>
    </>
  );
};

export default HamburgerButtonWrapper;