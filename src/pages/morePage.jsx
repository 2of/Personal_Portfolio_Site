import React from "react";
import { useNav } from "../contexts/NavContext";
import RowView from "../ui/grid/RowView";
import { routes } from "../routes";
import { ModernButton } from "../ui/standardControls/button/Button";
import getIcon from "../tools/iconRef";
import { useNavigateTo } from "../hooks/useNavigate";
import s from "./styles/morePage.module.scss";
import { DarkModeWrapper } from "../ui/wrappers/DarkModeWrapper";
import { useLinks } from "../contexts/LinksContext";
import { useCookies } from "../hooks/useCookies";
import StandardToggle from "../ui/standardControls/Toggle";
import { useAppState } from "../contexts/StateContext";
import { useModal } from "../contexts/ModalContext";
import { CookieManagerForm } from "../tools/cookiemanagergui";
import { StandardPage } from "../ui/scroll/StandardPage";
import { DropDown } from "../ui/standardControls/DropDown";
import { usePageTransition } from "../contexts/PageTransition";

export const MorePage = () => {
  const navigateTo = useNavigateTo();
  const { getLink } = useLinks();
  const { startTransition, isTransitioning } = usePageTransition();
  const { getFlag, setFlag, clearFlag } = useAppState();
  const { get, set } = useCookies();
  const { showModal } = useModal();
  const { navigationVariantDesktop, setNavigationVariantDesktop } = useNav();
  const NAVBUTTONVARIANT = "Airline_Ghost"
  const navOptions = [
    { value: "stacked", label: "Vertical" },
        { value: "material", label: "Material Clone but REACT" },
    { value: "floating", label: "Floating Top" }
  ];

  // FIX: Properly passing an anonymous callback function wrapper
  // so the layout state change fires inside the 200ms transition timeout marker
  const handleNavChangeWtransition = (newValue) => { 
    startTransition(null, () => setNavigationVariantDesktop(newValue));
  };

  const [playTransitionAnimation, setPlayTransitionAnimation] = React.useState(
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
  const toggleRows = [
    {
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
          type="modern"
          callback={togglePlayTransitionAnimation}
        />
      ),
    }, 
    {
      label: "Enable Dev Flag",
      paragraph: "",
      component: (
        <StandardToggle
          checked={getFlag("dev")}
          type="modern"
          callback={toggleDevFlag}
        />
      ),
    },
    {
      label: "Cookie Editor",
      paragraph: "",
      component: (
        <ModernButton
          label="Open <DEV>"
          icon={getIcon("cookie")}
          variant={NAVBUTTONVARIANT}
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

  const NavModeToggleSection = [
    {
      label: "Nav Variants - Desktop",
      paragraph: "There's a few nav variants, airline was a big thing i tried, but just choose fun :) ",
      component: null,
    },
    {
      label: "Desktop Nav Variant",
      component: (
        <DropDown
          options={navOptions}
          type="modern"
          value={navigationVariantDesktop}
          fsButtonlabel = {"Select Nav Type"}
          onChange={handleNavChangeWtransition}
        />
      )
    },
    // {
    //   label: "Transition Debug Indicator",
    //   component: (
    //     <h3>is transitioning: {isTransitioning ? "YES" : "NO" } </h3>
    //   )
    // }
  ];

  // Legacy links
  const legacyLinks = [
    {
      label: "Old sites",
      paragraph: "",
      component: null,
    },
    {
      label: "",
      paragraph: "I keep most of the major revisions to this front end still hosted on github pages for funsies",
      component: null,
    },
    {
      label: "Old 1",
      paragraph: "",
      component: (
        <ModernButton
          label="go"
          icon={getIcon("right")}
     variant={NAVBUTTONVARIANT}
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
     variant={NAVBUTTONVARIANT}
          callback={() => navigateTo(getLink("oldPortfolio2"))}
        />
      ),
    },
  ];

  // Directory rows
  const directoryRows = [
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
     variant={NAVBUTTONVARIANT}
          callback={() => navigateTo(r.path)}
        />
      ),
    })),
  ];

  return ( 
    <StandardPage>

      <h1>Settings & Extras</h1>
      {/* <h2>navigationVariantDesktop { navigationVariantDesktop} </h2> */}
      <RowView rows={NavModeToggleSection}/>
      <RowView rows={toggleRows}/>
      <RowView rows={[...introRows, ...directoryRows]}/>
      <p className={s.subtle}>Here's some old versions of this site:</p>
      <RowView rows={legacyLinks}/>
    </StandardPage>
  );
};