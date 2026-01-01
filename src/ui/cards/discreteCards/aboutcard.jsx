import React from "react";
import { ComponentsWrapToImage } from "../../wrappers/ComponentsWrappedtoImage.jsx";
import ProfileImage from "../../../assets/default.jpeg"
import styles from "./styles/aboutcard.module.scss";
import ProgressBar from "../../standardControls/ProgressBar.jsx";
import { ModernButton } from "../../standardControls/button/Button.jsx";
import getIcon from "../../../tools/iconRef.jsx";
import { useLinks } from "../../../contexts/LinksContext.jsx";





export const AboutCard = ({
                                       ProfileImage: profileImage = ProfileImage,
                                       title,
                                       subtitle,
                                       description,
                                       areatitle,
                                       ismobile = false
                                   }) => {

    const { getLink } = useLinks();


    return (
        <div className={styles.cardContainer}>



        <ComponentsWrapToImage image={profileImage} radius={40} gap={-10}>
            <h1 className={styles.title}>{title}</h1>
            <h2>{subtitle}</h2>
            <p>{description}</p>

            <ProgressBar style="linear" animated beginAnimate val={10} />

            <p>{areatitle}..</p>

            <span className={styles.buttonContainer}>
        <ModernButton
            label="Résumé"
            variant="dev"
            type="rounded_catalogue_card_end_with_label"
            icon={getIcon("resume")}
            link={getLink("resume")}
            // external
        />
        <ModernButton
            label="Github"
         variant="dev"
            icon={getIcon("github")}
            link={getLink("github")}
            // external
        />
        <ModernButton
            label="LinkedIn"
      variant="dev"
            icon={getIcon("linkedin")}
            link={getLink("linkedin")}
            // external
        />
      </span>
        </ComponentsWrapToImage>

                </div>
    );
};
