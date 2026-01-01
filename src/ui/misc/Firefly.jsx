import { useEffect, useRef } from "react";


export function Firefly({ count = 20 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fill parent
    const resize = () => {
      canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resize();
    window.addEventListener("resize", resize);

    // Create fireflies in 3D space
    const fireflies = Array.from({ length: count }).map(() => ({
      radius: Math.random() * 80 + 50, // distance from center
      angle: Math.random() * Math.PI * 2,
      height: Math.random() * 40 - 20, // z-axis / depth
      speed: Math.random() * 0.01 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame;

    const loop = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.fillStyle = "rgba(0,0,0,0.08)";
    //   ctx.fillRect(0, 0, width, height);

      fireflies.forEach((f) => {
        // Orbit in circular path
        f.angle += f.speed;
        f.phase += 0.03;

        // 3D to 2D projection
        const cx = width / 2;
        const cy = height / 2;
        const x = cx + Math.cos(f.angle) * f.radius;
        const y = cy + Math.sin(f.angle) * f.radius + f.height;
        const pulse = (Math.sin(f.phase) + 1) * 0.5;

        // Draw glow
        ctx.beginPath();
        ctx.arc(x, y, 2 + pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,160,${0.5 + pulse * 0.5})`;
        ctx.fill();
      });

      // Optional: draw lines to nearby fireflies
      fireflies.forEach((f, i) => {
        fireflies.forEach((o, j) => {
          if (i === j) return;
          const cx = width / 2;
          const cy = height / 2;

          const fx = cx + Math.cos(f.angle) * f.radius;
          const fy = cy + Math.sin(f.angle) * f.radius + f.height;

          const ox = cx + Math.cos(o.angle) * o.radius;
          const oy = cy + Math.sin(o.angle) * o.radius + o.height;

          const dx = fx - ox;
          const dy = fy - oy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60 && Math.random() < 0.01) {
            ctx.strokeStyle = "rgba(255,255,180,0.12)";
            ctx.beginPath();
            ctx.moveTo(fx, fy);
            ctx.lineTo(ox, oy);
            ctx.stroke();
          }
        });
      });

      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
