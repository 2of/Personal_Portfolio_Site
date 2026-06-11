import React from "react";
import s from "./styles/headerstyles.module.scss";

export const StandardHeader = ({
  textb1,
  texthighlight,
  textb2,
  variant = "regular",
  rightChildren
}) => {
  switch (variant) {
    case "large":
      return (
        <div className={s.LargeTextHeader}>
          {textb1 && <h1>{textb1}</h1>}
          {texthighlight && <h1 className={s.highlight}>{texthighlight}</h1>}
          {textb2 && <h2>{textb2}</h2>}
          <div className={s.spacer} />
          {rightChildren}
        </div>
      );


    case "MatHeader": 

     return (
        <div className={s.MatHeader}>
          {textb1 && <h2>{textb1}</h2>}
          {texthighlight && <h1 className={s.highlight}>{texthighlight}</h1>}
          {textb2 && <h2>{textb2}</h2>}
          <div className={s.spacer} />
          {rightChildren}
        </div>
      );


    case "HeaderGlass":
      return (
        <div className={`${s.HeaderGlass} StandardBoxL2`}>
          {textb1 && <p>{textb1}</p>}
          {texthighlight && <p className={s.highlight}>{texthighlight}</p>}
          {textb2 && <p>{textb2}</p>}
          <div className={s.spacer} />
          {rightChildren}
        </div>
      );

    default:
      return (
        <div className={s.RegularHeader}>
          {textb1 && <p>{textb1}</p>}
          {texthighlight && <p className={s.highlight}>{texthighlight}</p>}
          {textb2 && <p>{textb2}</p>}
          <div className={s.spacer} />
          {rightChildren}
        </div>
      );
  }
};