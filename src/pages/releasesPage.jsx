import React from "react";
import { useNavigateTo } from "../hooks/useNavigate";
import { StandardPage } from "../ui/scroll/StandardPage";
import { GenericCard } from "../ui/cards/GenericCard";

const rels = {
  pixelart: {
    title: "Chrome Extension - No More MarketPlace ",
    description:
    "upload an image & turn it in to pixel art using k means clustering",
    link: "pixelarttool",
  }, svgConverter: {
    title: "Chrome Extension - MS AaD Copy/Paste Tool",
    description:
      "Just converts svg's from https://text-to-svg.com/cutive-mono-font-to-svg",
    link: "/convert_svg_tool",
  },  deskshift: {
    title: "MacOS - DeskShift Utility",
    description:
      "Just converts svg's from https://text-to-svg.com/cutive-mono-font-to-svg",
    link: "/convert_svg_tool",
  },  deskshift: {
    title: "NPM - JankUILib",
    description:
      "Just converts svg's from https://text-to-svg.com/cutive-mono-font-to-svg",
    link: "/convert_svg_tool",
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
