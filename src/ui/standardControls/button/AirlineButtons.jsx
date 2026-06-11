import React from "react";
import s from "./styles/AirlineButtons.module.scss";

const getVariantClass = (variant) => {
  switch (variant) {
    case "Airline_Primary":   return s.variantPrimary;
    case "Airline_Secondary": return s.variantSecondary;
    case "Airline_Ghost":     return s.variantGhost;
    case "Airline_Danger":    return s.variantDanger;
    case "Airline_Success":   return s.variantSuccess;
    case "Airline_IconOnly":  return s.variantIconOnly;
    case "Airline_IconGhost": return s.variantIconGhost;
    case "AirLine_LargeFilll": return s.LargeFillVariant;
    case "Airline_TouchLarge": return s.LargeTouchVariant;
    case "Airline_Nav":       return s.variantNav; // 1. Added Nav variant
    default:                  return s.variantSecondary;
  }
};

export const AirlineButton = ({
  label,
  icon,
  variant,
  disabled = false,
  onClick,
  active = false,
  ishighlight = false,
  ...rest
}) => {
  const isIconVariant = variant === "Airline_IconOnly" || variant === "Airline_IconGhost";

  const renderContent = () => (
    <>
      {icon && <span className={s.icon} aria-hidden="true">{icon}</span>}
      {!isIconVariant && label && <span>{label}</span>}
    </>
  );
 switch (variant) { 
  case ("Airline_TouchLarge"): 
return (
    <button
      className={`${getVariantClass(variant)} `}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active || undefined}
      aria-label={isIconVariant ? label : undefined}
      type="button"
      {...rest}
    >
      <span className={s.contentBase}>
        {renderContent()}
      </span>
     
    </button>
  );

  default: 
return (
    <button
      className={`${getVariantClass(variant)} ${ishighlight && "rainbowSubtleShadow"}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active || undefined}
      aria-label={isIconVariant ? label : undefined}
      type="button"
      {...rest}
    >
      <span className={s.contentBase}>
        {renderContent()}
      </span>
      <span className={s.sweepLayer} aria-hidden="true">
        {renderContent()}
      </span>
    </button>
  );

 }
  
};