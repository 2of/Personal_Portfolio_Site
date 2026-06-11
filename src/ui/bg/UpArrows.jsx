import { useEffect, useRef } from "react";

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function generateDrops(count, seed, cw, ch) {
  const rand = seededRand(seed);
  return Array.from({ length: count }, () => {
    const size = 10 + rand() * 22;
    const depth = size / 32;
    return {
      x:         rand() * cw,
      y:         rand() * ch,
      size,
      speed:     (0.6 + rand() * 1.1) * (ch / 340),
      opacity:   0.18 + depth * 0.75,
      streakLen: size * (2.5 + rand() * 3),
    };
  });
}

export default function ScrollUpHintBG({ count = 4, seed = 9, color }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const CW  = canvas.offsetWidth;
    const CH  = canvas.offsetHeight;
    canvas.width  = CW * dpr;
    canvas.height = CH * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    let [r, g, b] = [136, 136, 136];
    if (color) {
      const m = color.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (m) [r, g, b] = [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16)];
    } else {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-text-primary").trim();
      const m = raw.replace("#","").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (m) [r, g, b] = [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16)];
    }

    const rand = seededRand(seed);
    const drops = generateDrops(count, seed, CW, CH);

    function drawArrow(x, y, size, alpha) {
      const hw = size * 0.48, hh = size * 0.3;
      ctx.beginPath();
      ctx.moveTo(x - hw, y + hh);
      ctx.lineTo(x,      y - hh);
      ctx.lineTo(x + hw, y + hh);
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth   = Math.max(1, size * 0.1);
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.stroke();
    }

    function drawStreak(x, y, size, streakLen, alpha) {
      const grad = ctx.createLinearGradient(x, y, x, y + streakLen);
      grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha * 0.55})`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.18})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + streakLen);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = Math.max(1, size * 0.07);
      ctx.lineCap     = "round";
      ctx.stroke();
    }

    function tick() {
      ctx.clearRect(0, 0, CW, CH);
      drops.forEach(d => {
        d.y -= d.speed;
        if (d.y + d.streakLen < -10) {
          d.y = CH + d.size;
          d.x = rand() * CW;
        }
        drawStreak(d.x, d.y + d.size * 0.3, d.size, d.streakLen, d.opacity);
        drawArrow(d.x, d.y, d.size, d.opacity);
      });
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [count, seed, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Scroll up"
      role="img"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}