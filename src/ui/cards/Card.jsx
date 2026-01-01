import React from "react";
import { ProjectCard_large, ProjectCard_regular } from "./ProjectCards";
import { PROJCARD_HeroCard } from "./CatalogueCards/PROJ_HeroCard";
import { PROJCARD_Large } from "./CatalogueCards/PROJ_LargeCard";
import { PROJCARD_Regular } from "./CatalogueCards/PROJ_RegularCard";
import { getDefaultImage, getImagePath } from "../../tools/imageURLBuilder";


const maps = {
    hero : PROJCARD_HeroCard,
    large: PROJCARD_Large,
    regular: PROJCARD_Regular
}


// expects
/// title, description, date, tags, links, link, inprogress, image 

export const Card = ({ variant, image, ...props}) => { 

    const Component = maps[variant] || maps.large;

const imageURL = image ? getImagePath(image) : getDefaultImage();

    return <Component carddetails image={imageURL} {...props}/>


    // return <h1> {image}</h1>

}