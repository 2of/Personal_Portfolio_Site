import React from "react";
import s from "./styles/headerstyles.module.scss";

export const StandardHeader = ({
  textb1,
  texthighlight,
  textb2,
  variant = "regular",
  rightChildren
}) => {
  const wrapperClass =
    variant === "large" ? s.LargeTextHeader : s.RegularHeader;

  return (
    <div className={wrapperClass}>
      {textb1 && <p>{textb1}</p>}
      {texthighlight && <p className={s.highlight}> 
{texthighlight}</p>}
      {textb2 && <p>{textb2}</p>}
      <div className={s.spacer}/>
      {rightChildren}
    </div>
  );
};
