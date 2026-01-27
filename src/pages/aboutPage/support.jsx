// aboutpage/support.jsx
import { useTransition } from "react";
import { useLinks } from "../../contexts/LinksContext";
// import { useNavigateTo } from "../../hooks/useNavigate";
import s from "./aboutPage.Desktop.module.scss";


export function GetElTextEls({ elements = [] }) {

  // const navigateTo = useNavigateTo();

  return (
    <span className={s.textContainer}>
      {elements.map((item, index) => {
  if (item.to) {
    return <span
       className={s.link}
      //  onClick={() => navigateTo(item.to)}
      // onClick={() => alert("TEST")}
       >

      {item.content}

      {/* {item.to} */}
    </span>
  }

  return (
    <span
      key={index}
      className={item.highlight ? s.highlight : s.text}
    >
      {item.content}
    </span>
  );
})}

    </span>
  );
}
