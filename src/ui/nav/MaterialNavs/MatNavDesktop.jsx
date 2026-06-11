import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import styles from "./MatNacDesktop.module.scss";
import { getLink } from "../../../helpers/GetLink";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";
import { useNavStack } from "../../../contexts/NavigationButtonsStack";
import { Logo } from "../../misc/Logo";
import { DarkModeAnimatedWithCoolDownToastButton, DarkModeWrapper } from "../../wrappers/DarkModeWrapper";
import { usePageTransition } from "../../../contexts/PageTransition";
import { useNav } from "../../../contexts/NavContext";

// ik these look good 
const COLORS = ["#CECBF6", "#9FE1CB", "#F4C0D1", "#FAC775", "#85B7EB"];
// uses some spring funcs
// includes hookes function ? ( per wikipedia ;) 
//  I learned a bit about animations here... uhhh.. no still dont really get it

/// really basic overview is this:

// we use spring fucntion to calculate how quickly the outside edges are moving:
// then we shove that off to the two adjacnet (though it also affects n platters) beside 
// the main platter.

// there's also this maths (copy paste from wiki doesnt work  1 / tsx * scale 1 + scale 2 (simple) to calc y chagnge due to compression
//const mag = dist === 1 ? amt * 0.55 : dist === 2 ? amt * 0.22 : dist === 3 ? amt * 0.08 : 0; is 
// use for the ripple efefct here



// const ANIMATION_SPEED = 1.2;
// const KP = 0.07 * ANIMATION_SPEED, DP = 0.78; // Position track springs
// const KS = 0.12 * ANIMATION_SPEED, DS = 0.74; // Scale distor springs (squish/stretch)

const externalLinks = [
  { title: "GitHub", icon: "github", url: getLink("github") },
  { title: "resume", icon: "resume", url: getLink("resume") },
  { title: "LinkedIn", icon: "linkedin", url: getLink("linkedin") }
];

// Semi-implicit Euler integration for the spring physics. 
// No, I dont know precisely how this work sat all, 
// did it get pinched from codepen ?
// well maybe ... 
// cur = current, tar = target, vel = velocity, k = stiffness, d = damping, dt = delta time
function sp(cur, tar, vel, k, d, dt) {

  // spring damper calc new velocity
  // so cur  val (x or y who cares, tar is next (ie 300 px or something, vel , k and d from above, dt  time sinve frame 16.666666 or whateve rusually))
  const nv = (vel + (tar - cur) * k * dt) * Math.pow(d, dt);
  return { v: cur + nv * dt, vel: nv };
}

export const MaterialNav = (
  {
    
    ANIMATION_SPEED = 1.4,
    SuppliedRoutes,
    overrideposition = false,
    dontactuallynav
  }

  
) => {
  const location = useLocation();
  const navigate = useNavigate();
   const { navDetails } = useNav();

  let KP = 0.07 * ANIMATION_SPEED
  let KS = 0.12 * ANIMATION_SPEED
  let DP = 0.78
  let DS = 0.74
  

  const desktopRoutes = SuppliedRoutes || routes.filter((x) => x.expose_desktop_nav);
  const activeIdx = desktopRoutes.findIndex((r) => location.pathname === r.path);
  

  const isMissingRoute = activeIdx === -1 && location.pathname !== "/";
  const displayRoutes = isMissingRoute 
    ? [...desktopRoutes, { path: navDetails.path , title: "Scene", icon: "up" }] 
    : desktopRoutes;

  const { allComponents, hasCustomComponents } = useNavStack();
  const { startTransition, transitionState } = usePageTransition();
  
  // DOM targets for direct mutation (bypassing React re-renders for 60fps animations)
  const navRef = useRef(null);
  const navBgRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(null);

  // Core physics state bucket. Keeps values out of React state to prevent render loops.
  const state = useRef({
    px: 0, pw: 0, vx: 0, vw: 0,          // Pos X, Pos Width, Vel X, Vel Width
    scX: 1, 
    vscX: 0, 
    scY: 1,     // scaly is S, velocity V, px, py position, t target etc 
    vscY: 0,    // Scale values and velocities for squish effect
    tx: 0, tw: 0,                        // Target X and Target Width
    currentIdx: activeIdx === -1 ? (isMissingRoute ? displayRoutes.length - 1 : -1) : activeIdx,
    lastTime: 0
  });

  // Helper to calculate target element offsets relative to the parent nav container
  const getNavRect = useCallback((el) => {
    if (!navRef.current || !el) return null;
    const nr = navRef.current.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return { left: er.left - nr.left, width: er.width };
  }, []);

  // Pushes adjacent items outward depending on how fast/wide the main capsule is stretching.

  // shoulllld be dynamic 
  const pushNeighbours = useCallback((idx, amt) => {
    if (idx === -1) return;
    itemRefs.current.forEach((el, i) => {
      if (!el || i === idx) return;
      const dist = Math.abs(i - idx);
      const dir = i < idx ? -1 : 1;
      // Dropoff math so items far away don't jitter (idk magic )
      const mag = dist === 1 ? amt * 0.55 : dist === 2 ? amt * 0.22 : dist === 3 ? amt * 0.08 : 0;
      el.style.transform = Math.abs(mag) > 0.02 ? `translateX(${(dir * mag).toFixed(2)}px) translateZ(0)` : "";
    });
  }, []);

  // Main animation ticker loop runs on requestAnimationFrame
  const tick = useCallback(() => {
    const s = state.current;
    const now = performance.now();
    if (!s.lastTime) s.lastTime = now;
    // Cap dt at 3.0 frames max to avoid massive physics explosions if the browser lag-spikes
    const dt = Math.min((now - s.lastTime) / 16.666, 3.0);
    s.lastTime = now;

    // Run the spring equations for X position and width
    const rx = sp(s.px, s.tx, s.vx, KP, DP, dt); s.px = rx.v; s.vx = rx.vel;
    const rw = sp(s.pw, s.tw, s.vw, KP, DP, dt); s.pw = rw.v; s.vw = rw.vel;

    // Calculate dynamic squish based on current moving velocities
    const speed = Math.abs(s.vx) * 0.009 + Math.abs(s.vw) * 0.004;
    const tScX = 1 + speed;
    const tScY = 1 / (tScX * 0.55 + 0.45); // Inverse scaling keeps the volume looking consistent ;_ 

    // Smoothly spring the scale factors towards the calculated target squish
    const rsx = sp(s.scX, tScX, s.vscX, KS, DS, dt); s.scX = rsx.v; s.vscX = rsx.vel;
    const rsy = sp(s.scY, tScY, s.vscY, KS, DS, dt); s.scY = rsy.v; s.vscY = rsy.vel;

    // Mutate the active tab styles inline
    if (s.currentIdx !== -1) {
      const activeEl = itemRefs.current[s.currentIdx];
      if (activeEl) {
        activeEl.style.transform = `scaleX(${s.scX.toFixed(4)}) scaleY(${s.scY.toFixed(4)}) translateZ(0)`;
      }
      pushNeighbours(s.currentIdx, (s.scX - 1) * s.pw * 0.85);

      // Distort the backdrop track slightly along with it for added juice
      if (navBgRef.current) {
        const platterMorphX = 1 + (s.scX - 1) * 0.18;
        const platterMorphY = 1 + (s.scY - 1) * 0.12;
        navBgRef.current.style.transform = `scaleX(${platterMorphX.toFixed(4)}) scaleY(${platterMorphY.toFixed(4)}) translateZ(0)`;
      }

      // Kinematic reaction: Shove the logo and right-hand links out of the way when the pill gets too wide
      const expansionImpulse = (s.scX - 1) * s.pw * 0.12;
      const motionVelocityLeft = s.vx < 0 ? s.vx * 0.35 : s.vx * 0.1;
      const motionVelocityRight = s.vx > 0 ? s.vx * 0.35 : s.vx * 0.1;

      if (logoRef.current) logoRef.current.style.transform = `translateX(${-expansionImpulse + motionVelocityLeft}px) translateZ(0)`;
      if (linksRef.current) linksRef.current.style.transform = `translateX(${expansionImpulse + motionVelocityRight}px) translateZ(0)`;
    }

    // Check if everything has settled closely enough to rest parameters to kill the RAF loop
    const settled = Math.abs(s.px - s.tx) < 0.01 && Math.abs(s.pw - s.tw) < 0.01 && Math.abs(s.vx) < 0.01 && Math.abs(s.vw) < 0.01;
    if (settled) {
      // Hard cleanup: Wipe inline transforms so layout handles resizing normally again
      itemRefs.current.forEach((el) => { if (el) el.style.transform = ""; });
      if (navBgRef.current) navBgRef.current.style.transform = "";
      if (logoRef.current) logoRef.current.style.transform = "";
      if (linksRef.current) linksRef.current.style.transform = "";
      rafRef.current = null;
      s.lastTime = 0;
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [pushNeighbours]);

  // Safely kick off the fucked loop if it isn't running already 
  const startAnimationLoop = useCallback(() => {
    state.current.lastTime = performance.now();
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // Sets up targets and initial velocities when moving between tabs
  const animateTo = useCallback((idx, prevIdx) => {
    const s = state.current;
    s.currentIdx = idx;
    if (itemRefs.current[prevIdx]) itemRefs.current[prevIdx].style.transform = "";
    if (idx === -1) return;
    const r = getNavRect(itemRefs.current[idx]);
    if (!r) return;
    const dir = idx > prevIdx ? 1 : -1;
    s.vx += dir * 12; // Shove velocity in direction of travel
    s.vw += Math.abs(idx - prevIdx) * 2.5; // Stretch more if skipping multiple tabs
    s.tx = r.left;
    s.tw = r.width;
    startAnimationLoop();
  }, [getNavRect, startAnimationLoop]);

  // Click bounce reaction if clicking the already active tab
  const punch = useCallback(() => {
    const s = state.current;
    if (s.currentIdx === -1) return;
    s.scX = 1.1; s.scY = 0.85; s.vscX = 0; s.vscY = 0; // Force immediate heavy distortion values
    startAnimationLoop();
  }, [startAnimationLoop]);

  // Sync initial pill sizes on initial mount
  useEffect(() => {
    if (state.current.currentIdx === -1) return;
    const el = itemRefs.current[state.current.currentIdx];
    if (!el) return;
    const r = getNavRect(el);
    if (!r) return;
    state.current.px = r.left; state.current.pw = r.width;
    state.current.tx = r.left; state.current.tw = r.width;
  }, []);

  // Listen to router changes to trigger transition animations automatically
  useEffect(() => {
    const prev = state.current.currentIdx;
    const newIdx = isMissingRoute ? displayRoutes.length - 1 : activeIdx;
    if (newIdx !== prev) animateTo(newIdx, prev);
  }, [activeIdx, location.pathname, animateTo]);

  const [currentHighlight, setCurrentHighlight] = useState(-1);
  const handleNav = (route) => { 
    if (dontactuallynav) { 
      return
    } navigate(route.path)
  }

  const [isOverflowPlatterVisible, setOverflowPlatterVisible] = useState(false) 
  const handleOverFlowPlatterChange = () => { 
    setOverflowPlatterVisible(!isOverflowPlatterVisible)
  }

  return (
    <div className={`${styles.platter} ${overrideposition && styles.freePlace}`}>
      <div className={`${styles.nav} ${styles.logoPlatter} MaterialNav`} ref={logoRef}><Logo/></div>
      <nav className={styles.navWrapper} ref={navRef}>
        <div className={`${styles.navBackground} MaterialNav`} ref={navBgRef} />
        <div className={styles.navContent}>
          {displayRoutes.map((route, i) => {
            const isDynamic = isMissingRoute && i === displayRoutes.length - 1;
            const isActive = isDynamic ? true : i === activeIdx;
            const isHovered = i === currentHighlight;
            const isSomethingElseHovered = currentHighlight !== -1 && currentHighlight !== (isMissingRoute ? displayRoutes.length - 1 : activeIdx);
            
            const baseColor = COLORS[i % COLORS.length];
            let backgroundColor = "transparent";
            
            // Messy opacity blending math for cross-hovering highlights
            if (isActive) {
              backgroundColor = isSomethingElseHovered ? baseColor + "66" : baseColor + "CC";
            } else if (isHovered) {
              backgroundColor = baseColor + "40";
            }

            return (
              <div
                key={route.path}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`${styles.navItem} ${isActive ? styles.active : ""} ${isDynamic ? styles.popIn : ""}`}
                style={{ backgroundColor }}
                role="button"
                onMouseEnter={() => setCurrentHighlight(i)}
                onMouseLeave={() => setCurrentHighlight(-1)}
                onClick={() => handleNav(route)}
                // onClick={() => startTransition(route.path)}
                onMouseDown={() => { if (isActive) punch(); }}
              >
                {getIcon(route.icon)}

                
                {/* <span className={styles.label}>{route.title}</span> */}
              </div>
            );
          })}
        </div>
      </nav>
      <nav className={`${styles.nav} MaterialNav`} ref={linksRef}>
        
        {externalLinks.map((link, i) => (
          <a
            key={`ext-${i}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className={`${styles.navItem} ${styles.iconOnly}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {getIcon(link.icon)}
          </a>
        ))}

        {/* <DarkModeWrapper/> */}
        <DarkModeAnimatedWithCoolDownToastButton icon={getIcon("test")} buttonvariantstr={"nav_IconOnly"} darkstr=".dark" lightstr=".light" />
      

      
      {hasCustomComponents &&
      <ModernButton
      variant="nav_IconOnly"
        callback={() => handleOverFlowPlatterChange()}
      
        icon={getIcon("up")}
      />}
      
      </nav>

  

      {hasCustomComponents && isOverflowPlatterVisible && (

<>


          {allComponents.map((C, i) => (
            <div key={i} className={styles.customWrapper}>
              {C}
            </div>
          ))}

          </>
      )}
    </div>
  );
};