import React from "react";
import s from "./styles/deskShift.module.scss";
import srcText from "../json/deskshift.json";
import { ModernButton } from "../ui/standardControls/button/Button";
import getIcon from "../tools/iconRef";
import { useLinks } from "../contexts/LinksContext";
import { useNavigateTo } from "../hooks/useNavigate";
import DS1 from "../../public/content/discretepages/deskShift/DS1.png"
import DS2 from "../../public/content/discretepages/deskShift/DS2.png"
import ImageHandle from "../ui/images/ImageHandle";



export const DeskShiftPage = () => {

    const {getLink} = useLinks();
    const goToUrl = useNavigateTo();
  return (
    <div className={s.container}>
        
      
      {/* Hero Section */}
      <section className={s.hero}>
        <h1 className={s.title}>{srcText.title}</h1>
        <p className={s.desc}>{srcText.desc1}</p>
   
   <ImageHandle src={DS2} alt={"cool image of the thing"}/>

        <div className={s.buttonrow}>
        <ModernButton
            label="Find on Github"
            icon={getIcon("Github")}
            variant="github"
            callback={() => {goToUrl(getLink("monitorminderrepo"))}}

        />

         {/* <ModernButton
            label="Mac App Store"
            icon={getIcon("Apple")}
            variant="appstore"
            
            callback={() => {}}

        /> */}


         <ModernButton
            label="DeskShift Website"
            icon={getIcon("Apple")}
            variant="genericstore"
            
            callback={() => {goToUrl(getLink("monitormindersite"))}}

        />

        </div>
      </section>

      {/* Subtitle Section */}
      <section className={s.subtitleSection}>
        <h2 className={s.subtitle}>{srcText.subtitle}</h2>
        <p className={s.desc}>{srcText.desc2}</p>
      </section>

      {/* Features / Demo Section */}
      <section className={s.features}>
        <div className={s.feature}>
           <ImageHandle src={DS1} alt={"cool image of the thing"}/>
          <div className={s.featureText}>
            <h3> {srcText.header1}</h3>
            <p>
                { srcText.header1details}
            </p>
          </div>
        </div>

        <div className={s.feature}>

            <ImageHandle src={DS1} alt={"cool image of the thing"}/>
          {/* <img
           src={DS1}
            alt="Workflow Profiles"
            className={s.featureImage}
          /> */}
          <div className={s.featureText}>
            <h3>   {srcText.header2}</h3>
            <p>
           { srcText.header2details}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
