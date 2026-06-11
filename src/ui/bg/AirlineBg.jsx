import { useEffect, useRef, useCallback, memo } from "react";

function rnd(a, b) { return a + Math.random() * (b - a); }

function createPlane(canvasW, canvasH, spawnedIn, baseSpeed) {
  const angle = rnd(0, Math.PI * 2);
  const turnRate = rnd(-0.003, 0.003);
  const speed = rnd(0.7, 1.4) * baseSpeed;
  const size = rnd(0.55, 1.35);
  const luminance = rnd(0.45, 1.0);

  let x, y;
  if (spawnedIn) {
    x = rnd(canvasW * 0.08, canvasW * 0.92);
    y = rnd(canvasH * 0.08, canvasH * 0.92);
  } else {
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) { x = rnd(0, canvasW); y = -20; }
    else if (edge === 1) { x = canvasW + 20; y = rnd(0, canvasH); }
    else if (edge === 2) { x = rnd(0, canvasW); y = canvasH + 20; }
    else { x = -20; y = rnd(0, canvasH); }
  }

  const trailLen = spawnedIn ? Math.floor(rnd(60, 240)) : 0;
  const trail = [];
  let bx = x, by = y, ba = angle;
  for (let i = trailLen; i > 0; i--) {
    trail.unshift({ x: bx, y: by });
    ba -= turnRate;
    bx -= Math.cos(ba) * speed;
    by -= Math.sin(ba) * speed;
  }
  trail.push({ x, y });

  return { x, y, angle, turnRate, speed, size, luminance, trail };
}

function drawPlaneShape(ctx, x, y, angle, size, luminance, dark) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);
  ctx.scale(size, size);

  const a = luminance;
  const wing     = dark ? `rgba(50,70,110,${a * 0.82})`   : `rgba(175,200,235,${a * 0.82})`;
  const tail     = dark ? `rgba(40,60,95,${a * 0.65})`    : `rgba(150,180,220,${a * 0.65})`;
  const fuselage = dark ? `rgba(30,50,90,${a})`           : `rgba(215,230,250,${a})`;
  const cockpit  = dark ? `rgba(20,35,70,${a * 0.55})`    : `rgba(235,248,255,${a * 0.55})`;

  ctx.beginPath(); ctx.fillStyle = wing;
  ctx.moveTo(-1.5,-1); ctx.lineTo(-10,3); ctx.lineTo(-10,5); ctx.lineTo(-1.5,2); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.fillStyle = wing;
  ctx.moveTo(1.5,-1); ctx.lineTo(10,3); ctx.lineTo(10,5); ctx.lineTo(1.5,2); ctx.closePath(); ctx.fill();

  ctx.beginPath(); ctx.fillStyle = tail;
  ctx.moveTo(-1.5,5); ctx.lineTo(-5,9); ctx.lineTo(-5,10); ctx.lineTo(-1.5,7); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.fillStyle = tail;
  ctx.moveTo(1.5,5); ctx.lineTo(5,9); ctx.lineTo(5,10); ctx.lineTo(1.5,7); ctx.closePath(); ctx.fill();

  ctx.beginPath(); ctx.fillStyle = fuselage;
  ctx.moveTo(0,-10); ctx.lineTo(1.5,-4); ctx.lineTo(1.5,6); ctx.lineTo(0,9); ctx.lineTo(-1.5,6); ctx.lineTo(-1.5,-4); ctx.closePath(); ctx.fill();

  ctx.beginPath(); ctx.fillStyle = cockpit;
  ctx.ellipse(0,-7,0.8,1.5,0,0,Math.PI*2); ctx.fill();

  ctx.restore();
}

function drawTrail(ctx, trail, luminance, size, dark) {
  if (trail.length < 2) return;

  const baseAlpha = luminance * 0.55 * Math.min(size, 1);
  const dashLen = 7 * Math.max(size, 0.6);
  const gapLen  = 5 * Math.max(size, 0.6);
  const lineW   = Math.max(0.5, size * 0.9);
  const rgb = dark ? "40,60,110" : "200,222,255";

  const bands = 5;
  const bSize = Math.ceil(trail.length / bands);

  for (let b = 0; b < bands; b++) {
    const start = b * bSize;
    const end = Math.min(start + bSize + 1, trail.length);
    if (end - start < 2) continue;

    const t = (b + 1) / bands;
    ctx.beginPath();
    ctx.setLineDash([dashLen, gapLen]);
    ctx.strokeStyle = `rgba(${rgb},${t * baseAlpha})`;
    ctx.lineWidth = lineW;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(trail[start].x, trail[start].y);
    for (let i = start + 1; i < end; i++) ctx.lineTo(trail[i].x, trail[i].y);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

const CANVAS_STYLE = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "block",
};

function BgAirline({ numPlanes = 41, planeSpeed = 0.6, dark = false }) {
  const canvasRef = useRef(null);
  const planesRef = useRef([]);
  const rafRef    = useRef(null);
  const propsRef  = useRef({ numPlanes, planeSpeed, dark });

  useEffect(() => {
    propsRef.current = { numPlanes, planeSpeed, dark };
  }, [numPlanes, planeSpeed, dark]);

  const initPlanes = useCallback((w, h) => {
    const { numPlanes: n, planeSpeed: sp } = propsRef.current;
    planesRef.current = Array.from({ length: n }, (_, i) =>
      createPlane(w, h, i < Math.floor(n * 0.65), sp)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initPlanes(canvas.width, canvas.height);

    // Isolated pure render cycle used for instant redraw injection
    const renderScene = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const planes = planesRef.current;
      const { numPlanes: n, planeSpeed: sp, dark: isDark } = propsRef.current;

      while (planes.length < n) planes.push(createPlane(w, h, true, sp));
      if (planes.length > n) planes.splice(n);

      for (let i = 0; i < planes.length; i++) {
        const p = planes[i];
        drawTrail(ctx, p.trail, p.luminance, p.size, isDark);
        drawPlaneShape(ctx, p.x, p.y, p.angle, p.size, p.luminance, isDark);
      }
    };

    // Subsequent resizes: update measurements AND draw immediately to avoid flash frames
    const ro = new ResizeObserver(() => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      renderScene(); 
    });
    ro.observe(canvas);

    const tick = () => {
      const planes = planesRef.current;
      const { numPlanes: n, planeSpeed: sp } = propsRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Update positions inside the regular game frame loop sequence
      for (let i = 0; i < planes.length; i++) {
        const p = planes[i];
        p.angle += p.turnRate;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        p.trail.push({ x: p.x, y: p.y });
        const maxTrail = Math.floor(300 * p.size);
        if (p.trail.length > maxTrail) p.trail.shift();

        const margin = 80 + 320 * p.size;
        if (p.x < -margin || p.x > w + margin || p.y < -margin || p.y > h + margin) {
          planes[i] = createPlane(w, h, false, sp);
        }
      }

      renderScene();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [initPlanes]);

  return <canvas ref={canvasRef} style={CANVAS_STYLE} />;
}

export default memo(BgAirline);