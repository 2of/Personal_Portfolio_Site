import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Article.module.scss";
import getIcon from "../../../tools/iconRef.jsx";
import { Loader } from "../../misc/Loader.jsx";
import { ModernButton } from "../../standardControls/button/Button.jsx";

import { ArticleContent } from "./ArticleContent";
import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../../contexts/GlobalContext";
import { DarkModeWrapper } from "../../wrappers/DarkModeWrapper.jsx";
// import WigglyLine from "../Misc/WigglyLine";
import StandardToggle from "../../standardControls/Toggle.jsx";
import { useScreenSize } from "../../../contexts/ScreenSizeContext.jsx";
import { useContent } from "../../../contexts/ContentContext.jsx";
import { useModal } from "../../../contexts/ModalContext.jsx";
import { ShareSheet } from "../../misc/ShareSheet.jsx";
// import FeatherTwoLayer from "../Misc/FeatherTwoLayer";

const StandardControls = React.memo(({ data, mobile = false }) => {
  // Only consume context here, where it's needed
  // const { openShareSheet } = useGlobalContext();

  // const handleShare = useCallback(() => {
  //   openShareSheet(
  //     window.location.href,
  //     "twitter",
  //     data.shortDesc || data.subtitle || "Noah's Portfolio @ thingies.dev",
  //     data.title,
  //   );
  // }, [openShareSheet, data]); // Dependencies for useCallback

  const {showModal} = useModal();

  const handleShare = () => { 

    showModal({
      title: "TEST",
      content: <ShareSheet/>,
      floatnav: true,
      size: "small"
    })

  }

  return (
    <>
      <div className={`${styles.ToggleContainer} standardMouseOverBounce `}>
        <DarkModeWrapper />
      </div>


      <ModernButton
        label="Share"
        icon={getIcon("share")}
        variant="dev"
        // callback={handleShare} // Use the memoized callback
        callback={() => handleShare()}
        type="code_small"
        fillContainer={mobile}
      />
      {/* Removed the commented-out StandardToggle logic for cleaner code */}
    </>
  );
});

export const TitleSectionPortable = React.memo(
  ({ data, variant = "desktop", hiderows }) => {
    const screenSize = useScreenSize();
    const isMobile = variant === "mobile"; // fix this — previously inverted

    return (
      <div
        className={`${styles.articleContainer} ${isMobile ? styles.mobile : styles.desktop
          }`}
      >
        <div className={styles.bgImageContainer}>
          <div
            className={styles.bgImage}
            style={
              data?.heroImage
                ? {
                  backgroundImage: `url(${data.heroImage})`,
                  backgroundAttachment: "fixed",
                  filter: "blur(4px)", // static default, or make it responsive
                  transform: `scale(1.1)`,
                }
                : {}
            }
          />
        </div>

        <div className={styles.titleSection}>
          <TitleSection data={data} mobile={isMobile} />
        </div>

        <div className={styles.gradientBG} />
      </div>
    );
  },
);

export const TitleSection = React.memo(
  ({ data, tags, mobile = false, hiderows = false }) => {
    return (
      <div className={styles.header}>
        <h1>{data.title}</h1>
        <h2>{data.subtitle}</h2>
        {tags && (
          <div className={styles.tagContainer}>
            <p> {getIcon("tag")} </p>
            {tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        )}
        <div className={styles.aboutText}>
          <p>{data.author || "Unknown Author"}</p>
          <span className={styles.separator}>•</span>
          <p>{data.date || "Unknown Date"}</p>
          <span className={styles.separator}>•</span>
          <p>{data.extratext}</p>
        </div>

        {mobile && (
          <div className={styles.standardControlsContainer}>
            {/* <WigglyLine /> */}
            <StandardControls data={data} mobile={mobile} />
          </div>
        )}

        {!hiderows && (
          <div className={styles.heroLinksContainer}>
            <HeroLinks linkData={data.heroLinks} />

            {!mobile && (
              <>
                <StandardControls data={data} />
              </>
            )}
          </div>
        )}

        <div className={styles.fullDivider}>
          {/* <WigglyLine /> */}
        </div>
      </div>
    );
  },
);

const HeroLinks = React.memo(({ linkData }) => {
  const navigate = useNavigate();

  const RenderItem = ({ item }) => {
    switch (item.type) {
      case "external_link":
        return (
          <ModernButton
            label={item.title}
            icon={getIcon(item.icon)}
            variant="dev"
            external={true}
            callback={() => window.open(item.to, "_blank")}
            fillContainer={true}
          />
        );
      case "internal_link":
        return (
          <ModernButton
            label={item.title}
            icon={getIcon(item.icon)}
            callback={() => navigate(item.to)}
            type="article"
            fillContainer={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {Array.isArray(linkData) &&
        linkData.map((link, index) => (
          <div className={styles.buttonContainer} key={index}>
            <RenderItem item={link} />
          </div>
        ))}
    </>
  );
});
export const Article = ({ metadata, fixeddata, name }) => {


  const [loadingState, setLoadingState] = useState("ready");
  const [data, setData] = useState(fixeddata);
  const [bgModifiervalue, setbgModifiervalue] = useState(0);
  const containerRef = useRef(null);
  const iswip = metadata?.wip || false;

  const bgImageRef = useRef(null);
  const titlePopupRef = useRef(null);
  const screenSize = useScreenSize();

  const {getArticleImageUrl} = useContent();

  // console.log("ARTICLE METADATA", metadata);
  useEffect(() => {
    if (containerRef.current && bgImageRef.current && titlePopupRef.current) {
      const bgElement = bgImageRef.current;
      const titlePopupElement = titlePopupRef.current;

      const handleScroll = () => {
        const scrollTop = containerRef.current.scrollTop;
        const fadeStart = 0;
        const fadeEnd = 500;
        let bgModifiervalue;

        if (scrollTop < fadeStart) {
          bgModifiervalue = 0;
        } else if (scrollTop > fadeEnd) {
          bgModifiervalue = 1;
        } else {
          bgModifiervalue = (scrollTop - fadeStart) / (fadeEnd - fadeStart);
        }

        const opacity = 1 - bgModifiervalue - 0.1;
        const transformScale = 1.2 - bgModifiervalue * 0.2;

        bgElement.style.opacity = opacity;
        bgElement.style.transform = `scale(${transformScale})`;

        // Title Popup Animation
        const titleTransformY = -64 + bgModifiervalue * 64;
        titlePopupElement.style.transform = `translateY(${titleTransformY}px)`;
      };

      const container = containerRef.current;
      container.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [data]); // data is used in the image check, but stable after load

 


  if (loadingState === "wait")
    return (
      <div className={styles.LoaderStatusContainer}>
        <Loader fillparent />
      </div>
    );
  if (loadingState === "fail")
    return (
      <>
        <h1>failed to load </h1>
      </>
      // <Feedback
      //   button={<button onClick={() => {}}>Go to Original Link</button>}
      // />
    );

  return (
    <div
      className={`${styles.articleContainer} ${screenSize === "sm" ? styles.mobile : styles.desktop
        }`}
      ref={containerRef}
    >

      
      <div className={`${styles.bgImageContainer} `}>
        <div
          className={styles.bgImage}
          ref={bgImageRef} // 7. Attach ref for direct manipulation
          style={
            data?.heroImage
              ? {
                // backgroundImage: `url(${data.heroImage})`,
                                backgroundImage: `url(${getArticleImageUrl(name,"1.png")})`,
                backgroundAttachment: "fixed",
                // Dynamic styles removed from here, now in useEffect
              }
              : {}
          }
        />
      </div>

      {screenSize !== "sm" && (
        <div
          className={styles.titlePopup}
          ref={titlePopupRef} // ✅ Ref is attached
        // 2. ✅ REMOVE the entire style prop block to allow the useEffect to control the CSS
        >
          <div className={`${styles.TitleContainer} `}>
            <p>{data.title}</p>
          </div>
          <div className={`${styles.TitleContainer} `}>
            <p>{data.title}</p>
          </div>
        </div>
      )}

      <div className={styles.titleSection}>
        <TitleSection
          data={data}
          tags={metadata?.details?.tags}

          mobile={screenSize === "sm"}
        // hiderows = {bgModifiervalue}
        />
      </div>

      {iswip && (
        <div className={styles.WIPalert}>
          <h3> • this article is flagged as a work in progress or filler •</h3>
        </div>
      )}
      <div
        className={styles.gradientBG}
      // style={{
      //   transform: `translateY(${1.2 - bgModifiervalue * 42}px)`,
      // }}
      />
      <div className={styles.contentSection}>


 
        <ArticleContent data={data}  articlename={name}/>
      </div>
    </div>
  );
};
