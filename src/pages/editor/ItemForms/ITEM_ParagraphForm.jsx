// ItemForms/ParagraphItem.jsx
import React from "react";
import { TextInput } from "../../../ui/standardControls/TextInput";

export const ParagraphItem = ({ item, onChange }) => {
  return (
    <TextInput
      label="Paragraph Text"
      value={item.text}
      onChange={(text) => onChange({ ...item, text })}
      multiline
      rows={4}
      tooltip="Write your paragraph content here"
    />
  );
};