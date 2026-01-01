import React from "react";
import linksdict from "../json/links.json"
  export const getLink = (linktitle) => {
    return linksdict[linktitle] || null;
  };
