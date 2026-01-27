import React, { useState } from "react";
import { useNav } from "../contexts/NavContext";
import RowView from "../ui/grid/RowView";
import { routes } from "../routes";
import { ModernButton } from "../ui/standardControls/button/Button";
import getIcon from "../tools/iconRef";
import { useNavigateTo } from "../hooks/useNavigate";
import s from "./styles/morePage.module.scss";
import { useScreenSize } from "../contexts/ScreenSizeContext";
import { DarkModeWrapper } from "../ui/wrappers/DarkModeWrapper";
import { getLink } from "../helpers/GetLink";
import { useLinks } from "../contexts/LinksContext";
import { useCookies } from "../hooks/useCookies";
import StandardToggle from "../ui/standardControls/Toggle";
import { useAppState } from "../contexts/StateContext";
import { useModal } from "../contexts/ModalContext";
import { CookieManagerForm } from "../tools/cookiemanagergui";
import { StandardPage } from "../ui/scroll/StandardPage";

export const MorePage = () => {
  const { navDetails } = useNav();
  const navigateTo = useNavigateTo();
  const screenSize = useScreenSize();
  const { getLink } = useLinks();



  const { getFlag, setFlag, clearFlag } = useAppState();
  const { get, set } = useCookies();

  const {showModal} = useModal();

const [playTransitionAnimation, setPlayTransitionAnimation] = React.useState(
  /// idk wtf this is but seems to work with weird ass react object
    () => Boolean(get("playTransitionAnimation"))
  );


  const togglePlayTransitionAnimation = () => {
    setPlayTransitionAnimation((prev) => {
      const next = !prev;
      set("playTransitionAnimation", next);
      return next;
    });
  };


const toggleDevFlag = () => {
  getFlag("dev") ? clearFlag("dev") : setFlag("dev", true);
};
  // Intro rows
  const introRows = [
    {
      label: "More Page & Dir",
      paragraph: "",
      component: null,
    },
    {
      label: "Why is there so much junk here?",
      paragraph:
        "I keep deprecated pages around intentionally. There’s no guarantee everything still works—frameworks change—but most of it is functional, and it’s useful (and fun) to look back.",
      component: null,
    },
  ];

  // Toggle rows
  const toggleRows = () => [    {
      label: "Settings and Toggles",
      paragraph: "",
      component: null,
    },
    {
      label: "Dark Mode",
      paragraph: "",
      component: <DarkModeWrapper />,
    },
    {
      label: "Always Play Dark Mode animation",
      paragraph: "",
      component: (
        <StandardToggle
          checked={playTransitionAnimation}
          // firsticon={getIcon("smile")}
                //  secondicon={getIcon("off")}
                 type="modern"
          callback={togglePlayTransitionAnimation}
        />
      ),
    }, {
      label: "Enable Dev Flag",
      paragraph: "",
      component: (
        <StandardToggle
          checked={getFlag("dev")}
          // firsticon={getIcon("smile")}
                //  secondicon={getIcon("off")}
                 type="modern"
          callback={toggleDevFlag}
        />
      ),
    },{
      label: "Cookie Editor",
      paragraph: "",
      component: (
        <ModernButton
         label="Open <DEV>"
         icon={getIcon("cookie")}
        variant="natural"
       callback={() => showModal({
                               title: "Cookies",
                               content: <CookieManagerForm />,
                               floatnav: false,
                               size: "medium"
                           })}

        />
      ),
    },
  ];

  // Legacy links
  const legacyLinks = () => [
    {
      label: "Old sites",
      paragraph: "",
      component: null,
    },
    {
      label: "",
      paragraph:
        "I keep most of the major revisions to this front end still hosted on github pages for funsies",
      component: null,
    },
    {
      label: "Old 1",
      paragraph: "",
      component: (
        <ModernButton
          label="go"
          icon={getIcon("right")}
          variant="natural"
          callback={() => navigateTo(getLink("oldPortfolioSite1"))}
        />
      ),
    },
    {
      label: "Old 2",
      paragraph: "",
      component: (
        <ModernButton
          label="go"
          icon={getIcon("right")}
          variant="natural"
          callback={() => navigateTo(getLink("oldPortfolio2"))}
        />
      ),
    },
  ];

  // Directory rows
  const directoryRows = () => [
    {
      label: "Entire Directory",
      paragraph: "",
      component: null,
    },
    ...routes.map((r) => ({
      label: r.title,
      paragraph: r.paragraph,
      component: (
        <ModernButton
          label="go"
          icon={getIcon("right")}
          variant="natural"
          callback={() => navigateTo(r.path)}
        />
      ),
    })),
  ];


  return ( 
    <StandardPage>
      {/* <h3>testasf</h3> */}
           <header className={`${s.header} `}>

        <h3>Hello !</h3>
        <p className={s.subtle}>
          Current route: <span>{navDetails?.title}</span>
        </p>

        <p className={s.subtle}>
          Welcome to more. See more options and so on in here...
        </p>
      </header>
      <RowView rows={[...toggleRows()]}/>
      <RowView rows={[...introRows, ...directoryRows()]}/>
                <p className={s.subtle}>Here's some old versions of this site:</p>

            <RowView rows={[...legacyLinks()]}/>
    </StandardPage>
  )

};
