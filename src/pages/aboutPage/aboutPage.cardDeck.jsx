import React, {Fragment} from "react";
import styles from "./aboutpage.Carddeck.module.scss"
import { DarkModeTile } from "../../ui/wrappers/DarkModeFancyTile";
import PaintTOP from "../../../public/content/misc/paint/paint_top.png"
import PaintLeft from "../../../public/content/misc/paint/paint_left.png"
import PaintBottom from "../../../public/content/misc/paint/paint_bottom.png"



import TL from "../../../public/content/misc/paint/topleft.png"

import topspacer from "../../../public/content/misc/paint/topspacer.png"

const Topmost = () => {


        return (
            <div className={styles.card}>

                <span><p>This is my </p> <p className={styles.highlight}> Portfolio Website </p> </span>
<span> Look around, do things... A truncated  <p className={styles.highlight}> resume </p> lives below</span>
<span> Swipe card (like... tinder) <p className={styles.highlight}> resume </p> lives below</span>

             </div>
        )
}



const SecondMost = () => {


    return (
        <div className={styles.card}>

            .. What is this site?




        </div>
    )
}

const Thirdmost = () => {


    return (
        <div className={styles.card}>

            This is my Portfolio Site.

            Isn't it neat.

            Look at things



        </div>
    )
}


const FourthMost = () => {


    return (
        <div className={styles.card}>

            Why I'm A good Hire

         * Works for cheap

         * Is good at programming



        </div>
    )
}











//
// const SecondMost = () => {
//     return (
//         <div className={styles.card}>
//
//
//                 <div className={styles.paintTopL}><Fragment></Fragment>
//                     <img src={TL} />
//                 </div>
//
//             <div className={styles.paintTopFill}>
//
//                  hi
//                 {/*<img src={TL} />*/}
//             </div>
//
//
//
//             {/*<img src={PaintTOP} alt="PaintTOP" />*/}
//             {/*<img src={topspacer} alt="PaintTOP" />*/}
//             {/*<img src={TL} alt="PaintTOP" />*/}
//         </div>
//     )
// }



export function AboutPageCardDeck() {
return ([
    <Topmost/>, <SecondMost/>, <Thirdmost/>, <FourthMost/>
])
}