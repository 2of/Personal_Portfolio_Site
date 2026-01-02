import React from "react";
import { useLinks } from "../../contexts/LinksContext";
import { ModernButton } from "../standardControls/button/Button";
import pfp from "../../assets/profile.jpg";
import s from "./styles/AboutCard.module.scss";
import { useNavigateTo } from "../../hooks/useNavigate";
import getIcon from "../../tools/iconRef";

export const AboutCardSmall = () => { 
  const gotoURL = useNavigateTo();
  const { getLink } = useLinks();

  return ( 
    <div className={s.card}>
      <div className={s.avatarContainer}>
        <img src={pfp} alt="Profile" className={s.largeAvatar} />
      </div>

      <div className={s.textCenter}>
        <h3 className={s.greeting}>Hello!</h3>
        <h4 className={s.author}>
         this is ... the ... thingies.dev, Noah King (that's me)'s portfolio site   <span className={s.handle}>@2of</span>
        </h4>
        
        <p className={s.bio}>
         Hiya, I made this site as a portfolio project... to host portfolio projects. It's a little cheeky, everything is hosted with the front end on github pages... it's all light enough that that's fine.
         .. there is support for loading in (RAW) json from eelsewhere for the article /blog end of things.

         Site's in REACT w/ scss for sanity and just hosted on github pages
        </p>
      </div>

      <div className={s.actions}> 
        <ModernButton
          label="GitHub"
          variant="dev"
          icon={getIcon("github")}
          callback={() => gotoURL(getLink("github"))}/>
        <ModernButton
          label="LinkedIn"
          variant="dev"
          icon={getIcon("linkedin")}
          callback={() => gotoURL(getLink("linkedin"))}/>
        <ModernButton
          label="Projects"
          variant="dev"
          icon={getIcon("editor")}
          callback={() => gotoURL("/projects")}/>

             <ModernButton
          label="Repo For Website"
          variant="dev"
          icon={getIcon("editor")}
          callback={() => gotoURL("/projects")}/>



             <ModernButton
          label="Docs"
          variant="dev"
          icon={getIcon("editor")}
          callback={() => gotoURL("/projects")}/>



             <ModernButton
          label="Rich Editor"
          variant="dev"
          icon={getIcon("editor")}
          callback={() => gotoURL("/projects")}/>
      </div>


         <p className={s.bio}>
    Anyway, have a look around, enjoy yourself (I suppose). It's also 2025, so let's mention AI use. 

    Yup, there's bits of AI in here. You might find i've padded some of the articles with generative AI... 


        </p>

                 <p className={s.bio}>
I may have extensively used generative AI for css... but the meat and potatoes is all me... and maybe stack overflow... 

        </p>
    </div>
  );
};