import React from "react";
import cx from "clsx";
import s from "./styles/timeline.module.scss";

export const TimeLineContainer = ({
  children,
  animated = false,
  variant = "solid",
  align = "left",
}) => {
  return (
    <div
      className={cx(
        s.timeline,
        s[`variant-${variant}`],
        s[`align-${align}`],
        animated && s.animated
      )}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        return (
          <div
            className={s.item}
            style={animated ? { "--i": index } : undefined}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
