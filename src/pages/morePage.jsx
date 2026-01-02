import React from "react";
import { useNav } from "../contexts/NavContext";


export const MorePage = () => {
    const { navDetails } = useNav();

    // console.log("ROUTED DEETS", navDetails)
    return (

        <>

            <h1>THis is the more page</h1>
            <h2>
                the route current is {navDetails?.title}



            </h2>
        </>
    )
}