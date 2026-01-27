// PegboardBackground.jsx
import React from 'react';
import styles from './styles/Pegboard.module.scss';

export default function PegboardBackground() {
  const HOLE_SPACING = 40; // Must match pattern width/height
  
  // Generate random shelves aligned to pegboard grid
  const shelves = React.useMemo(() => {
    const s = [];
    const shelfCount = 8;
    
    for (let i = 0; i < shelfCount; i++) {
      // Random grid position (in grid units)
      const gridX = Math.floor(Math.random() * 20);
      const gridY = Math.floor(Math.random() * 15) + 5; // Start lower to avoid top feather
      const shelfHoles = 3 + Math.floor(Math.random() * 5); // 3-7 holes wide
      
      s.push({
        gridX,
        gridY,
        shelfHoles
      });
    }
    return s;
  }, []);

  return (
    <div className={styles.pegboard}>
      {/* Top feather gradient */}
      <div className={styles.feather} />
      
      {/* Pegboard holes pattern */}
      <svg className={styles.pattern}>
        <defs>
          <pattern id="pegboard" x="0" y="0" width={HOLE_SPACING} height={HOLE_SPACING} patternUnits="userSpaceOnUse">
            <circle cx={HOLE_SPACING / 2} cy={HOLE_SPACING / 2} r="4" fill="var(--bg-l3)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pegboard)" />
      </svg>

      {/* Test shelf - should be visible */}
      <div className={styles.testShelf} />
      
      {/* Shelves */}
      {shelves.map((shelf, i) => {
        const xPos = shelf.gridX * HOLE_SPACING;
        const yPos = shelf.gridY * HOLE_SPACING;
        const width = shelf.shelfHoles * HOLE_SPACING;
        
        return (
          <div
            key={i}
            className={styles.shelf}
            style={{
              left: `${xPos}px`,
              top: `${yPos}px`,
              width: `${width}px`,
            }}
          >
            {/* Shelf board */}
            <div className={styles.shelfBoard} />
            
            {/* Left bracket */}
            <div className={styles.bracketLeft} />
            
            {/* Right bracket */}
            <div className={styles.bracketRight} />
            
            {/* Peg holes on shelf */}
            {Array.from({ length: shelf.shelfHoles + 1 }).map((_, idx) => (
              <div
                key={idx}
                className={styles.pegHole}
                style={{
                  left: `${idx * HOLE_SPACING - HOLE_SPACING / 2}px`,
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}