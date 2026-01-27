import React from "react";
import styles from "./styles/PostChunkText.module.scss"
import { useState } from "react";
import { ModernButton } from "../../standardControls/button/Button";
import getIcon from "../../../tools/iconRef";




export const Post_Chunk_Paragraph = ({ text,className


    

}) => {
    
  const parseMath = (expr) => {

    expr = expr.replace(/([a-zA-Z0-9]+)\^\{([^}]+)\}/g, (_, base, sup) => {
      return `${base}<sup>${sup}</sup>`;
    });

    // Replace subscripts: x_{2} to x<sub>2</sub>
    expr = expr.replace(/([a-zA-Z0-9]+)_\{([^}]+)\}/g, (_, base, sub) => {
      return `${base}<sub>${sub}</sub>`;
    });

    //  isnt this spooky ....
    expr = expr.replace(/~/g, '\u00A0');

    return <span dangerouslySetInnerHTML={{ __html: expr }} />;
  };

  const parseText = (input) => {
    const parts = input.split(/(\$\$.*?\$\$|\$.*?\$|\*\*[^*]+\*\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <em key={i}>{part.slice(2, -2)}</em>;
      } else if (part.startsWith("$") && part.endsWith("$")) {
        const math = part.slice(1, -1);
        return <span key={i} className="math">{parseMath(math)}</span>;
      } else {
        return part;
      }
    });
}

return <p className={`${className} ${styles.paragraph}`}>{parseText(text)}</p>;
}



export const Post_Chunk_Title = ({ text, className

}) => { 
    return (

        <div className={styles.titleBox}>
        <h4>{text}</h4>

        </div>

    )
}

export const Post_Chunk_Highlight = ({ 
text,className
}) => {

  return <div className={styles.highlight}>{text}</div>;
};





// had to chatgpt tf out of this pre layout ... tf is goign on 

export const Post_Chunk_Code = ({
  content = "",
  className = "",
  truncatable = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = content.split("\n");

  return (
    <div
      className={[
        styles.codeBlock,
        truncatable && styles.truncate,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={styles.copyButton}
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? "✓" : "copy"}
      </button>

      <div className={styles.buttonrow}>
      {/* <ModernButton
      variant="dev"
      label=    {copied ? "✓" : "copy"}
      // icon={getIcon("copy")}
      callback={handleCopy}
      
      
      /> */}

      </div>

      <div className={styles.codeArea} role="textbox" aria-readonly="true">
        {lines.map((line, idx) => (
          <div key={idx} className={styles.line}>
            <span className={styles.lineNumber}>{idx + 1}</span>
            <span className={styles.codeContent}>
              {line || " "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
