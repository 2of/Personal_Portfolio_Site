import React, { useState, useCallback, memo } from "react";
import { PostChunkAsArray } from "./Post.ChunkMap";
import styles from "./PostMobileStyles.module.scss"
import { ModernButton } from "../standardControls/button/Button";
import getIcon from "../../tools/iconRef";
import { useNavigateTo } from "../../hooks/useNavigate";
import { ShareSheet } from "../misc/ShareSheet";
import { useModal } from "../../contexts/ModalContext";
import { DarkModeWrapper } from "../wrappers/DarkModeWrapper";
import { VerticalScrollWithTracking } from "../scroll/VerticalScrollingWithTracking";
import { useContent } from "../../contexts/ContentContext";
import { DropDown } from "../standardControls/DropDown";
import { StandardPage } from "../scroll/StandardPage";
import { ScrollableVerticalView, Section } from "../scroll/VerticalScrollWithStickyHeaders";
import StandardToggle from "../standardControls/Toggle";
import Divider from "../misc/Divider";






export function PostContainerMobile({ data, name = "i ddint get a name" }) {
    const sections = data?.sections ?? [];

    const [stickyHeaders, setStickyHeaders] = useState(true);

    const { getArticleImageUrl } = useContent();
    const bgimage = getArticleImageUrl(name, data.heroImage);
    const [scrollPercent, setScrollPercent] = useState(0);  

    const updatescrollpercent = (val) => {
        setScrollPercent(Math.min(val, 200));
    }
    console.log("DATA", data)

    // if (!data)  { 
    //     return <div> no data </div>
    // }
    return (
<>

            {bgimage && (
                <div className={styles.heroBackground}>
                    <img src={bgimage}
                        style={{
                        //  width: '100%',
    //   height: '100%',
    //   objectFit: 'cover',
    //   transform: `translateY(-${scrollPercent * 0.5}%)`, // subtle parallax
    //   filter: `blur(${scrollPercent / 20}px)`,
      opacity: `${0.2 - scrollPercent / 300}`,
      transition: 'transform 0.1s ease-out'
                        }}
                    alt={"title" || name} />
                </div>
            )}
        <ScrollableVerticalView staggerStart trackScrollPercent updateScrollPixAmountExt={updatescrollpercent}>
            {/* <h1>test {scrollPercent}</h1> */}

            <Section>

                <PostContainerMobileHeader name={data.name}
                    title={data.title}
                    subtitle={data.subtitle}
                    heroimage={bgimage}
                    shortdesc={data.shortdesc}
                    author={data.author}
                    date={data.date}
                    extratext={data.extratext}
                    herolinks={data.heroLinks}
                    artName={name}

                stickyHeaders = {stickyHeaders}
                setStickyHeaders={setStickyHeaders}


                />


            </Section>


            <PostContainerMobileContent
                sections={sections}
                artName={name}
                stickyHeaders={stickyHeaders}
            // viewtype={viewType}
            />

        </ScrollableVerticalView>

        </>

    )
}






const PostContainerMobileContent = ({ sections, artName, stickyHeaders = true

}) => {
    const chunks = sections.map((c, i) => {
        return (

            <Section key={i}
                sticky ={stickyHeaders}
                Header={() => (
                    <div className={styles.postHeaderScroller}>
                        {c.name}


                    </div>
                )}>
                <div className={`${styles.section} ${c.boost && styles.boost}`} key={i}>
                    {/* <span className={styles.chunkTitle}>{c.name}</span> */}
                    {PostChunkAsArray(c.items, artName)}
                </div>

            </Section>

        );
    });

    return (

        <>
            {chunks}
        </>
        // <div className={`${styles.content} ${viewtype === "Split Column View" ? styles.multicolview : styles.contigview}`}>

        // </div>
    );
}


const PostContainerMobileHeader = ({
    name,
    title,
    subtitle,
    heroimage,
    shortdesc,
    author,
    date,
    extratext,
    herolinks = [],
    // viewtype,
    // setViewType
    stickyHeaders,
    setStickyHeaders
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

    const [viewtype, setViewType] = useState(false);

    return (
        <header className={`${styles.header} ${heroimage ? styles.hasImage : ''}`}>


            {/* what the fuck */}
            {title && <h1 className={styles.titleMain}>{title}</h1>}
            {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}

              <div className={styles.meta}>


            {shortdesc && <p className={styles.shortDesc}>{shortdesc}</p>}

          
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

               


                {/* <h4> dark mode: </h4>

                    <DarkModeWrapper  type="glass"/> */}
            </div>


<Divider variant="dotted"/>
            <div className={styles.togglesContainer}>

                {/* <h4>reading settings</h4> */}
            <div className={styles.toggle}>
                <h4>Sticky headers</h4>
                <StandardToggle
                    type="modern" 
                    checked = {stickyHeaders}
                    callback={() => setStickyHeaders(!stickyHeaders)}/>

            </div>

        


            <div className={styles.toggle}>
                <h4>Dark Mode</h4>
                <DarkModeWrapper 
                    type="modern" />

            </div>

             {/* <ModernButton
                    label="Share"
                    icon={getIcon("Share")}
                    variant="natural"
                    darkOverride
                    callback={handleShare}
                /> */}


            </div>
            <Divider variant="dotted"/>
        </header>
    )



}