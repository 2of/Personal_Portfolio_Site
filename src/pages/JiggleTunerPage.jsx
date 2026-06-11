import React, { useState } from "react";
import { StandardPage } from "../ui/scroll/StandardPage";
import { StandardRangeInput } from "../ui/standardControls/StandardRangeInput";
import { BouncyButtonRow } from "../ui/misc/BouncyButtonsRow";
import { CodeSection } from "../ui/article/Article/Sections";

export const JiggleTunerPage = () => {
  const [activeTab, setActiveTab] = useState("one");

  const [KP, setKP] = useState(0.22);
  const [KS, setKS] = useState(0.28);
  const [DP, setDP] = useState(0.55);
  const [DS, setDS] = useState(0.50);
  const [scaleImpulse, setScaleImpulse] = useState(0.8);
  const [speedFactor, setSpeedFactor] = useState(0.4);
  const [n1, setN1] = useState(0.55);
  const [n2, setN2] = useState(0.20);

  const bouncytabs = [
    { label: "one", id: "one" },
    { label: "two", id: "two" },
    { label: "three", id: "three" },
    { label: "four", id: "four" },
  ];

  const buttonsWithState = bouncytabs.map((btn) => ({
    ...btn,
    isActive: activeTab === btn.id,
    callback: () => setActiveTab(btn.id),
  }));

  return (
    <StandardPage>
      <div className="physics-tuner-grid">

        <a>
            Context: 

            I cloned a bunch of material components. Use this page to tune the physics constants

        </a>
        <h4>Position Stiffness (KP)</h4>
        <StandardRangeInput showPreview variant="airline" upperbound={1.0} lower={0.001} snaponEvery={0.001} value={KP} updatefunc={setKP} />

        <h4>Scale Stiffness (KS)</h4>
        <StandardRangeInput showPreview variant="airline" upperbound={1.0} lower={0.001} snaponEvery={0.001} value={KS} updatefunc={setKS} />

        <h4>Position Damping (DP)</h4>
        <StandardRangeInput showPreview variant="airline" upperbound={0.99} lower={0.1} snaponEvery={0.001} value={DP} updatefunc={setDP} />

        <h4>Scale Damping (DS)</h4>
        <StandardRangeInput showPreview variant="airline" upperbound={0.99} lower={0.1} snaponEvery={0.001} value={DS} updatefunc={setDS} />

        <h4>Scale Impulse</h4>
        <StandardRangeInput showPreview variant="airline" upperbound={2.0} lower={0.0} snaponEvery={0.001} value={scaleImpulse} updatefunc={setScaleImpulse} />

        <h4>Speed Factor</h4>
        <StandardRangeInput showPreview variant="airline" upperbound={2.0} lower={0.0} snaponEvery={0.001} value={speedFactor} updatefunc={setSpeedFactor} />

        <h4>Neighbor 1 Influence</h4>
        <StandardRangeInput showPreview variant="airline" upperbound={2.0} lower={0.0} snaponEvery={0.001} value={n1} updatefunc={setN1} />

        <h4>Neighbor 2 Influence</h4>
        <StandardRangeInput showPreview variant="airline" upperbound={1.0} lower={0.0} snaponEvery={0.001} value={n2} updatefunc={setN2} />
      </div>

      <h3>buttons row - tab:</h3>
      <BouncyButtonRow
        variant="tab"
        KP={KP} KS={KS} DP={DP} DS={DS}
        scaleImpulse={scaleImpulse}
        speedFactor={speedFactor}
        neighbour1={n1}
        neighbour2={n2}
        buttons={buttonsWithState}
      />

      <h3>buttons row - default:</h3>
      <BouncyButtonRow
        KP={KP} KS={KS} DP={DP} DS={DS}
        scaleImpulse={scaleImpulse}
        speedFactor={speedFactor}
        neighbour1={n1}
        neighbour2={n2}
        buttons={buttonsWithState}
      />

      <div >
        <h3>Details</h3>

        <CodeSection
        content = 
        
          {`{ 
  KP: ${KP.toFixed(3)}, 
  KS: ${KS.toFixed(3)}, 
  DP: ${DP.toFixed(3)}, 
  DS: ${DS.toFixed(3)}, 
  scaleImpulse: ${scaleImpulse.toFixed(2)}, 
  speedFactor: ${speedFactor.toFixed(2)}, 
  neighbour1: ${n1.toFixed(2)}, 
  neighbour2: ${n2.toFixed(2)} 
}`}
        />
        
   
      </div>
    </StandardPage>
  );
};