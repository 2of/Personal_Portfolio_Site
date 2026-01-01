import React from "react";

/**
 * OrbitPicture
 * @param {string} image - planet image URL
 * @param {number} n - number of orbiting moons
 * @param {number} size - diameter of the planet
 */
export default function OrbitPicture({
  image,
  n = 12,
  size = 260
}) {
  const orbitId = "orbit-path";

  return (
    <div
      className="orbit-scene"
      style={{ width: size, height: size }}
    >
      {/* SVG Orbit + Trails */}
      <svg
        className="orbit-svg"
        viewBox="0 0 300 200"
      >
        <defs>
          <path
            id={orbitId}
            d="
              M 30 150
              C 90 120, 210 120, 270 150
              C 210 180, 90 180, 30 150
            "
          />
        </defs>

        {/* Base dotted orbit */}
        <use
          href={`#${orbitId}`}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeDasharray="4 6"
        />

        {/* Trails */}
        {Array.from({ length: n }).map((_, i) => (
          <use
            key={i}
            href={`#${orbitId}`}
            className="orbit-trail"
            style={{
              animationDelay: `${(i / n) * -8}s`
            }}
          />
        ))}
      </svg>

      {/* Moons */}
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="moon"
          style={{
            animationDelay: `${(i / n) * -8}s`
          }}
        />
      ))}

      {/* Planet */}
      <img src={image} alt="Planet" className="planet" />

      <style>{`
        .orbit-scene {
          position: relative;
          perspective: 900px;
          transform-style: preserve-3d;
        }

        /* Planet */
        .planet {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          transform: translateZ(40px);
          border: 1px solid var(--text-color);
          z-index: 2;
        }

        /* Orbit SVG */
        .orbit-svg {
          position: absolute;
          inset: 0;
          transform:
            rotateX(20deg)
            translateY(10px);
          pointer-events: none;
          z-index: 1;
        }

        /* Trail stroke (snake-like) */
        .orbit-trail {
          fill: none;
          stroke: black;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 18 240;
          animation: trailMove 8s linear infinite;
        }

        @keyframes trailMove {
          to {
            stroke-dashoffset: -260;
          }
        }

        /* Moons */
        .moon {
          position: absolute;
          top: 62%;
          left: 50%;
          width: 12px;
          height: 12px;
          background: black;
          border-radius: 50%;
          transform-style: preserve-3d;
          animation: moonOrbit 8s linear infinite;
        }

        @keyframes moonOrbit {
          0% {
            transform:
              rotateY(0deg)
              rotateX(20deg)
              translateX(120px)
              translateZ(55px);
            z-index: 3;
          }

          50% {
            transform:
              rotateY(180deg)
              rotateX(20deg)
              translateX(120px)
              translateZ(-55px);
            z-index: 0;
          }

          100% {
            transform:
              rotateY(360deg)
              rotateX(20deg)
              translateX(120px)
              translateZ(55px);
            z-index: 3;
          }
        }
      `}</style>
    </div>
  );
}
