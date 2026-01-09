import React, { Component } from "react";
import s from "./styles/chessPage.module.scss"
import RowView from "../ui/grid/RowView";
import { ModernButton } from "../ui/standardControls/button/Button";
import getIcon from "../tools/iconRef";
import { useNavigateTo } from "../hooks/useNavigate";
import { useLinks } from "../contexts/LinksContext";

export const ChessPage = () => { 

    const navigateTo = useNavigateTo();
    const {getLink} = useLinks();
    const rows = [

        {
      label: "Chess Things - All",
      paragraph: "",
      component: null,
    },
        {label:"Chess.com Elo Estimator Alternative",
            paragraph:" A free alternative to the subscription walled ELO estimation tool from chess.com",
            component: <ModernButton
            label="Link To Tool"
            variant="dev"
            icon={getIcon("chess")}
            callback={navigateTo(getLink("EloEstimator"))}
            
            />
   },{label:"ChessLLM - Play Chess Against LLMs",
            paragraph:" BYO API KEY (sorry) - Play against clauda, gemini and chatgpt models w/ a nifty front end- Supports nonsense moves from the llm",
            component: <ModernButton
            label="Link To Tool"
            variant="dev"
            icon={getIcon("chess")}
            callback={navigateTo(getLink("EloEstimator"))}
            
            />
   },{label:"Chess Bots that use weird AI methods",
            paragraph:" I made a bunch of chess models that use really dumb design. There's a CNN based model (like image pattern recognition... yep) and rnn, an attention based sequence thing... none of them are good ideas but here we are",
            component: <ModernButton
            label="Link To Tool"
            variant="dev"
            icon={getIcon("chess")}
            callback={navigateTo(getLink("EloEstimator"))}
            
            />
   }
    ]

    return ( 
<div className={s.container}> 

    <RowView rows={rows}/>

    
</div>

    )
}