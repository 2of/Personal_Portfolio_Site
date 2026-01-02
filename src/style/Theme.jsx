export const baseTheme = {
  "--padding-small": "12px",
  "--padding-medium": "24px",
  "--padding-large": "48px",
  "--spacing-small": "12px",

  "--font-size-base": "15px",
  "--font-size-lg": "18px",
  "--font-weight-bold": "500",

  "--navHeightDESKTOP": "60px",
  "--content-heightDESKTOP": "calc(100vh - var(--navHeightDESKTOP))",
  "--navHeight": "60px",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "60px",
  "--maxWidth": "1280px",

  "--border-radius": "2px", // Sharp, technical edges
  "--blur-radius": "20px",
  "--text-dark": "#1C1C1C",
  "--darkbg": "#0D0D0D",
  "--lighttext": "#F5F5F5",
};

export const lightTheme = {
  // THEME: "Graphite Drafting"
  // Clean white paper with sharp graphite lines

  "--bg": "#FEFEFE", // Pure white drafting paper
  "--bg-l1": "#F8F8F8", // Subtle vellum
  "--bg-l2": "#F0F0F0", // Light grey overlay
  "--bg-l3": "#E0E0E0", // Grid underlay
  "--bg-transparent": "rgba(254, 254, 254, 0.92)",

  "--text-color": "#1C1C1C", // Sharp graphite
  "--secondary-text": "#5C5C5C", // Soft pencil

  "--card-bg": "#FFFFFF",
  "--border-color": "#D4D4D4", // Clean line
  
  "--grid-color": "#EBEBEB", // Subtle grid
  "--guide-color": "#DCDCDC", // Construction lines
  "--dimension-line": "#8A8A8A", // Dimension marks

  // Drafting Palette - Graphite and Red markup
  "--accent": "#1C1C1C", // Technical black
  "--accent-color": "#DC2626", // Red markup pen
  "--accent-color-transparent": "rgba(220, 38, 38, 0.12)",

  "--link": "#B91C1C", // Dark red
  "--hover-accent": "#991B1B", // Deep red

  "--herobg": "#F9F9F9",
  "--feature-bg": "#FCFCFC",
  
  // Shadows: Precise and minimal
  "--drop-shadow": 
    "0 1px 2px 0 rgba(28, 28, 28, 0.08)",
  "--card-shadow": 
    "0 2px 4px -1px rgba(28, 28, 28, 0.12), 0 1px 2px -1px rgba(28, 28, 28, 0.08)",
  "--elevated-shadow":
    "0 8px 16px -4px rgba(28, 28, 28, 0.16), 0 4px 8px -4px rgba(28, 28, 28, 0.1)",
  "--navHeight": "4rem",
  "--inverse-transparent": "rgba(28, 28, 28, 0.95)",
  "--inverse-shadow": "0 16px 24px -4px rgba(28, 28, 28, 0.2)",
};

export const darkTheme = {
  // THEME: "Charcoal Board"
  // Dark drafting board with white chalk lines
  
  "--bg": "#0D0D0D", // Deep charcoal
  "--bg-l1": "#1A1A1A", // Elevated surface
  "--bg-l2": "#262626", // Slate layer
  "--bg-l3": "#333333", // Input fields
  "--bg-transparent": "rgba(13, 13, 13, 0.88)",

  "--text-color": "#F5F5F5", // Chalk white
  "--secondary-text": "#A3A3A3", // Soft grey

  "--card-bg": "#1A1A1A", 
  "--border-color": "#333333", // Technical border
  
  "--grid-color": "#1C1C1C", // Subtle grid
  "--guide-color": "#282828",
  "--dimension-line": "#737373",

  // White chalk with orange markup
  "--accent": "#F5F5F5", // Chalk white
  "--accent-color": "#F97316", // Orange markup
  "--accent-color-transparent": "rgba(249, 115, 22, 0.18)",

  "--link": "#FB923C", // Bright orange
  "--hover-accent": "#FDBA74", // Light orange

  "--herobg": "#080808",
  "--feature-bg": "#141414",
  
  // Shadows: Deep with subtle rim lighting
  "--drop-shadow": 
    "0 0 0 1px rgba(245, 245, 245, 0.06), 0 2px 4px rgba(0, 0, 0, 0.6)",
  "--card-shadow": 
    "0 0 0 1px rgba(245, 245, 245, 0.08), 0 6px 12px -2px rgba(0, 0, 0, 0.5)",
  "--elevated-shadow":
    "0 0 0 1px rgba(245, 245, 245, 0.1), 0 24px 32px -8px rgba(0, 0, 0, 0.7)",

  "--inverse-transparent": "rgba(254, 254, 254, 0.92)",

  // "--navHeight": "4rem",

  "--inverse-shadow": "0 12px 36px rgba(0, 0, 0, 0.6)",
};

export const inlineNavHeight = {
  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "182px",
};

export const hiddenNavHeight = {
  "--navHeight": "0rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "182px",
};