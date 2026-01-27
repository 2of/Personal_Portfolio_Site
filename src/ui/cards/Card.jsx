import React from "react";
import { ProjectCard_large, ProjectCard_regular } from "./ProjectCards";
import { PROJCARD_HeroCard } from "./CatalogueCards/PROJ_HeroCard";
import { PROJCARD_Large } from "./CatalogueCards/PROJ_LargeCard";
import { PROJCARD_Regular } from "./CatalogueCards/PROJ_RegularCard";
import { PROJCARD_Mobile } from "./CatalogueCards/PROJ_MobileCard";
import { getDefaultImage, getImagePath } from "../../tools/imageURLBuilder";
import { PROJCARD_Text } from "./CatalogueCards/PROJ_TextCard";
import { PROJCARD_DatingProfile } from "./CatalogueCards/PROJ_DatingCard";


const maps = {
    hero: PROJCARD_Text,
    large: PROJCARD_Large,
    regular: PROJCARD_Regular,
    mobile: PROJCARD_Text,
    text: PROJCARD_Text,
    dating: PROJCARD_DatingProfile
}

const imageLocations = { 
    hero: "top"
}

// expects
/// title, description, date, tags, links, link, inprogress, image 

export const Card = ({ variant, image, useMobile=true, ...props }) => {



    // return (<h1> variant {variant} & {useMobile ? "MOB" : "NOTMOB"}</h1>)

    const Component = maps[variant] || maps.large;

    // const imageURL = image ? getImagePath(image) : getDefaultImage();
    const imageURL = image ? getImagePath(image) : null
    if (useMobile) return <PROJCARD_Text carddetails image={imageURL} variant={variant} {...props} />
    return <Component carddetails image={imageURL} imageLocation={imageLocations[variant] || "left"} {...props} />


    // return <h1> {image}</h1>

}