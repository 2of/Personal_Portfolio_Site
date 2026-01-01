export const baseTheme = {
  "--padding-small": "12px",
  "--padding-medium": "24px",
  "--padding-large": "48px",
  "--spacing-small": "12px",

  "--font-size-base": "15px", // Slightly tighter for information density
  "--font-size-lg": "18px",
  "--font-weight-bold": "500", // "Medium" often looks more premium than "Bold"

  "--navHeightDESKTOP": "60px",
  "--content-heightDESKTOP": "calc(100vh - var(--navHeightDESKTOP))",
  "--navHeight": "60px",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "60px",
  "--maxWidth": "1280px",

  "--border-radius": "4px", // Tighter radius = more professional/technical look
  "--blur-radius": "16px",
  "--text-dark": "#111111",
  "--darkbg": "#000000",
  "--lighttext": "#EDEDED",
};

export const lightTheme = {
  // THEME: "Swiss Typography"
  // Stark, high-contrast, zero-noise. Like a printed architectural magazine.

  "--bg": "#FFFFFF",
  "--bg-l1": "#FAFAFA", // Very subtle off-white for sidebars
  "--bg-l2": "#F4F4F5", // Lightest grey for inputs
  "--bg-l3": "#E4E4E7", // Border/Line weight
  "--bg-transparent": "rgba(255, 255, 255, 0.92)",

  "--text-color": "#18181B", // Zinc-950 (Sharp, Ink Black)
  "--secondary-text": "#71717A", // Zinc-500 (Clean neutral grey)

  "--card-bg": "#FFFFFF",
  "--border-color": "#E4E4E7", // Crisp separation
  
  "--grid-color": "#F1F5F9", // Slate-100
  "--guide-color": "#E2E8F0", // Slate-200
  "--dimension-line": "#94A3B8", // Slate-400

  // The "Pro" Blue - Classic, trustworthy, calm.
  "--accent": "#0F172A", // Using a dark Slate as the primary accent (classy)
  "--accent-color": "#2563EB", // Royal Blue for active states only
  "--accent-color-transparent": "rgba(37, 99, 235, 0.1)",

  "--link": "#2563EB",
  "--hover-accent": "#1D4ED8",

  "--herobg": "#FAFAFA",
  "--feature-bg": "#F8FAFC",
  
  // Shadows: Tight and localized. No big blurry spreads.
  "--drop-shadow": 
    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "--card-shadow": 
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  "--elevated-shadow":
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",

  "--inverse-transparent": "rgba(24, 24, 27, 0.95)",
  "--inverse-shadow": "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
};

export const darkTheme = {
  // THEME: "Midnight Titanium"
  // No blue tint. No purple tint. Just pure, calibrated monochrome.
  
  // 1. The Backgrounds: Moving away from Pitch Black to "Rich Grey"
  "--bg": "#0A0A0A", // Neutral Dark
  "--bg-l1": "#111111", // Subtle elevation
  "--bg-l2": "#171717", // Card surfaces
  "--bg-l3": "#262626", // Input fields
  "--bg-transparent": "rgba(10, 10, 10, 0.85)",

  // 2. The Text: High readability, lowered contrast to reduce eye strain
  "--text-color": "#EDEDED", // 93% White - Removes the harsh "strobe" effect
  "--secondary-text": "#A1A1AA", // Zinc-400 - Perfectly legible grey

  // 3. The Borders: The secret to Pro Dark Mode is defined borders, not shadows.
  "--card-bg": "#121212", 
  "--border-color": "#27272A", // Zinc-800 - Subtle visible structure
  
  "--grid-color": "#1A1A1A", // Very subtle grid
  "--guide-color": "#262626",
  "--dimension-line": "#525252",

  // 4. The Accents: Desaturated & Luminescent
  "--accent": "#FFFFFF", // White accent conveys the highest level of luxury/minimalism
  "--accent-color": "#3B82F6", // Blue-500 (Optical Blue)
  "--accent-color-transparent": "rgba(59, 130, 246, 0.15)",

  "--link": "#60A5FA", // Blue-400
  "--hover-accent": "#93C5FD", // Blue-300

  "--herobg": "#000000",
  "--feature-bg": "#0F0F0F",
  
  // 5. The Shadows: 'Rim Lighting' technique
  // We add a white pixel border (rgba(255,255,255,0.1)) inside the shadow 
  // to make the object pop against the dark background.
  "--drop-shadow": 
    "0 0 0 1px rgba(255,255,255,0.08), 0 1px 2px rgba(0,0,0,0.5)",
  "--card-shadow": 
    "0 0 0 1px rgba(255,255,255,0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.5)",
  "--elevated-shadow":
    "0 0 0 1px rgba(255,255,255,0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.7)",

  "--inverse-transparent": "rgba(255, 255, 255, 0.9)",
  "--inverse-shadow": "0 10px 30px rgba(0,0,0,0.5)",
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