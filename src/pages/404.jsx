import React from "react";
import { WavyText } from "../ui/misc/WavvyText";
import { StandardPage } from "../ui/scroll/StandardPage";
import { ModernButton } from "../ui/standardControls/button/Button";
import getIcon from "../tools/iconRef";
import { useLinks } from "../contexts/LinksContext";
import { useModal } from "../contexts/ModalContext";
import { AboutCardSmall } from "../ui/cards/AboutCard";
import s from "./styles/404.module.scss";
import Divider from "../ui/misc/Divider";
import SnakeGame from "../ui/misc/snake/snake";

export const DefaultNotFound = () => { 
  const { getLink } = useLinks();
  const { showModal } = useModal();

  const YoutubeEmbed = (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/93hq0YU3Gqk"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );

  return (
    <StandardPage center>
      <div className={s.wrapper}>

        {/* BIG 404 */}
        <div className={s.code}>
          404
        </div>

        {/* Sub text */}
        <WavyText 
          text="Sorry you're lost"
          fontSize="22px"
        //   delay={0.12}
          className={s.subtext}
        />

        <ModernButton
          label="Sneezing Panda"
          icon={getIcon("user")}
          callback={() => { 
            showModal({
              size: "medium",
              title: "achoo",
              floatnav: true,
              content: <>{YoutubeEmbed}</>,
            });
          }}
          variant="natural"
        />


<Divider/>

<SnakeGame/>
        {/* <AboutCardSmall /> */}

      </div>
    </StandardPage>
  );
};
