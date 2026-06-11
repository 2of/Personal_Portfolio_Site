export const baseTheme = {
  "--padding-small": "10px",
  "--padding-medium": "15px",
  "--padding-large": "36px",
  "--spacing-small": "10px",
  "--font-size-base": "16px",
  "--font-size-lg": "18px",
  "--font-weight-bold": "600",
  "--navHeightDESKTOP": "6rem",
  "--content-heightDESKTOP": "calc(100vh - var(--navHeightDESKTOP))",
  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "4rem",
  "--maxWidth": "1480px",
  "--border-radius": "2px",
  "--blur-radius": "12px",
  "--text-dark": "#2c3e50",
  "--darkbg": "#0d1324dd",
  "--lighttext": "#d1cfc0",
};

export const lightTheme = {
  "--bg":              "#FAFAF8",
  "--bg-l1":           "#F5F4F0",
  "--bg-l2":           "#EDECEA",
  "--bg-l3":           "#E4E3DF",
  "--bg-transparent":  "rgba(250, 250, 248, 0.97)",

  "--text-color":      "#111110",
  "--secondary-text":  "#4A4A47",

  "--card-bg":         "#FAFAF8",
  "--border-color":    "#DDDCDA",
  "--border-strong":   "#C4C3BF",

  "--grid-color":      "#EDECEA",
  "--guide-color":     "#E0DFDB",
  "--dimension-line":  "#C8C7C3",

  // "--accent":                    "#34942d",
  "--accent-color":              "#77b143",
  "--accent-color-transparent":  "rgba(193, 40, 27, 0.12)",

  "--link":        "#C1281B",
  "--hover-accent":"#A01F15",

  "--herobg":     "#F5F4F0",
  "--feature-bg": "#EDECEA",

  "--drop-shadow":     "0 1px 3px rgba(17, 17, 16, 0.08), 0 2px 8px rgba(17, 17, 16, 0.06)",
  "--card-shadow":     "0 2px 8px rgba(17, 17, 16, 0.08), 0 6px 24px rgba(17, 17, 16, 0.06)",
  "--elevated-shadow": "0 8px 24px rgba(17, 17, 16, 0.10), 0 24px 56px rgba(17, 17, 16, 0.08)",

  "--inverse-transparent": "rgba(17, 17, 16, 0.96)",
  "--inverse-shadow":      "0 16px 48px rgba(0, 0, 0, 0.22), 0 6px 16px rgba(0, 0, 0, 0.14)",
};

export const darkTheme = {
  "--bg":              "#111110",
  "--bg-l1":           "#1A1A19",
  "--bg-l2":           "#222221",
  "--bg-l3":           "#2C2C2A",
  "--bg-transparent":  "rgba(17, 17, 16, 0.97)",

  "--text-color":      "#F0EFEB",
  "--secondary-text":  "#9A9994",

  "--card-bg":         "#1A1A19",
  "--border-color":    "#2E2E2C",
  "--border-strong":   "#3D3D3A",

  "--grid-color":      "#1E1E1D",
  "--guide-color":     "#262625",
  "--dimension-line":  "#3A3A38",

  "--accent":                    "#E8453A",
  "--accent-color":              "#E8453A",
  "--accent-color-transparent":  "rgba(232, 69, 58, 0.18)",

  "--link":        "#E8453A",
  "--hover-accent":"#FF5A4F",

  "--herobg":     "#161615",
  "--feature-bg": "#1E1E1D",

  "--drop-shadow":     "0 1px 3px rgba(0, 0, 0, 0.30), 0 2px 8px rgba(0, 0, 0, 0.24)",
  "--card-shadow":     "0 2px 8px rgba(0, 0, 0, 0.32), 0 8px 28px rgba(0, 0, 0, 0.28)",
  "--elevated-shadow": "0 8px 24px rgba(0, 0, 0, 0.40), 0 28px 64px rgba(0, 0, 0, 0.36)",

  "--inverse-transparent": "rgba(240, 239, 235, 0.97)",
  "--inverse-shadow":      "0 12px 32px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.10)",
};

export const inlineNavHeight = {
  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
};

export const hiddenNavHeight = {
  "--navHeight": "0rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
};