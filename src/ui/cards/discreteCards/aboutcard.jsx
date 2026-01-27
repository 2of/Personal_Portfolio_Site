import React from "react";
import { ComponentsWrapToImage } from "../../wrappers/ComponentsWrappedtoImage.jsx";
import ProfileImage from "../../../assets/me.jpeg";
import styles from "./styles/aboutcard.module.scss";
import ProgressBar from "../../standardControls/ProgressBar.jsx";
import { ModernButton } from "../../standardControls/button/Button.jsx";
import getIcon from "../../../tools/iconRef.jsx";
import { useLinks } from "../../../contexts/LinksContext.jsx";
import OrbitPicture from "../../misc/ImageOrbitView.jsx";
import {
  DrawText,
  TextToSvgComponent_Welcome,
  TextWPath_DeskShift,
} from "../../misc/TextPath.jsx";
import { GetElTextEls } from "../../../tools/textUnpack.jsx";
import GlassPushOverlay from "../../containers/GlassContainer.jsx";

export const AboutCard = ({
  ProfileImage: profileImage = ProfileImage,
  title,
  subtitle,
  description,
  longdesc,
  areatitle,
  ismobile = true,
}) => {
  console.log("received the logndesc to about card of ", longdesc)
  const { getLink } = useLinks();





  return (
    <div className={`${styles.cardContainer}
    ${ismobile ? styles.MobileCard : styles.Desktopcard}
    
    `}>

      <img
              src={profileImage}
              alt={title}
              className={styles.image}
            />

          {/* <OrbitPicture image={profileImage} /> */}
          <h2> About</h2>
          <h4 className={styles.title}>{title}</h4>

          <p>
            <GetElTextEls elements={longdesc} />
          </p>


    </div>


  )
  
};
