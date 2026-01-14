// aboutpage/support.jsx
import s from "./aboutPage.module.scss";

export function GetElTextEls({ elements = [] }) {
  return (
    <span className={s.textContainer}>
      {elements.map((item, index) => (
        <span
          key={index}
          className={item.highlight ? s.highlight : s.text}
        >
          {item.content}
        </span>
      ))}
    </span>
  );
}
