import React, { useState } from "react";


export const MaterialsPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%", maxWidth: "800px", margin: "0 auto" }}>

      {/* ==========================================================================
         1. COMPACT ROW MODULE
         ========================================================================== */}
      <div className="DATASTRIP_CompactContainer">
        {/* Top boundary hazard line */}
        <div className="DATASTRIP_TopDivider">
          CLASS: .DATASTRIP_CompactContainer & .DATASTRIP_TopDivider
        </div>

        <div className="DATASTRIP_CompactBody">
          <div className="DATASTRIP_ContentCore" style={{ flexGrow: 1 }}>
            <header className="DATASTRIP_MetaHeader">
              <span>CLASS: .DATASTRIP_MetaHeader</span>
              <span>ID: COMPACT_01</span>
            </header>
            
            <div style={{ fontFamily: "var(--ds-font-sans)", fontSize: "12px", fontWeight: "700", color: "var(--text-color)", marginTop: "4px" }}>
              CLASS: .DATASTRIP_ContentCore
            </div>
          </div>

          <span className="DATASTRIP_Status">.DATASTRIP_Status</span>
          <div className="DATASTRIP_Barcode compact" aria-hidden="true"></div>
        </div>
      </div>


      {/* ==========================================================================
         2. SMALL CARD MODULE (No Image Wrap / High-Density Metadata)
         ========================================================================== */}
      <div className="DATASTRIP_Container">
        {/* Slim structural layout splitter */}
        <div className="DATASTRIP_Divider"></div>

        <div className="DATASTRIP_TerminalBody" style={{ padding: "12px" }}>
          <header className="DATASTRIP_MetaHeader" style={{ marginBottom: "8px" }}>
            <span>SCALE: SMALL</span>
            <span>CLASS: .DATASTRIP_Container</span>
          </header>

          <div style={{ fontFamily: "var(--ds-font-sans)", fontSize: "14px", fontWeight: "700", color: "var(--text-color)", textTransform: "uppercase" }}>
            CLASS: .DATASTRIP_TerminalBody
          </div>
          
          <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: "10px", color: "color-mix(in srgb, var(--text-color) 60%, transparent)", marginTop: "4px", marginBottom: "12px" }}>
            Lacks left visual image wrapper to optimize vertical density.
          </div>

          <footer className="DATASTRIP_Footer" style={{ paddingTop: "8px" }}>
            <div className="DATASTRIP_Tags">
              <span className="tag">.tag</span>
              <span className="tag tagMore">.tagMore</span>
            </div>
            <div className="DATASTRIP_Barcode" aria-hidden="true"></div>
          </footer>
        </div>
      </div>


      {/* ==========================================================================
         3. LARGE CARD MODULE (Full Asset Layout Grid with Highlight State)
         ========================================================================== */}
      <div className="DATASTRIP_Container ">
        
        {/* Full Image Frame Anchor */}
        <div className="DATASTRIP_ImageWrap" style={{ width: "180px", minWidth: "180px", background: "repeating-linear-gradient(45deg, transparent, transparent 6px, color-mix(in srgb, var(--text-color) 5%, transparent) 6px, color-mix(in srgb, var(--text-color) 5%, transparent) 12px)" }}>
          <span className="DATASTRIP_Status">CLASS: .DATASTRIP_ImageWrap</span>
        </div>

        {/* Central Manifest Spine Divider */}
        <div className="DATASTRIP_Divider"></div>

        {/* Extended Body Content Core */}
        <div className="DATASTRIP_TerminalBody" style={{ padding: "24px" }}>
          <header className="DATASTRIP_MetaHeader" style={{ marginBottom: "16px" }}>
            <span>SCALE: LARGE MODIFIER</span>
            <span>MODIFIER: .isHighlight</span>
          </header>

          <h3 className="DATASTRIP_Title">
            CLASS: .DATASTRIP_Title
          </h3>
          
          <p className="DATASTRIP_Description" style={{ marginBottom: "24px" }}>
            CLASS: .DATASTRIP_Description — Full structural deployment frame. Utilizes deeper inner padding values, extended height visual image blocks, and unconstrained paragraph tracking elements to occupy macro canvas coordinates.
          </p>

          <footer className="DATASTRIP_Footer" style={{ marginTop: "auto", paddingTop: "14px" }}>
            <div className="DATASTRIP_Tags">
              <span className="tag">.tag_node_01</span>
              <span className="tag">.tag_node_02</span>
              <span className="tag tagMore">.tagMore</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: "9px", color: "var(--accent-color)", fontWeight: "700" }}>
                PRNT_SYS_OK
              </span>
              <div className="DATASTRIP_Barcode" aria-hidden="true"></div>
            </div>
          </footer>
        </div>
      </div>

    </div>
  );
};