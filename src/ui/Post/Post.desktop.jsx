import React, { useState, useCallback, memo } from "react";
import { PostChunkAsArray } from "./Post.ChunkMap";
import styles from "./PostDesktopStyles.module.scss"
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import { useNavigateTo } from "../../hooks/useNavigate";
import { ShareSheet } from "../misc/ShareSheet";
import { useModal } from "../../contexts/ModalContext";
import { DarkModeWrapper } from "../wrappers/DarkModeWrapper";
import { VerticalScrollWithTracking } from "../scroll/VerticalScrollingWithTracking";
import { useContent } from "../../contexts/ContentContext";
import { DropDown } from "../standardControls/DropDown";

export function PostContainerDesktop({ data, name = "i ddint get a name" }) {
    const sections = data?.sections ?? [];
    const [isStickyVisible, setIsStickyVisible] = useState(false);
    const [viewType, setViewType] = useState("split");
    const viewTypes = [{
    value:"split", label:"Split Column View"
  },
    {value:"contiguous", label:"Contiguous View"
  }]
    const { getArticleImageUrl } = useContent();
    const bgimage = getArticleImageUrl(name, data.heroImage);

    const handleScroll = useCallback((val) => {
        // Shown after 5% scroll, which should be roughly after the main header starts leaving viewport
        const shouldShowSticky = val > 5;
        setIsStickyVisible(prev => {
            if (prev === shouldShowSticky) return prev;
            return shouldShowSticky;
        });
    }, []);


    return ( 

                <VerticalScrollWithTracking update={handleScroll}>

  <PostContainerDesktopHeader
                name={data.name}
                title={data.title}
                subtitle={data.subtitle}
                // heroimage={bgimage}
                shortdesc={data.shortdesc}
                author={data.author}
                date={data.date}
                extratext={data.extratext}
                herolinks={data.heroLinks}
                artName={name}
                viewtype={viewType}

                setViewType={setViewType}
                viewOptions={viewTypes}
            />
    
         <PostDesktopSection
                sections={sections}
                artName={name}
                viewtype={viewType}
            />
  <PostStickyHeader
                isVisible={isStickyVisible}
                title={data.title}
                name={data.name}
            />
                        </VerticalScrollWithTracking>
                        
    )
   
}

const PostDesktopSection = ({ sections, artName, viewtype }) => {
    const chunks = sections.map((c, i) => {
        return (
            <div className={`${styles.section} ${c.boost && styles.boost}`} key={i}>
                <span className={styles.chunkTitle}>{c.name}</span>
                {PostChunkAsArray(c.items, artName)}
            </div>
        );
    });

    return (
        <div className={`${styles.content} ${viewtype === "split" ? styles.multicolview : styles.contigview}`}>
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
    viewtype,
    setViewType,
    viewOptions
}) => {
    const navigateTo = useNavigateTo();
    const { showModal } = useModal();

    const handleShare = useCallback(() => {
        showModal({
            title: "Share Article",
            content: <ShareSheet />,
            floatnav: true,
            size: "small"
        });
    }, [showModal]);

    return (
        <header className={`${styles.header} ${heroimage ? styles.hasImage : ''}`}>

            {heroimage && (
                <div className={styles.heroBackground}>
                    <img src={heroimage} alt={title || name} />
                </div>
            )}


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
                            variant="Airline_Secondary"
                            darkOverride
                            callback={() => navigateTo(link.to)}
                        />
                    ))}

                    <ModernButton
                        label="Share"
                        icon={getIcon("Share")}
                        variant="Airline_Secondary"
                        darkOverride
                        callback={handleShare}
                    />
                    <DropDown
                        options={viewOptions}
                        value={viewtype}
                        onChange={setViewType}
                        placeholder="Select layout"
                        darkOverride
                    />



                    {/* <h4> dark mode: </h4>

                    <DarkModeWrapper  type="glass"/> */}
                </div>
            </div>
        </header>
    );
};

const PostStickyHeader = ({ isVisible, title, name }) => {
    return (
        <div className={`${styles.stickyHeader} MaterialL1 ${isVisible ? styles.isVisible : ''}`}>
            <h3 className={styles.titleCollapsed}>{title || name}</h3>
            <div className={styles.collapsedActions}>
                {/* Could add mini share here if wanted */}
            </div>
        </div>
    );
}

// Keep memo if necessary, though structure simplified
const MemoizedHeader = memo(
    PostContainerDesktopHeader,
    (prev, next) => {
        return (
            prev.viewtype === next.viewtype 
        );
    }
);

