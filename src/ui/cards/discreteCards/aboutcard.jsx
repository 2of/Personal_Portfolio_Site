import React from "react";
import { ComponentsWrapToImage } from "../../wrappers/ComponentsWrappedtoImage.jsx";
import ProfileImage from "../../../assets/default.jpeg"
import styles from "./styles/aboutcard.module.scss";
import ProgressBar from "../../standardControls/ProgressBar.jsx";
import { ModernButton } from "../../standardControls/button/Button.jsx";
import getIcon from "../../../tools/iconRef.jsx";
import { useLinks } from "../../../contexts/LinksContext.jsx";
import OrbitPicture from "../../misc/ImageOrbitView.jsx";
import { DrawText, TextToSvgComponent_Welcome } from "../../misc/TextPath.jsx";



export const AboutCard = ({
  ProfileImage: profileImage = ProfileImage,
  title,
  subtitle,
  description,
  areatitle,
  ismobile = true
}) => {
  const { getLink } = useLinks();

  return (
    <div className={styles.cardContainer}>


      {!ismobile && (
        <ComponentsWrapToImage image={profileImage} radius={40} gap={-10}>
          {/* <h1 className={styles.title}>{title}</h1> */}
          <DrawText strokeWidth={2}>
            <TextToSvgComponent_Welcome  width={200}/>
          </DrawText>
          <h2 className={styles.subtitle}>{subtitle}</h2>
          <p className={styles.description}>{description}</p>

          <ProgressBar style="linear" animated beginAnimate val={10} />

          <p className={styles.area}>{areatitle}..</p>

          <span className={styles.buttonContainer}>
            <ModernButton
              label="Résumé"
              variant="dev"
              type="rounded_catalogue_card_end_with_label"
              icon={getIcon("resume")}
              link={getLink("resume")}
            />
            <ModernButton
              label="Github"
              variant="natural"
              icon={getIcon("github")}
              link={getLink("github")}
            />
            <ModernButton
              label="LinkedIn"
              variant="dev"
              icon={getIcon("linkedin")}
              link={getLink("linkedin")}
            />
          </span>
        </ComponentsWrapToImage>
      )}


      {ismobile && (
        <div className={styles.mobileCard}>
          {/* <img
            src={profileImage}
            alt={title}
            className={styles.mobileImage}
          /> */}

                      <OrbitPicture image={profileImage}/>

          {/* <h1 className={styles.title}>{title}</h1> */}

          <DrawText>
            <TextToSvgComponent_Welcome />
          </DrawText>
          <h2 className={styles.subtitle}>{subtitle}</h2>

          <p className={styles.description}>{description}</p>

          <ProgressBar style="linear" animated beginAnimate val={10} />

          <p className={styles.area}>{areatitle}..</p>

          <div className={styles.mobileActions}>
            <ModernButton
              icon={getIcon("resume")}
              variant="natural"
              label="Resume"
              link={getLink("resume")}
            />
            <ModernButton
              icon={getIcon("github")}
              variant="natural"
                        label="github"
              link={getLink("github")}
            />
            <ModernButton
              icon={getIcon("linkedin")}
              variant="natural"
                        label="linkedin"
              link={getLink("linkedin")}
            />
          </div>
        </div>
      )}

    </div>
  );
};
