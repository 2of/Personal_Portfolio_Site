import React, { useMemo } from "react";
import s from "./styles/TagList.module.scss";
import getIcon from "../../tools/iconRef";

const HOVER_TRANSFORMS = [
  "translateY(-3px) rotate(-1.5deg)",
  "translateY(-4px) rotate(1deg)",
  "translateY(-2px) rotate(-2deg) scale(1.03)",
  "translateY(-5px) rotate(0.5deg)",
  "translateY(-3px) scale(1.04) rotate(1.5deg)",
  "translateY(-4px) rotate(-1deg) scale(1.02)",
  "translateY(-2px) rotate(2deg)",
  "translateY(-4px) scale(1.03) rotate(-0.5deg)",
];

// fallback palette — background, text, border, iconBg
const PALETTE = [
  { bg: "#ede8f5", color: "#5b3fa6", border: "#d8ceee", iconBg: "#7c5cbf" },
  { bg: "#fce8f0", color: "#b5275e", border: "#f5cede", iconBg: "#c2366e" },
  { bg: "#e6f4ea", color: "#276b34", border: "#c2e5cb", iconBg: "#2e7d3c" },
  { bg: "#fef3e2", color: "#b85c00", border: "#f5dec4", iconBg: "#c46800" },
  { bg: "#e8f0fe", color: "#1a56b0", border: "#c2d4f5", iconBg: "#2060c0" },
  { bg: "#fde8e8", color: "#b52626", border: "#f5c8c8", iconBg: "#c03030" },
  { bg: "#e4f4f2", color: "#1a6b60", border: "#b8e4e0", iconBg: "#1e7a6e" },
  { bg: "#fef9e2", color: "#8a6800", border: "#f0e4a8", iconBg: "#967200" },
];

// derive tinted bg/border from a given hex colour
const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0,2), 16);
  const g = parseInt(h.slice(2,4), 16);
  const b = parseInt(h.slice(4,6), 16);
  return { r, g, b };
};

const deriveStyles = (color) => {
  const { r, g, b } = hexToRgb(color);
  return {
    bg: `rgba(${r},${g},${b},0.12)`,
    color,
    border: `rgba(${r},${g},${b},0.3)`,
    iconBg: color,
  };
};

const BadgeItem = ({ item, index }) => {
  const hoverTransform = HOVER_TRANSFORMS[index % HOVER_TRANSFORMS.length];
  const palette = item.color
    ? deriveStyles(item.color)
    : PALETTE[index % PALETTE.length];

  const handleMouseEnter = (e) => { e.currentTarget.style.transform = hoverTransform; };
  const handleMouseLeave = (e) => { e.currentTarget.style.transform = ""; };

  return (
    <span
      className={`${s.item} ${s.badge}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: palette.bg,
        color: palette.color,
        borderColor: palette.border,
      }}
    >
      <span
        className={s.iconWrap}
        aria-hidden="true"
        // style={{ background: palette.iconBg }} // for contrast maybe
      >
        {item.icon ? getIcon(item.icon) : null}
      </span>
      <span className={s.label}>{item.label}</span>
    </span>
  );
};

const TagItem = ({ item, index }) => {
  const palette = item.color
    ? deriveStyles(item.color)
    : PALETTE[index % PALETTE.length];

  return (
    <span
      className={`${s.item} ${s.tag}`}
      style={{
        background: palette.bg,
        color: palette.color,
        borderColor: palette.border,
      }}
    >
      {item.icon && (
        <span className={s.inlineIcon} aria-hidden="true">
          {getIcon(item.icon)}
        </span>
      )}
      <span className={s.label}>{item.label}</span>
    </span>
  );
};

export const TagList = ({ tags = [], variant = "tag" }) => {
  return (
    <div className={`${s.TagList} ${variant === "badge" ? s.badgeList : ""}`}>
      {tags.map((item, i) =>
        variant === "badge"
          ? <BadgeItem key={i} item={item} index={i} />
          : <TagItem   key={i} item={item} index={i} />
      )}
    </div>
  );
};