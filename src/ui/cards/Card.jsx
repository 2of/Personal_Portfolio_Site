import React from "react";
import { ProjectCard_large, ProjectCard_regular } from "./ProjectCards";
import { PROJCARD_HeroCard } from "./CatalogueCards/PROJ_HeroCard";
import { PROJCARD_Large } from "./CatalogueCards/PROJ_LargeCard";
import { PROJCARD_Regular } from "./CatalogueCards/PROJ_RegularCard";
import { PROJCARD_Mobile } from "./CatalogueCards/PROJ_MobileCard";
import { getDefaultImage, getImagePath } from "../../tools/imageURLBuilder";
import { PROJCARD_PlainOldCard } from "./CatalogueCards/PROJ_PlainOldCard";
import { PROJCARD_Text } from "./CatalogueCards/PROJ_TextCard";
import { PROJCARD_DatingProfile } from "./CatalogueCards/PROJ_DatingCard";
import { PROJCARD_TestBedCard } from "./CatalogueCards/PROJ_TestBedCard";
import { AirlineCardRegular } from "./CatalogueCards/AirlineCards/Airline.RegularCard";
import { AirlineCardFullscreen } from "./CatalogueCards/AirlineCards/AirLine.FSCard";
import { WorkCardRegular } from "./CatalogueCards/WorkCards/Workcard.Regular";
import { WorkCardLarge } from "./CatalogueCards/WorkCards/Workcard.Large";

const maps = {
    hero: PROJCARD_HeroCard,
    large: WorkCardLarge,
    regular: WorkCardRegular,
    mobile: PROJCARD_PlainOldCard,
    text: PROJCARD_PlainOldCard,
    dating: PROJCARD_DatingProfile,
    plain: PROJCARD_Large,
    other: PROJCARD_Large,
    tiktok: AirlineCardFullscreen
};

const imageLocations = {
    hero: "top"
};

export const Card = ({ variant, image, useMobile = true, ...props }) => {
    const Component = maps[variant] || maps.hero;
    const imageURL = image ? getImagePath(image) : null;

    if (useMobile) {
        return <PROJCARD_Text carddetails image={imageURL} variant={variant} {...props} />;
    }

    return <Component carddetails image={imageURL} imageLocation={imageLocations[variant] || "left"} {...props} />;
};