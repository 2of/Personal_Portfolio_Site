import React, { useEffect, useRef } from 'react';
import styles from './styles/Topo.module.scss';

export const TopoMap = ({ speed = 0.000005, frequency = 0.02, ringCount = 4 }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;

    // Helper to get CSS variables
    const getVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Simple noise-like function for organic movement
    const noise = (x, y, t) => {
      return (
        Math.sin(x * frequency + t) * 
        Math.cos(y * frequency - t) * 
        Math.sin((x + y) * frequency * 0.5 + t)
      );
    };

    const draw = () => {
      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Clear with background color
      ctx.fillStyle = getVar('--bg') || '#000';
      ctx.fillRect(0, 0, width, height);

      time += speed;

      for (let i = 1; i <= ringCount; i++) {
        const baseRadius = (Math.min(width, height) / ringCount) * i * 0.8;
        
        ctx.beginPath();
        // Cycle colors between bgl2 and bgl3
        ctx.strokeStyle = i % 2 === 0 ? getVar('--bgl2') : getVar('--bgl3');
        ctx.lineWidth = 1.5;

        for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
          const x = Math.cos(angle);
          const y = Math.sin(angle);
          
          // Displace the radius based on noise
          const distortion = noise(centerX + x * baseRadius, centerY + y * baseRadius, time);
          const r = baseRadius + distortion * 50; 

          const finalX = centerX + x * r;
          const finalY = centerY + y * r;

          if (angle === 0) ctx.moveTo(finalX, finalY);
          else ctx.lineTo(finalX, finalY);
        }

        ctx.closePath();
        ctx.stroke();
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [speed, frequency, ringCount]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} />
    </div>
  );
};

