export const baseTheme = {
  "--padding-small": "10px",
  "--padding-medium": "15px",
  "--padding-large": "36px",
  "--spacing-small": "10px",
  "--font-size-base": "16px",
  "--font-size-lg": "18px",
  "--font-weight-bold": "600",
  "--navHeightDESKTOP": "6rem",
  "--content-heightDESKTOP": "calc(100vh - var(--navHeightDESKTOP)",
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
  // Morning edition - bright newsprint with energetic presence
  "--bg": "#FFFEF9", // warm white broadsheet with life
  "--bg-l1": "#FFF9F0", // cream editorial stock
  "--bg-l2": "#FFF3E5", // warm section breaks
  "--bg-l3": "#FFEBD1", // golden column separation
  "--bg-transparent": "rgba(255, 254, 249, 0.98)",

  // Printer's ink - bold editorial authority
  "--text-color": "#0A0A0A", // rich black ink with energy
  "--secondary-text": "#3D3D3D", // lively secondary editorial

  // Editorial surfaces - warm high contrast stock
  "--card-bg": "#FFFEF9", // warm brilliant surface
  "--border-color": "#D4A574", // warm bronze column rules

  // Layout grid - playful editorial structure
  "--grid-color": "#F5E6D3", // warm layout guides
  "--guide-color": "#E0C9A8", // golden boundaries
  "--dimension-line": "#C4A576", // bronze margin rules

  // Masthead - vibrant editorial statement
  "--accent": "#E63946", // energetic coral-red with personality
  "--accent-color": "#E63946", // lively editorial highlight
  "--accent-color-transparent": "rgba(230, 57, 70, 0.20)",

  // Interactive editorial marks - playful engagement
  "--link": "#D62839", // warm editorial red
  "--hover-accent": "#FF4757", // vibrant masthead activation

  // Featured sections - warm editorial space
  "--herobg": "#FFF7EC", // inviting above-the-fold
  "--feature-bg": "#FFEDD8", // cheerful special report

  // Print quality shadows - pronounced editorial depth
  "--drop-shadow": "0 3px 8px rgba(230, 57, 70, 0.12), 0 2px 4px rgba(10, 10, 10, 0.14), 0 1px 2px rgba(10, 10, 10, 0.10)",
  "--card-shadow": "0 6px 18px rgba(230, 57, 70, 0.16), 0 4px 10px rgba(10, 10, 10, 0.18), 0 2px 6px rgba(10, 10, 10, 0.12)",
  "--elevated-shadow": "0 12px 36px rgba(230, 57, 70, 0.22), 0 6px 18px rgba(10, 10, 10, 0.22), 0 3px 10px rgba(10, 10, 10, 0.16)",

  // Inverse for overlays - stark editorial contrast
  "--inverse-transparent": "rgba(10, 10, 10, 0.96)",
  "--inverse-shadow": "0 16px 40px rgba(0, 0, 0, 0.28), 0 8px 20px rgba(230, 57, 70, 0.18), 0 4px 12px rgba(0, 0, 0, 0.16)",
};

export const darkTheme = {
  // Evening edition - rich night reading with character
  "--bg": "#0F0A08", // deep warm black editorial surface
  "--bg-l1": "#1A1210", // elevated section with warmth
  "--bg-l2": "#261D18", // cozy feature panel
  "--bg-l3": "#352822", // inviting editorial zones
  "--bg-transparent": "rgba(15, 10, 8, 0.98)",

  // Reversed type - brilliant editorial clarity
  "--text-color": "#FFF9F0", // warm white reversed type
  "--secondary-text": "#D4BFA8", // golden secondary editorial

  // Night reading surfaces - rich dark stock
  "--card-bg": "#150D0A", // deep warm surface
  "--border-color": "#6B5644", // bronze column rules

  // Evening layout grid - warm structure
  "--grid-color": "#211814", // subtle layout guides
  "--guide-color": "#2F241C", // cozy boundaries
  "--dimension-line": "#574839", // warm margins

  // Evening masthead - vibrant editorial accent
  "--accent": "#FF6B7A", // lively coral-red with warmth
  "--accent-color": "#FF6B7A",
  "--accent-color-transparent": "rgba(255, 107, 122, 0.28)",

  // Interactive evening marks - energetic visibility
  "--link": "#FF8191", // luminous playful link
  "--hover-accent": "#FF5566", // vibrant masthead red

  // Featured evening areas - inviting zones
  "--herobg": "#1A1310", // warm evening above-fold
  "--feature-bg": "#241A16", // cozy evening features

  // Evening editorial shadows - dramatic depth with color
  "--drop-shadow": "0 6px 14px rgba(255, 107, 122, 0.20), 0 4px 8px rgba(0, 0, 0, 0.50), 0 2px 4px rgba(0, 0, 0, 0.40)",
  "--card-shadow": "0 12px 32px rgba(255, 107, 122, 0.28), 0 6px 16px rgba(0, 0, 0, 0.60), 0 3px 8px rgba(0, 0, 0, 0.50)",
  "--elevated-shadow": "0 24px 60px rgba(255, 107, 122, 0.35), 0 12px 30px rgba(0, 0, 0, 0.70), 0 6px 15px rgba(255, 107, 122, 0.30)",

  // Light overlay for modals - warm editorial contrast
  "--inverse-transparent": "rgba(255, 254, 249, 0.97)",
  "--inverse-shadow": "0 12px 32px rgba(230, 57, 70, 0.18), 0 6px 16px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.12)",
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