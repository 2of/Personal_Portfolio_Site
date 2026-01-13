

import { useCallback } from "react";



const FIVE_HOURS = 60 * 60 * 5;




export function useCookies() {
  const get = useCallback((name) => {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(
      new RegExp(`(?:^|; )${name}=([^;]*)`)
    );

    if (!match) return null;

    const value = decodeURIComponent(match[1]);
    if (value === "true") return true;
    if (value === "false") return false;
    if (!isNaN(value) && value.trim() !== "") return Number(value);

    return value;
  }, []);

const set = useCallback((name, value, options = {}) => {
  if (typeof document === "undefined") return;

  const {
    path = "/",
    maxAge = FIVE_HOURS, // ✅ default to 5 hours
    expires,
    sameSite = "Lax",
    secure = false,
  } = options;

  let cookie = `${name}=${encodeURIComponent(String(value))}`;
  cookie += `; path=${path}`;
  cookie += `; SameSite=${sameSite}`;

  if (secure) cookie += `; Secure`;
  if (maxAge != null) cookie += `; max-age=${maxAge}`;
  if (expires instanceof Date)
    cookie += `; expires=${expires.toUTCString()}`;

  document.cookie = cookie;
}, []);

  const remove = useCallback((name, path = "/") => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; max-age=0; path=${path}`;
  }, []);

  const deleteAll = useCallback(() => {
    if (typeof document === "undefined") return;

    const cookies = document.cookie.split(";").map(c => c.trim().split("=")[0]);
    cookies.forEach((name) => {
      document.cookie = `${name}=; max-age=0; path=/`;
    });
  }, []);

  // Get all cookies as an object { name: value, ... }
  const getAll = useCallback(() => {
    if (typeof document === "undefined") return {};

    const cookies = document.cookie.split(";").map(c => c.trim());
    const result = {};

    cookies.forEach(cookie => {
      if (!cookie) return;
      const [name, ...rest] = cookie.split("=");
      const value = decodeURIComponent(rest.join("="));

      if (value === "true") result[name] = true;
      else if (value === "false") result[name] = false;
      else if (!isNaN(value) && value.trim() !== "") result[name] = Number(value);
      else result[name] = value;
    });

    return result;
  }, []);

  // Alias for remove
  const deleteCookie = remove;

  return { get, set, remove, deleteCookie, deleteAll, getAll };
}
