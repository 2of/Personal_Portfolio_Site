import React from "react";
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

export const MorePage = () => {
  const { navDetails } = useNav();
  const navigateTo = useNavigateTo();
const screenSize = useScreenSize();
const {getLink} = useLinks();
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


const toggleRows = () => { 
    return [
        {
            label: "Dark Mode",
            paragraph: "",
            component: <DarkModeWrapper/>
        },
           {
            label: "Dumb CSS mode",
            paragraph: "",
            component: <DarkModeWrapper/>
        }
    ]
}


const legacyLinks = () => { 
    return [
        {
            label: "Old sites",
            paragraph: "",
            component: null
        },
           {
            label: "",
            paragraph: "I keep most of the major revisions to this front end still hosted on github pages for funsies",
            component: null
        }, {
            label: "Old 1",
            paragraph: "",
            component: <ModernButton
          label="go"
          icon={getIcon("right")}
          variant="dev"
          callback={() => navigateTo(getLink("oldPortfolioSite1"))}
        />
        },{
            label: "Old 2",
            paragraph: "",
            component: <ModernButton
          label="go"
          icon={getIcon("right")}
          variant="dev"
     callback={() => navigateTo(getLink("oldPortfolio2"))}
        />
        }
    ]
}




const directoryRows = () => {
  return [
    {
      label: "Entire Directory",
      paragraph: "",
      component: null,
    },
    ...routes.map((r) => ({
      label: r.title,
      paragraph: r.paragraph, // or r.path if that's what you want
      component: (
        <ModernButton
          label="go"
          icon={getIcon("right")}
          variant="dev"
          callback={() => navigateTo(r.path)}
        />
      ),
    })),
  ];
};
  return (
    <div className={s.page}>
      <header className={s.header}>

        <p className={s.subtle}>
          Current route: <span>{navDetails?.title}</span>
        </p>



        <p className={s.subtle}>
      Welcome to more.SSee more options and so on in here... 
        </p>

      </header>

      <section className={s.section}>


        <div className={s.rowViewContainer}>
          <RowView rows={[...introRows,...toggleRows(), ...directoryRows()]} mobile={screenSize === "sm"} />
        <p className={s.subtle}>
      Here's some old versions of this site .. 
        </p>
                    <RowView rows={[ ...legacyLinks()]} mobile={screenSize === "sm"} />

        </div>
      </section>
    </div>
  );
};
