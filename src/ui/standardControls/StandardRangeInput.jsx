import React from "react";
import s from "./styles/standardRangeInput.module.scss";

export const StandardRangeInput = ({
  lowerbound = 0,
  upperbound = 100,
  value,
  showPreview = false,
  snaponEvery,
  updatefunc,
  variant = "default",
  title,
}) => {
  const pct = ((value - lowerbound) / (upperbound - lowerbound)) * 100;

  return (
    <div className={`${s.outer} ${s[variant]}`}>
      {title && (
        <div className={s.header}>
          <span className={s.title}>{title}</span>
          {showPreview && <span className={s.preview}>{value}</span>}
        </div>
      )}
      <div className={s.wrapper}>
        <div className={s.track}>
          <div className={s.fill} style={{ width: `${pct}%` }} />
          <input
            className={s.input}
            type="range"
            min={lowerbound}
            max={upperbound}
            step={snaponEvery ?? "any"}
            value={value}
            onChange={(e) => updatefunc(Number(e.target.value))}
          />
        </div>
        {!title && showPreview && (
          <span className={s.preview}>{value}</span>
        )}
      </div>
    </div>
  );
};