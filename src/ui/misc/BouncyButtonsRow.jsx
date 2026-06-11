import React, { useRef, useCallback } from "react";
import styles from "./styles/BouncyButtons.module.scss";

const sp = (cur, tar, vel, k, d, dt) => {
  const nv = (vel + (tar - cur) * k * dt) * Math.pow(d, dt);
  return { v: cur + nv * dt, vel: nv };
};

export const BouncyButtonRow = ({
  buttons,
  animationSpeed = 1.4,
  variant = "default",

  KP = 0.22,
  KS = 0.28,
  DP = 0.55,
  DS = 0.50,
  scaleImpulse = 0.8,
  speedFactor = 0.4,
  neighbour1 = 0.55,
  neighbour2 = 0.20,
}) => {
  const isTab = variant === "tab";

  // Calculated constants from props there
  const activeKP = KP * animationSpeed;
  const activeKS = KS * animationSpeed;

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(null);
  const state = useRef({
    px: 0, pw: 0, vx: 0, vw: 0,
    scX: 1, vscX: 0, scY: 1, vscY: 0,
    tx: 0, tw: 0, activeIdx: -1, lastTime: 0,
  });

  const getRect = (el) => {
    if (!containerRef.current || !el) return null;
    const nr = containerRef.current.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return { left: er.left - nr.left, width: er.width };
  };

  const pushNeighbours = (idx, amt) => {
    itemRefs.current.forEach((el, i) => {
      if (!el || i === idx) return;
      const dist = Math.abs(i - idx);
      const dir = i < idx ? -1 : 1;
      const mag = dist === 1 ? amt * neighbour1 : dist === 2 ? amt * neighbour2 : 0;
      el.style.transform =
        Math.abs(mag) > 0.02 ? `translateX(${(dir * mag).toFixed(2)}px)` : "";
    });
  };

  const tick = useCallback(() => {
    const s = state.current;
    const now = performance.now();
    const dt = Math.min((now - s.lastTime) / 16.66, 3.0);
    s.lastTime = now;

    const rx = sp(s.px, s.tx, s.vx, activeKP, DP, dt); s.px = rx.v; s.vx = rx.vel;
    const rw = sp(s.pw, s.tw, s.vw, activeKP, DP, dt); s.pw = rw.v; s.vw = rw.vel;

    const speed = isTab
      ? Math.abs(s.vscX) * speedFactor
      : Math.abs(s.vx) * 0.02 + Math.abs(s.vw) * 0.01;

      // okay so this is bad

    const tScX = 1 + speed;
    const tScY = 1 / (tScX * 0.65 + 0.35);

    const rsx = sp(s.scX, tScX, s.vscX, activeKS, DS, dt); s.scX = rsx.v; s.vscX = rsx.vel;
    const rsy = sp(s.scY, tScY, s.vscY, activeKS, DS, dt); s.scY = rsy.v; s.vscY = rsy.vel;

    if (s.activeIdx !== -1) {
      const activeEl = itemRefs.current[s.activeIdx];
      if (activeEl) {
        activeEl.style.transform = `scaleX(${s.scX.toFixed(4)}) scaleY(${s.scY.toFixed(4)})`;
      }
      pushNeighbours(s.activeIdx, (s.scX - 1) * s.pw * 0.9);
    }

    const settled =
      Math.abs(s.scX - 1) < 0.001 && Math.abs(s.vscX) < 0.001 &&
      Math.abs(s.px - s.tx) < 0.005 && Math.abs(s.vx) < 0.005;

    if (settled) {
      rafRef.current = null;
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [activeKP, activeKS, DP, DS, isTab, speedFactor]);

  const handleInteraction = (idx, callback) => {
    const s = state.current;
    const r = getRect(itemRefs.current[idx]);
    s.activeIdx = idx;
    s.tx = r.left;
    s.tw = r.width;

    if (isTab) {
      s.vscX += scaleImpulse;
    } else {
      s.vx += 12;
    }

    if (!rafRef.current) {
      s.lastTime = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
    if (callback) callback();
  };

  return (
    <div className={`${styles.rowContainer} ${styles[variant]}`} ref={containerRef}>
      {buttons.map((btn, i) => (
        <button
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          className={`${styles.deformButton} ${isTab ? styles.tab : ""} ${btn.isActive ? styles.highlight : ""}`}
          onClick={() => handleInteraction(i, btn.callback)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};