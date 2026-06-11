import React, { useState } from "react";
import { StandardPage } from "../ui/scroll/StandardPage";
import {
  ScrollableVerticalView,
  Section,
} from "../ui/scroll/VerticalScrollWithStickyHeaders";
import CompWiki from "../json/compWiki.json";
import s from "./styles/wikiPage.module.scss";

// Import Components
import { DropDown } from "../ui/standardControls/DropDown";
import ProgressBar from "../ui/standardControls/ProgressBar";
import { TextInput } from "../ui/standardControls/TextInput";
import StandardToggle from "../ui/standardControls/Toggle";
import { ModernButton } from "../ui/standardControls/button/Button";
import { StandardTable } from "../ui/containers/Table";
import { ComponentsWrapToImage } from "../ui/wrappers/ComponentsWrappedtoImage";
import { DarkModeTile } from "../ui/wrappers/DarkModeFancyTile";
import { DarkModeWrapper } from "../ui/wrappers/DarkModeWrapper";
import { StandardTab } from "../ui/scroll/StandardTabView";
import { PagedScrollContainer } from "../ui/scroll/TikTokMobileContainer";
import { VerticalScrollWithTracking } from "../ui/scroll/VerticalScrollingWithTracking";
import { StandardHeader } from "../ui/misc/Headers";
import getIcon from "../tools/iconRef";
// import { ComponentsWrapToImage } from "../ui/wrappers/ComponentsWrappedtoImage";
// import { ComponentsWrapToImage } from "../ui/wrappers/ComponentsWrappedtoImage";


const PreviewableComponentMap = {
  DropDown,
  ProgressBar,
  TextInput,
  Toggle: StandardToggle,
  ModernButton,
  ComponentsWrapToImage,
  DarkModeTile,

};

const NonPreviewableComponents = new Set([
  "StandardPage",
  "ScrollableVerticalView",
  "StandardTab",
  "TikTokMobileContainer",
  "VerticalScrollingWithTracking",
  "DarkModeWrapper",
]);

export const DescPage = () => {
  const data = CompWiki.components;

  const [demoState, setDemoState] = useState({
    dropdown: null,
    textInput: "",
    toggle: false,
  });

  const getBaseProps = (name) => {
    switch (name) {
      case "DropDown":
        return {
          options: [
            { label: "Option A", value: "a" },
            { label: "Option B", value: "b" },
          ],
          value: demoState.dropdown,
          onChange: (val) => setDemoState((p) => ({ ...p, dropdown: val })),
          placeholder: "Choose...",
        };

      case "ProgressBar":
        return {
          val: 75,
          showVal: true,
          animated: true,
          label: "Progress",
        };

      case "TextInput":
        return {
          value: demoState.textInput,
          onChange: (val) => setDemoState((p) => ({ ...p, textInput: val })),
          placeholder: "Type here...",
        };

      case "Toggle":
        return {
          checked: demoState.toggle,
          callback: (val) => setDemoState((p) => ({ ...p, toggle: val })),
        };

      case "ModernButton":
        return {
          label: "button",
          onClick: () => alert("Button Clicked"),
        };

      default:
        return {};
    }
  };

  return (
    <div className={s.WorkPage}>
      <ScrollableVerticalView staggerStart>
        <Section>
          <h1>Components and contexts and how to use them</h1>
          <h2>This is nowhere near exhaustive, obviously</h2>
          <h4>
            Auto-generated internal docs from <code>throowing my code into an llm :</code>
          </h4>
        </Section>



        {data.map((item, index) => {
          const Component = PreviewableComponentMap[item.name];
          const isPreviewable = !!Component;
          const isBlocked = NonPreviewableComponents.has(item.name);

          return (
            <Section
              key={index}
              sticky
              collapsed = {index !== 0}
              Header={() => (
                <StandardHeader textb1={"Click to expand- "} texthighlight={item.name}></StandardHeader>
              )}
            >
              <div className={s.sectionContent}>
                <p>{item.description}</p>

                <div className={s.metaInfo}>
                  <strong>Path:</strong> <code>{item.path}</code>
                </div>

                {/* <h3>Preview</h3>

                {!isPreviewable && (
                  <div className={s.previewDisabled}>
                    This component manages layout or scroll and cannot be
                    previewed safely.
                  </div>
                )}

                {isPreviewable && (
                  <div className={s.previewSandbox}>
                    <Component {...getBaseProps(item.name)} />
                  </div>
                )} */}

                <h3>Properties</h3>

                <StandardTable
                  columns={["Name", "Type", "Default", "Description"]}
                  rows={item.props.map((prop) => [
                    <code>{prop.name}</code>,
                    <code>{prop.type}</code>,
                    <code>{prop.default}</code>,
                    prop.description,
                  ])}
                />
              </div>

              <h4>Variants: </h4>

              <div className={s.variantGrid}>

                {item.variants.map((v, i) => {
                  return (<>

                    <div key={i} className={s.variantItem}>
                      <h4 > {v}</h4>

                      {/* {!isPreviewable && (
                        <div className={s.previewDisabled}>
                          
                        </div>
                      )} */}

                      {isPreviewable && (
                        <div className={s.previewSandbox}>
                          <Component variant={v} type={v} icon={getIcon("test")} {...getBaseProps(item.name)} />
                        </div>
                      )}

                    </div>



                  </>


                  )
                })}
              </div>
            </Section>
          );
        })}
      </ScrollableVerticalView>
    </div>
  );
};
