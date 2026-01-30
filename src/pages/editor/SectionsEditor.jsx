import React, { useState } from "react";
import { itemTypes, ProcureItem } from "./Items";
import { DropDown } from "../../ui/standardControls/DropDown.jsx";
import { ModernButton } from "../../ui/standardControls/button/Button.jsx";
import { StandardCollapsableRow } from "../../ui/containers/CollapsableRow.jsx";
import { TextInput } from "../../ui/standardControls/TextInput.jsx";
import StandardToggle from "../../ui/standardControls/Toggle.jsx";
import getIcon from "../../tools/iconRef.jsx";

export const SectionEditor = ({ section, onChange }) => {
  const [newItemType, setNewItemType] = useState(itemTypes[0]?.type || "");

  const handleFieldChange = (field, value) => {
    onChange({ ...section, [field]: value });
  };

  const handleAddItem = () => {
    const newItem = {
      type: newItemType,
      content: "",
    };

    const updatedItems = [...(section.items || []), newItem];
    handleFieldChange("items", updatedItems);
  };

  const handleItemChange = (index, updatedItem) => {
    const updatedItems = [...(section.items || [])];
    updatedItems[index] = { ...updatedItems[index], ...updatedItem };
    handleFieldChange("items", updatedItems);
  };

  const handleBoostToggle = () => {
    onChange({ boost: !section.boost });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextInput
        name="section-name"
        label="Section Name"
        value={section.name || ""}
        onChange={(val) => handleFieldChange("name", val)}
        placeholder="e.g. Introduction"
        type="flat"
      />

      <StandardToggle
        type="flat"
        checked={!!section.boost}
        callback={handleBoostToggle}
        firsticon={getIcon("moon")}
        secondicon={getIcon("sun")}
      />

    <div> 
        <DropDown
          label="New item type"
          name="newItemType"
          selectedValue={newItemType}
          onChange={setNewItemType}
          options={itemTypes.map((t) => ({ value: t.type, label: t.label }))}
          variant="icon"
        />
      
          <ModernButton label="Add Item" callback={handleAddItem}             variant="natural"/>

</div>

      <div>
        <h4>🧩 Items</h4>
        {(section.items || []).map((item, index) => (
          <div key={item.id || `${item.type}-${index}`} style={{ marginBottom: "12px" }}>
            <StandardCollapsableRow title={item.type}>
              <ProcureItem
                item={item}
                onChange={(newData) => handleItemChange(index, newData)}
              />
            </StandardCollapsableRow>
          </div>
        ))}
      </div>
    </div>
  );
};