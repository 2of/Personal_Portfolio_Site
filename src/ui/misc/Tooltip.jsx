import React, { useEffect, useRef, useState } from "react";
import s from "./styles/Tooltip.module.scss";
import { useTooltip } from "../../contexts/ToolTipContext";

export const ToolTip = () => {
  const { tooltip } = useTooltip();
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x-28}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    setVisible(!!tooltip);
  }, [tooltip]);

  useEffect(() => {
    if (!tooltip) return;
    if (displayText === "") {
      setDisplayText(tooltip);
      return;
    }
    if (tooltip !== displayText) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplayText(tooltip);
        setFlipping(false);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [tooltip]);

  return (
    <div ref={ref} className={s.Tooltip} aria-hidden="true">
      <div className={`${s.Inner} ${visible ? s.visible : ""} ${flipping ? s.flipping : ""}`}>
        <div className={s.Dot} />
        <span className={s.Text}>{displayText}</span>
      </div>
    </div>
  );
};