import { useEffect, useRef, useState, Children } from "react";

/**
 * AnimatedRows
 *
 * Props:
 *   children  — each direct child becomes an animated row
 *   effect    — "drop" | "fade" | "flip3d" | "confetti"   (default: "drop")
 *   replay    — change this value to re-trigger the animation
 *   stagger   — ms between rows (default: 80)
 *   style     — optional wrapper styles
 *   className — optional wrapper class
 */
export default function AnimatedRowView({
  children,
  effect = "drop",
  replay = 0,
  stagger = 80,
  style,
  className,
}) {
  const [animKey, setAnimKey] = useState(0);
  const prev = useRef({ replay, effect });

  useEffect(() => {
    if (replay !== prev.current.replay || effect !== prev.current.effect) {
      setAnimKey((k) => k + 1);
      prev.current = { replay, effect };
    }
  }, [replay, effect]);

  useEffect(() => {
    if (effect === "confetti") fireConfetti();
  }, [animKey, effect]);

  const rows = Children.toArray(children);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div role="list" className={className} style={style}>
        {rows.map((child, i) => (
          <AnimatedRow
            key={`${animKey}-${i}`}
            delay={i * stagger}
            effect={effect}
          >
            {child}
          </AnimatedRow>
        ))}
      </div>
    </>
  );
}

function AnimatedRow({ children, delay, effect }) {
  const ref = useRef(null);
  const cfg = EFFECTS[effect] ?? EFFECTS.drop;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.animation = "none";

    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.animation = `${cfg.keyframe} ${cfg.duration}ms ${cfg.easing} both`;
    }, delay);

    return () => clearTimeout(t);
  }, [delay, cfg]);

  return (
    <div ref={ref} role="listitem" style={{ opacity: 0 }}>
      {children}
    </div>
  );
}


const EFFECTS = {
  drop: {
    keyframe: "__ar-drop-bounce",
    duration: 560,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  fade: {
    keyframe: "__ar-fade-drop",
    duration: 480,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  flip3d: {
    keyframe: "__ar-card-flip",
    duration: 620,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  confetti: {
    keyframe: "__ar-drop-bounce",
    duration: 560,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
};


const KEYFRAMES = `
  @keyframes __ar-drop-bounce {
    0%   { transform: translateY(-32px); opacity: 0; }
    55%  { transform: translateY(5px);   opacity: 1; }
    75%  { transform: translateY(-3px);              }
    90%  { transform: translateY(1px);               }
    100% { transform: translateY(0);     opacity: 1; }
  }

  @keyframes __ar-fade-drop {
    0%   { transform: translateY(-10px); opacity: 0; }
    100% { transform: translateY(0);     opacity: 1; }
  }

  @keyframes __ar-card-flip {
    0%   { transform: perspective(600px) rotateX(-70deg) translateY(-20px); opacity: 0; transform-origin: top center; }
    60%  { transform: perspective(600px) rotateX(6deg)   translateY(3px);   opacity: 1; transform-origin: top center; }
    80%  { transform: perspective(600px) rotateX(-2deg)  translateY(0);                 transform-origin: top center; }
    100% { transform: perspective(600px) rotateX(0deg)   translateY(0);     opacity: 1; transform-origin: top center; }
  }
`;



// stackoverflow go brrr...
// is on ful lscreen... 
const CONFETTI_COLORS = ["#378ADD","#1D9E75","#D85A30","#D4537E","#BA7517","#534AB7"];

function fireConfetti() {
  const existing = document.getElementById("__ar-confetti-canvas");
  if (existing) existing.remove();

  const canvas = document.createElement("canvas");
  canvas.id = "__ar-confetti-canvas";
  Object.assign(canvas.style, {
    position: "fixed", inset: "0", pointerEvents: "none",
    zIndex: "9999", width: "100%", height: "100%",
  });
  document.body.appendChild(canvas);

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const particles = Array.from({ length: 90 }, () => ({
    x:    Math.random() * canvas.width,
    y:    -10 - Math.random() * 60,
    vx:   (Math.random() - 0.5) * 3,
    vy:   2.5 + Math.random() * 3,
    size: 5 + Math.random() * 6,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rot:  Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.18,
    isRect: Math.random() > 0.4,
    opacity: 1,
  }));

  let raf;

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.rot += p.rotV;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.isRect) {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    raf = requestAnimationFrame(tick);
  }

  tick();

  setTimeout(() => {
    const interval = setInterval(() => {
      particles.forEach((p) => { p.opacity = Math.max(0, p.opacity - 0.025); });
      if (particles.every((p) => p.opacity === 0)) {
        clearInterval(interval);
        cancelAnimationFrame(raf);
        canvas.remove();
      }
    }, 30);
  }, 1600);
}