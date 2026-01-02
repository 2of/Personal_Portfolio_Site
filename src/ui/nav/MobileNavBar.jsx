import React from "react";
import s from "./styles/MobielNavBar.module.scss";
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import { useNavStack } from "../../contexts/NavigationButtonsStack";
import { useNav } from "../../contexts/NavContext";
import { AboutCardSmall } from "../cards/AboutCard";
import { useModal } from "../../contexts/ModalContext";
import { ShareSheet } from "../misc/ShareSheet";

export const MobileNavBar = () => {
  const { ToggleMobileNav, MobileNavIsOpen } = useNavStack();
    const { navDetails } = useNav();
      const { showModal } = useModal();
  return (
    <div className={`${s.barContainer} ${false ? s.fullbar : s.floatingbar}    `}>
      <div className={s.left}>
        <ModernButton
          label="as"
       icon={getIcon(!MobileNavIsOpen ? "Menu" : "close")}
          variant="mobileNav"
          callback={() => ToggleMobileNav()}
        />
      </div>

      <div className={s.center}>
        {/* {MobileNavIsOpen ? "OPEN" : "CLOSE"} */}

        .{navDetails.path || "thingies"}
      </div>

      <div className={s.right}>
        {/* <ModernButton
          label="as"
          icon={getIcon(MobileNavIsOpen ? "down" : "down")}
          variant="mobileNav"
        /> */}


         <ModernButton
                           label=".info"
                           icon={getIcon("about")}
                           variant="mobileNav"
                            callback={() => showModal({
                               title: "About This Website",
                               content: <AboutCardSmall />,
                               // floatnav: true,
                               size: "medium"
                           })}
                       />
                       <ModernButton
                           label=".share"
                           variant="mobileNav"
                                    icon={getIcon("share")}
                           callback={() => showModal({
                               title: "TEST",
                               content: <ShareSheet />,
                               floatnav: true,
                               size: "small"
                           })}
                       />
      </div>
    </div>
  );
};
