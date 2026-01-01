import { useNavigate } from "react-router-dom";
import { useLinks } from "../contexts/LinksContext";

export function useNavigateTo() {
  const { getLink } = useLinks();
  const navigate = useNavigate();

  const goToUrl = (url) => {
    console.log("TEST")
    if (!url) return;

    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      window.location.href = trimmed;
    } else if (/^www\./i.test(trimmed)) {
      window.location.href = `https://${trimmed}`;
    } else {
      // internal route
      navigate(trimmed.startsWith("/") ? trimmed : `/${trimmed}`);
    }
  };

  return (to) => {
    if (!to || typeof to !== "string") return;

    const trimmed = to.trim();

    // Direct URL or internal route
    if (trimmed.startsWith("/") || /^https?:\/\//i.test(trimmed) || /^www\./i.test(trimmed)) {
      goToUrl(trimmed);
      return;
    }

    // Lookup key in links.json
    const linkFromJson = getLink(trimmed);
    if (linkFromJson) {
      goToUrl(linkFromJson);
      return;
    }

    // If key not found, do nothing
    console.warn(`No link found for key: "${trimmed}"`);
  };
}
