// ItemForms/HighlightItem.jsx
import React from "react";

import { TextInput } from "../../../ui/standardControls/TextInput.jsx";

export const HighlightItem = ({ item, onChange }) => {
  return (
    <TextInput
      label="Highlight"
      value={item.text}
      onChange={(text) => onChange({ ...item, text })}
      tooltip="This text will be visually emphasized in the article."
    />
  );
};