import React, { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { PostContainerDesktop } from "./Post.desktop";
import { PostContainerMobile } from "./Post.mobile";


export const Post = ({postdata,artName,fetchpostfromtitle}) => { 
  const [loadingState, setLoadingState] = useState("ready");



  const [data, setData] = useState({});
// console.log(postdata)

  useEffect(() => {
    if (postdata) { 
        setData(postdata)
        // console.log("asdfnasdn then we do it")
    } else { 
        // placeholder to go and fetch data
    }
  } ,
[] )




    const screenSize = useScreenSize()


    

 const Page = useMemo(() => {
    return screenSize !== "sm"
      ? <PostContainerDesktop  data={data}  name = {artName}/>
      : <PostContainerMobile  data={data}  name = {artName} />;
  }, [screenSize, data]);

  return Page;

}

