import React from "react";
import { useNavigateTo } from "../hooks/useNavigate";
import { StandardPage } from "../ui/scroll/StandardPage";
import { GenericCard } from "../ui/cards/GenericCard";

const rels = {
  chromemarket: {
    title: "Chrome Extension - No More MarketPlace ",
    description:
    "Casual Chrome extension",
    link: "chrome_warehouse",
  }, chromeAD: {
    title: "Chrome Extension - MS AaD Copy/Paste Tool",
    description:
      "Handy IT tool",
    link: "chrome_exo",
  },  deskshift: {
    title: "MacOS - DeskShift Utility",
    description:
      "MacOS wfh tool",
    link: "monitorminderrepo",
  },  npm: {
    title: "NPM - JankUILib",
    description:
      "Actually... this is really behidn the times ",
    link: "UILibRepo",
  }, 
};

export const ReleasesPage = () => {
  const navigateTo = useNavigateTo();

  return (
    <StandardPage>


        <h4>
            You can download these things!
        </h4>

        {Object.values(rels).map((tool, i) => (
          <GenericCard
            key={i}              // better: a stable id if you have one
            title={tool.title}
            subtitle={tool.description}
            link={tool.link}
          />
        ))}
      
    </StandardPage>
  );
};
