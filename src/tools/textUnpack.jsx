// aboutpage/support.jsx
import { useTransition } from "react";
import { useLinks } from "../contexts/LinksContext";
// import { useNavigateTo } from "../../hooks/useNavigate";
// import s from "./aboutPage.Desktop.module.scss";


export function GetElTextEls({ elements = [] }) {

  // const navigateTo = useNavigateTo();
  console.log("and finally we got eleements of" , elements)
  
  return (
    <span className={"text_container"}>
      {elements.map((item, index) => {
  if (item.to) {
    return <span
       className={"text_link"}
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
      className={item.highlight ? "text_highlight" : "text_regular"}
    >
      {item.content}
    </span>
  );
})}

    </span>
  );
}
