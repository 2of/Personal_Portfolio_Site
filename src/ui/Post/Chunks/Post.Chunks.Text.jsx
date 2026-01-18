import React from "react";
import styles from "./styles/PostChunkText.module.scss"
import { useState } from "react";
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



export const Post_Chunk_Title = ({ 

}) => { 
    
}

export const Post_Chunk_Highlight = ({ 
text,className
}) => {


     const parseMath = (expr) => {
    // Replace superscripts: x^{2} to x<sup>2</sup> 
    expr = expr.replace(/([a-zA-Z0-9]+)\^\{([^}]+)\}/g, (_, base, sup) => {
      return `${base}<sup>${sup}</sup>`;
    });

    // Replace subscripts: x_{2} to x<sub>2</sub>
    expr = expr.replace(/([a-zA-Z0-9]+)_\{([^}]+)\}/g, (_, base, sub) => {
      return `${base}<sub>${sub}</sub>`;
    });

    // Replace ~ with a non-breaking space too, seems a bit breaky
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
  };

  return <p className={className}>{parseText(text)}</p>;
};






export const Post_Chunk_Code = ({}) => { 


      const [copied, setCopied] = useState(false);
    
      const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      };
    
      // Split into lines and number them
      const lines = content.split("\n");
    
      return (
        <div className={`${styles.codeBlock} ${truncatable ? styles.truncate : ""} ${className} "standardMouseOverBounce"`}>
          <button
            className={styles.copyButton}
            onClick={handleCopy}
            style={{ fontSize: '0.65rem', padding: '1px 4px', opacity: 0.5 }}
          >
            {copied ? "✓" : "copy"}
          </button>
          <pre className={styles.pre}>
            {lines.map((line, idx) => (
              <div key={idx} className={styles.line}>
                <span className={styles.lineNumber}>{idx + 1}</span>
                <span className={styles.codeContent}>{line || " "}</span>
              </div>
            ))}
          </pre>
        </div>
      );
    };


