import React, { useState } from "react";
import { PostChunkAsArray } from "./Post.ChunkMap";
// import { PostSectionsGenerator } from "./Post.Sections.Renderer";
import styles from "./PostDesktopStyles.module.scss"
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import { useNavigateTo } from "../../hooks/useNavigate";
import { ShareSheet } from "../misc/ShareSheet";
import { useModal } from "../../contexts/ModalContext";
import { StandardTab } from "../scroll/StandardTabView";
import StandardToggle from "../standardControls/Toggle";
import { DarkModeWrapper } from "../wrappers/DarkModeWrapper";
import { VerticalScrollView } from "../scroll/OLDVertScrollView";
import { VerticalScrollWithTracking } from "../scroll/VerticalScrollingWithTracking";
import { StandardPage } from "../scroll/StandardPage";






export function PostContainerDesktop({ data, name="i ddint get a name" }) {

    // return ( <h1>hello {name} </h1>
    // )
    const sections = data?.sections ?? [];
    const [scrollPercent, setScrollPercent] = useState(0)
    const [isCollapseBar, setIsCollapse] = useState(false)
    // const artName = name;
    //   console.log(data)
    // console.log("the sections is" , sections)
    return (
        <VerticalScrollWithTracking update={(val) => {
            // console.log("UDAPTE")
            // console.log("update with value" , val)
            setScrollPercent(val);
            setIsCollapse(val > 2); // Threshold for collapse (approx 2%)
        }}>

            {/* <div className="" */}
            <PostContainerDesktopHeader
                name={data.name}
                title={data.title}
                subtitle={data.subtitle}
                heroimage={data.heroimage}
                shortdesc={data.shortdesc}
                author={data.author}
                date={data.date}
                extratext={data.extratext}
                herolinks={data.heroLinks}
                scrollPercent={scrollPercent}
                isCollapseBar={isCollapseBar}
                artName={name}
            />

            <h1>{scrollPercent}{name} {name} thanks </h1>
            <PostDesktopSection
                sections={sections}
                artName={name}
            />

        </VerticalScrollWithTracking>

    );
}

const PostDesktopSection = ({ sections, artName }) => {
    console.log("POST DESKTOP SECTIONS GOT " , artName)
    console.log(sections)
    //   console.log("the sections is", sections)
    const chunks = sections.map((c, i) => {



        return (

            <div className={styles.section}>
                <h3>{c.name}   </h3>
                {/* <h3>{artname} tHERE is the artname</h3> */}
                {PostChunkAsArray(c.items, artName)}

            </div>
        )
    });



    return (

        <div className={styles.content}>


            {chunks}

        </div>

    );
};



const PostContainerDesktopHeader = ({
    name,
    title,
    subtitle,
    heroimage,
    shortdesc,
    author,
    date,
    extratext,
    herolinks = [],
    isCollapseBar,
    scrollPercent
}) => {
    const navigateTo = useNavigateTo();
    const { showModal } = useModal();

    // Local state to track hover
    const [isHovered, setIsHovered] = useState(false);

    // Logic: It is collapsed ONLY if the prop says so AND we aren't hovering.
    // This satisfies: "When it's in the shrunken view, mousing over should beautifully expand it"
    const isCompact = isCollapseBar && !isHovered;

    const handleShare = () => {
        showModal({
            title: "Share Article",
            content: <ShareSheet />,
            floatnav: true,
            size: "small"
        });
    };

    return (
        <header
            className={`${styles.header} ${isCompact ? styles.isCollapsed : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Layer */}
            {heroimage && (
                <div className={styles.heroBackground}>
                    <img src={heroimage} alt={title || name} />
                    {/* Optional: Add a CSS gradient overlay here for text contrast */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))' }} />
                </div>
            )}

            {/* ---------------- VIEW 1: EXPANDED ---------------- */}
            <div className={styles.viewContainer + ' ' + styles.expandedView}>
                {title && <h1 className={styles.titleMain}>{title}</h1>}
                {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}

                {shortdesc && <p className={styles.shortDesc}>{shortdesc}</p>}

                <div className={styles.meta}>
                    {author && <span>{author}</span>}
                    {date && <span>&bull; {date}</span>}
                    {extratext && <span>&bull; {extratext}</span>}
                </div>

                <div className={styles.actions}>
                    {herolinks.map((link, i) => (
                        <ModernButton
                            key={i}
                            label={link.title}
                            icon={getIcon(link.icon)}
                            variant="natural"
                            callback={() => navigateTo(link.to)}
                        />
                    ))}

                    <ModernButton
                        label="Share"
                        icon={getIcon("Share")}
                        variant="natural"
                        callback={handleShare}
                    />

                    <DarkModeWrapper />
                </div>
            </div>

            {/* ---------------- VIEW 2: COLLAPSED (Minimal) ---------------- */}
            <div className={styles.viewContainer + ' ' + styles.collapsedView}>
                {/* Separate render of Title for fade transition */}
                <h3 className={styles.titleCollapsed}>{title || name}</h3>

                <div className={styles.collapsedActions}>
                    {/* We might only show the Share button or a 'Top' button here to keep it minimal */}
                    {/* <ModernButton
            label="Share"
            icon={getIcon("Share")}
            variant="natural" // Ensure this variant works on dark backgrounds
            size="small"      // Assuming your button supports sizes
            callback={handleShare} 
          />
           <DarkModeWrapper /> */}
                </div>
            </div>

        </header>
    );
};





const PostContainerDesktopBody = ({ sections }) => {
    //   console.log("the container body has:", sections);

    return (
        <main>
            {sections}
        </main>
    );
};


