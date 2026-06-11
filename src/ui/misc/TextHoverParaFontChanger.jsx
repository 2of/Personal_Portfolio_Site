import { useEffect, useRef, useCallback } from "react";

const ALT_FONTS = [
//   '"Courier New", monospace',
//   "Impact, fantasy",
//   '"Comic Sans MS", cursive',
//   '"Trebuchet MS", sans-serif',
  '"Times New Roman", serif',
//   '"Lucida Console", monospace',
];

const BASE_FONT = '"EB Garamond", Georgia, serif';

/**
 * HauntedText
 *
 * Props:
 *   text       {string}  – the paragraph content
 *   fontSize   {number}  – base font size in px (default 22)
 */
export default function TextHoverFontChangePara({ text = "", fontSize = 22 }) {
  const ghostRef = useRef(null);
  const stageRef = useRef(null);

  const build = useCallback(() => {
    const ghost = ghostRef.current;
    const stage = stageRef.current;
    if (!ghost || !stage) return;

    ghost.innerHTML = "";
    stage.innerHTML = "";

    const spans = Array.from(text).map((ch) => {
      const s = document.createElement("span");
      s.style.cssText = "display:inline;white-space:pre-wrap;";
      s.textContent = ch;
      ghost.appendChild(s);
      return { s, ch };
    });

    ghost.style.visibility = "visible";
    void ghost.offsetHeight;

    const originRect = ghost.getBoundingClientRect();
    let maxBottom = 0;

    spans.forEach(({ s, ch }) => {
      const r = s.getBoundingClientRect();
      const bottom = r.bottom - originRect.top;
      if (bottom > maxBottom) maxBottom = bottom;

      if (ch === " " || ch === "\u00A0" || r.width < 0.5) return;

      const top = r.top - originRect.top;
      const left = r.left - originRect.left;

      const div = document.createElement("div");
      div.textContent = ch;
      div.style.cssText = [
        "position:absolute",
        `top:${top}px`,
        `left:${left}px`,
        `width:${r.width}px`,
        `height:${r.height}px`,
        `line-height:${r.height}px`,
        "text-align:center",
        "cursor:default",
        "color:inherit",
        "font-family:inherit",
        "font-size:inherit",
        "overflow:visible",
      ].join(";");

      let timer = null;

      div.addEventListener("mouseenter", () => {
        clearTimeout(timer);

        if (Math.random() < 0.5) {
          // font swap — character stays, font changes
          div.style.fontFamily = ALT_FONTS[Math.floor(Math.random() * ALT_FONTS.length)];
          div.textContent = ch;
        } else {
          // scramble — random same-case letter in a random font
          const lo = "abcdefghijklmnopqrstuvwxyz";
          const hi = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          const isCap = ch >= "A" && ch <= "Z";
          div.textContent = (isCap ? hi : lo)[Math.floor(Math.random() * 26)];
          div.style.fontFamily = ALT_FONTS[Math.floor(Math.random() * ALT_FONTS.length)];
        }
      });

      div.addEventListener("mouseleave", () => {
        timer = setTimeout(() => {
          div.style.fontFamily = "inherit";
          div.textContent = ch;
        }, 80 + Math.random() * 180);
      });

      stage.appendChild(div);
    });

    ghost.style.visibility = "hidden";
    stage.style.height = maxBottom + "px";
  }, [text, fontSize]);

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(build);
    } else {
      window.addEventListener("load", build, { once: true });
    }

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [build]);

  const sharedStyle = {
    fontFamily: BASE_FONT,
    fontSize: `${fontSize}px`,
    lineHeight: 1.9,
    userSelect: "none",
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={ghostRef}
        aria-hidden="true"
        style={{ ...sharedStyle, visibility: "hidden", pointerEvents: "none" }}
      />
      <div
        ref={stageRef}
        style={{ ...sharedStyle, position: "relative" }}
      />
    </div>
  );
}