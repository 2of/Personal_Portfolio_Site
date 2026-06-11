// components/Button/variants.js

import { BaseButton } from "./BaseButtons";
import { CodeButton } from "./CodeButton";
import { LinkButton } from "./LinkButton";
import { RoundedButton } from "./RoundedButton";
import { IconButton } from "./IconButton";
import { FeaturedButton } from "./FeaturedButton";
import { TagButton } from "./TagButton";
import { ModernButtonVariant } from "./ModernButtonVariant";
import { DevStyleButton } from "./DevStyleButton";
import { TextButton, RichButton } from "./MiscButtons";
import { StoreButton } from "./StoreButtons";
import { MobileButton } from "./MobileButtons";
import { NaturalButton } from "./NaturalButtons";

import { NavButton } from "./NavButton";
import { MagazineButton } from "./MagazineButton";
import { AirlineButton } from "./AirlineButtons";


export const VARIANT_COMPONENTS = {
  default: BaseButton,
  link: LinkButton,
  code: CodeButton,
  code_small: CodeButton,
  rounded: RoundedButton,
  icon_only: IconButton,
  featured: FeaturedButton,
  rounded_tag: TagButton,
  modern: ModernButtonVariant,
  dev: DevStyleButton,
  dev_simple: DevStyleButton,

  dev_highlight: DevStyleButton,
  dev_icon_only: DevStyleButton,
  dev_icon_only_end_card: DevStyleButton,

  dev_block: DevStyleButton,
  dev_chungus: DevStyleButton,
  


  
  text: TextButton,
  rich: RichButton,
  nav: NavButton,
  appstore: StoreButton,
  googleplay: StoreButton,
  github: StoreButton,

natural: NaturalButton,
natural_icon_only: NaturalButton,
natural_nav: NaturalButton,
natural_squared: NaturalButton,
natural_wipe: NaturalButton,
natural_large_touch: NaturalButton,
natural_large_touch_nav_menu: NaturalButton,


genericstore: StoreButton,
mobileNav: MobileButton,
mobileNavWithLabel: MobileButton, 
mobileNavLargeMenu: MobileButton,


nav_Primary: NavButton,
nav_Secondary: NavButton,
nav_Outline: NavButton,
// nav_Tertiary = NavButton,
nav_IconOnly: NavButton,
nav_Stacked: NavButton,

Magazine_Primary: MagazineButton,
Magazine_IconOnly: MagazineButton,
Magazine_Secondary: MagazineButton,


Airline_Primary: AirlineButton,
Airline_Secondary: AirlineButton,
Airline_Ghost: AirlineButton,

             Airline_Danger: AirlineButton,
             Airline_Success: AirlineButton,
             Airline_IconOnly: AirlineButton,
             Airline_IconGhost: AirlineButton,
             Airline_Nav: AirlineButton,
             AirLine_LargeFilll: AirlineButton,
             Airline_TouchLarge: AirlineButton,




};
