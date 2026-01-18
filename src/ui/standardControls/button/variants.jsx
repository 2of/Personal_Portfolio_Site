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
import { TextButton, RichButton, NavButton } from "./MiscButtons";
import { StoreButton } from "./StoreButtons";
import { MobileButton } from "./MobileButtons";
import { NaturalButton } from "./NaturalButtons";

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
genericstore: StoreButton,
mobileNav: MobileButton,
mobileNavWithLabel: MobileButton, 
mobileNavLargeMenu: MobileButton





};
