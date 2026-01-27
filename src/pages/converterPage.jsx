import React, { useState } from "react";
import { StandardPage } from "../ui/scroll/StandardPage";
import { TextInput } from "../ui/standardControls/TextInput";
import { CodeSection } from "../ui/article/Article/Sections";
import { ModernButton } from "../ui/standardControls/button/Button";
import { extractSvgTextMapEntry } from "../tools/svgTools";
import { DrawText, SVGText } from "../ui/misc/TextPath";

export const ConvertPage = () => {
  const [inputText, setInputText] = useState("");
  const [entryName, setEntryName] = useState("Unsure_hello");
  const [outputText, setOutputText] = useState("");

  const handleConvert = () => {
    console.log("TEST")
    if (!inputText.trim()) {
      setOutputText("// No SVG input component provided");
      return;
    }

    if (!entryName.trim()) {
      setOutputText("// Please input a name ");
      return;
    }

    try {
      const result = extractSvgTextMapEntry(
        inputText,
        entryName.trim()
      );
      setOutputText(result);
    } catch (err) {
      setOutputText(`// Conversion failed\n${err.message}`);
    }
  };

  return (
    <StandardPage>

      <h3>Quick and Dirty converter for :


        exported to jsx

      </h3>

      How to use
      <ul>
        <li>  go to  https://text-to-svg.com/cutive-mono-font-to-svg</li>
        <li>Make the svg</li>
        <li>export as jsx</li>
        <li> copy paste the component</li>
      </ul>

      <h4> then it can look like : </h4>

      <DrawText duration={122}>
        <SVGText text={"Sporty_Welcome"} />
      </DrawText>

      <h4> then we can use it in the library </h4>

      <h4> This tool has zero use to anyone really except me doing this really specific task with like 100 bits of text for a lib ...

        Hence it's hidden
      </h4>
      

      <ul>
        <li>I like tehse fonts </li>
                <li> nabia = iso 3d project font </li>
      </ul>

      <TextInput
        title="Entry name"
        variant="regular"
        placeholder="e.g. Sporty_Welcome"
        value={entryName}
        onChange={setEntryName}
      />

      <TextInput
        title="Paste SVG React Component"
        variant="regular"
        placeholder="Paste the full TextToSvgComponent source here"
        value={inputText}
        onChange={setInputText}
        multiline
        rows={10}
      />

      <ModernButton
        label="Convert"
        variant="dev"
        // onClick={handleConvert}
        callback={() => handleConvert()}
      />

      <CodeSection
        content={outputText}
        language="javascript"
      />
    </StandardPage>
  );
};
