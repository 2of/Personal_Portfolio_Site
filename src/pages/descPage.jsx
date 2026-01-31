import React, { useState } from "react";
import { StandardPage } from "../ui/scroll/StandardPage";
import { ScrollableVerticalView, Section } from "../ui/scroll/VerticalScrollWithStickyHeaders";
import CompWiki from "../json/compWiki.json";
import s from "./styles/wikiPage.module.scss";

// Import Components
import { DropDown } from "../ui/standardControls/DropDown";
import ProgressBar from "../ui/standardControls/ProgressBar";
import { TextInput } from "../ui/standardControls/TextInput";
import StandardToggle from "../ui/standardControls/Toggle";
import { ModernButton } from "../ui/standardControls/button/Button";
import { ComponentsWrapToImage } from "../ui/wrappers/ComponentsWrappedtoImage";
import { DarkModeTile } from "../ui/wrappers/DarkModeFancyTile";
import { DarkModeWrapper } from "../ui/wrappers/DarkModeWrapper";
import { StandardTab } from "../ui/scroll/StandardTabView";
import { PagedScrollContainer } from "../ui/scroll/TikTokMobileContainer";
import { VerticalScrollWithTracking } from "../ui/scroll/VerticalScrollingWithTracking";

// Component Map
const ComponentMap = {
    "DropDown": DropDown,
    "ProgressBar": ProgressBar,
    "TextInput": TextInput,
    "Toggle": StandardToggle,
    "ModernButton": ModernButton,
    "ComponentsWrappedtoImage": ComponentsWrapToImage,
    "DarkModeFancyTile": DarkModeTile,
    "DarkModeWrapper": DarkModeWrapper,
    "StandardPage": StandardPage,
    "StandardTab": StandardTab,
    "TikTokMobileContainer": PagedScrollContainer,
    "VerticalScrollingWithTracking": VerticalScrollWithTracking,
    "ScrollableVerticalView": ScrollableVerticalView
};

export const DescPage = () => {
    const data = CompWiki.components;

    // State for interactive demos
    const [demoState, setDemoState] = useState({
        dropdown: null,
        textInput: "",
        toggle: false
    });

    // Helper to get variant prop name
    const getVariantPropInfo = (componentName, variantName) => {
        switch (componentName) {
            case "DropDown": return { variant: variantName };
            case "ProgressBar": return { style: variantName };
            case "TextInput": return { variant: variantName };
            case "Toggle": return { type: variantName };
            default: return {};
        }
    };

    return (

            <div className={s.WorkPage}>


        <ScrollableVerticalView staggerStart>
            {/* <div className={s.wikiContainer}> */}
                <Section>
                    <h1>Component Wiki</h1>
                    <h4>Generated from source code & standard documentation</h4>
                    <p>
                        This page demonstrates the available standard UI controls.
                        Each section includes live previews of all variants and detailed property documentation.
                    </p>
                </Section>

                {data.map((item, index) => {
                    const Component = ComponentMap[item.name];

                    // Base props
                    let baseProps = {};
                    if (item.name === "DropDown") {
                        baseProps = {
                            options: [{ label: "Option A", value: "a" }, { label: "Option B", value: "b" }],
                            value: demoState.dropdown,
                            onChange: (val) => setDemoState(prev => ({ ...prev, dropdown: val })),
                            placeholder: "Choose..."
                        };
                    } else if (item.name === "ProgressBar") {
                        baseProps = {
                            val: 75,
                            showVal: true,
                            animated: true,
                            label: "Progress"
                        };
                    } else if (item.name === "TextInput") {
                        baseProps = {
                            value: demoState.textInput,
                            onChange: (val) => setDemoState(prev => ({ ...prev, textInput: val })),
                            placeholder: "Type here...",
                            title: "Input"
                        };
                        baseProps = {
                            checked: demoState.toggle,
                            callback: (val) => setDemoState(prev => ({ ...prev, toggle: val })),
                        };
                    } else if (item.name === "ModernButton") {
                        baseProps = {
                            label: "Click Me",
                            onClick: () => alert("Button Clicked")
                        };
                    } else if (item.name === "ComponentsWrappedtoImage") {
                        baseProps = {
                            image: "https://via.placeholder.com/150",
                            children: [
                                <div key="1">Item 1</div>,
                                <div key="2">Item 2</div>,
                                <div key="3">Item 3</div>
                            ]
                        };
                    } else if (item.name === "StandardTab") {
                        baseProps = {
                            tabs: {
                                "Tab 1": () => <div>Content 1</div>,
                                "Tab 2": () => <div>Content 2</div>
                            }
                        };
                    }
                    // Add other defaults as needed, otherwise they render with empty/undefined props which might be fine


                    return (
                        <Section
                            key={index}
                            sticky
                            Header={() => <h2>{item.name}</h2>}
                        >
                            <div className={s.sectionContent}>
                                <p>{item.description}</p>
                                <div className={s.metaInfo}>
                                    <strong>Path:</strong> <code>{item.path}</code>
                                </div>

                                {/* Live Preview of Variants */}
                                <h3>Variants</h3>
                                <div className={s.previewBox}>
                                    {/* <div className={s.variantGrid}>
                                        {Component ? (
                                            item.variants.map((variantName, vIdx) => {
                                                const variantProps = getVariantPropInfo(item.name, variantName);
                                                return (
                                                    <div key={vIdx} className={s.variantItem}>
                                                        <Component
                                                            {...baseProps}
                                                            {...variantProps}
                                                        />
                                                        <label>{variantName}</label>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div>Component not found</div>
                                        )}
                                    </div> */}
                                </div>

                                {/* Props Table */}
                                <h3>Properties</h3>
                                <table className={s.propsTable}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Default</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.props.map((prop, pIndex) => (
                                            <tr key={pIndex}>
                                                <td><code>{prop.name}</code></td>
                                                <td><code>{prop.type}</code></td>
                                                <td><code>{prop.default}</code></td>
                                                <td>{prop.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Section>
                    );
                })}
            {/* </div> */}
        </ScrollableVerticalView>

         </div>
    );
};