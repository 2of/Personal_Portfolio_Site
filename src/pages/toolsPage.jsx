import React from "react";
import { useNavigateTo } from "../hooks/useNavigate";
import { StandardPage } from "../ui/scroll/StandardPage";
import { GenericCard } from "../ui/cards/GenericCard";

const tools = {
  pixelart: {
    title: "Pixel art generator ",
    description:
    "upload an image & turn it in to pixel art using k means clustering",
    link: "pixelarttool",
  }, svgConverter: {
    title: "QUICK SVG text reformatter",
    description:
      "Just converts svg's from https://text-to-svg.com/cutive-mono-font-to-svg",
    link: "/convert_svg_tool",
  }, 
};

export const ToolsPage = () => {
  const navigateTo = useNavigateTo();

  return (
    <StandardPage>


        <h3>
            Most of these tools are just things I used frequently and wanted hosted somewhere
        </h3>
        {Object.values(tools).map((tool, i) => (
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
