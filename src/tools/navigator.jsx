// navigateTo.js
export function navigateTo(to, navigate) {
 console.log("NAVVV")
  if (!to || typeof to !== "string") return;


  const trimmed = to.trim();

  // Absolute URLs (http/https)
  const isHttpUrl = /^https?:\/\//i.test(trimmed);

  // URLs starting with www.
  const isWwwUrl = /^www\./i.test(trimmed);

  if (isHttpUrl) {
    window.location.href = trimmed;
    return;
  }

  if (isWwwUrl) {
    window.location.href = `https://${trimmed}`;
    return;
  }

  // Internal route
  navigate(trimmed.startsWith("/") ? trimmed : `/${trimmed}`);
}
