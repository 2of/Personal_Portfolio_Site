import React, { useState } from "react";
import { StandardPage } from "../ui/scroll/StandardPage";
import AirlineBg from "../ui/bg/AirlineBg";
import { StandardRangeInput } from "../ui/standardControls/StandardRangeInput";
import { ModernButton } from "../ui/standardControls/button/Button";
import { useModal } from "../contexts/ModalContext";
import { DropDown } from "../ui/standardControls/DropDown";
import { useDarkMode } from "../contexts/DarkMode";
import ScrollUpHintBg from "../ui/bg/UpArrows";

export const PlanesPage = () => {
  const [nplanes, setNPlanes] = useState(1);
  const [pspeed, setpspeed] = useState(1);

  const [bgKey, setBgKey] = useState(0);

  const handleReset = () => {
    // Incrementing the key forces AirlineBg to completely reload
    setBgKey((prevKey) => prevKey + 1);
  };

  const [colourOption ,setColourOption] = useState("Auto")
  const { showModal } = useModal();
  const [dark, setDark] = useState(true);
  const {darkMode} = useDarkMode();


  const handleColourChange = (e) => { 
    console.log(e)

    if (e === "Dark") { 
        setDark(true)
    } else if (e === "Light") {
        setDark(false)
    } else { 
        setDark(!darkMode)
    }

  }

  const navOptionsForDM = [
    { value: "Dark", label: "Dark" },
    { value: "Light", label: "Light" },
     { value: "Follow System", label: "Auto" },
  ];
  return (
    <StandardPage>
      <div className="StandardBoxL2" style={{ zIndex: 200, padding: "1rem" }}>
        <h3>Planes!</h3>{" "}
    

        <StandardRangeInput
          lowerbound={1}
          upperbound={122}
          value={nplanes}
          showPreview
          title={"nPlanes"}
          updatefunc={setNPlanes}
          naponEvery={1}
          variant="airline"
        />
        <StandardRangeInput
          lowerbound={0.1}
          upperbound={33} // 3× is already very fast
          value={pspeed}
          title="Speed - Applies to new spawns only"
          snaponEvery={0.05}
          showPreview
          updatefunc={setpspeed}
          variant="airline"
        />

        <span style={{
            display: "flex",
            gap: "2rem"
        }}>


       
        <ModernButton
          variant="Airline_Primary"
          label="Reset"
          callback={handleReset}
        />


            <ModernButton variant="Airline_Secondary" label="info"
        
        callback={() => {
          showModal({
  label: "Info About The planes",
  content: (
    <div>
      <h2>Component Overview</h2>
      <span>
        Component does request anim frame to usually get 60fps... 
        <code>requestAnimationFrame</code>. It is all usememo-ed to handle page and container resizes.
      </span>

      <h3>Kinematics & Movement</h3>
      <span>
        Each frame, each of our plane's coordinates update using standard kinematics:
        <br />
        <code>x += Math.cos(angle) * speed</code>
        <br />
        <code>y += Math.sin(angle) * speed</code>
        <br />
        where the <strong>angle</strong> represents its current heading in rads. This heading is 
         altered by a random <code>turnRate</code> continuarlly
      </span>

      <h3>Where do planes go when they leave the screen</h3>
      <span>
        Historical positions are pushed to an array to render the faded, dashed tail before drawing 
        the aircraft body via some fancy ctx rotations that I absolutely punched from elsewhere but cant remember where now... sorry...
      </span>
      <br /><br />
      <span>
        If a plane exits the canvas boundaries beyond a dynamic scale-based threshold:
        <br />
        <code>margin = 80 + 320 * size</code>
        <br />
        it is automatically recycled and respawned at a screen edge.
      </span>

      <h3>Component Interface</h3>
      <span>
        <strong>Props:</strong> <code>numPlanes</code> and <code>planeSpeed</code>.
      </span>
    </div>
  ),
  size:"medium"
});
        }}
        />


        <DropDown
        options={navOptionsForDM}
        type="modern"
        value={colourOption}
        fsButtonlabel="ColourMode"
        onChange={handleColourChange}
        />
 </span>
      </div>
      <div>

        {/* <ScrollUpHintBg/> */}
        <AirlineBg key={bgKey} numPlanes={nplanes} planeSpeed={pspeed}  dark={dark}/>
      </div>
    </StandardPage>
  );
};
